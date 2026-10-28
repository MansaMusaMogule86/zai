/**
 * serve-public.mjs — run this app on localhost and expose it publicly for free.
 * ────────────────────────────────────────────────────────────────────────────
 * 1. Serves the production build (Next.js standalone server when available,
 *    otherwise `next start`) on http://localhost:<port>
 * 2. Opens a Cloudflare Quick Tunnel (free, no account, HTTPS) and prints the
 *    public https://<random>.trycloudflare.com URL
 *
 * Usage:
 *   npm run public                 # serve .next build on port 3000 + tunnel
 *   npm run public -- --build      # rebuild first
 *   npm run public -- --port 4000  # different local port
 *   npm run public -- --host-only  # localhost only, no tunnel
 *
 * The public URL lives only while this process runs (Ctrl+C stops both).
 * Nothing is written into the repo: the tunnel binary lives in the user cache
 * (%LOCALAPPDATA%\cloudflared on Windows, ~/.cloudflared/bin elsewhere).
 */
import { spawn } from 'node:child_process';
import { copyFileSync, createWriteStream, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { homedir, platform } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const isWindows = platform() === 'win32';
const args = process.argv.slice(2);
const port = Number(args[args.indexOf('--port') + 1]) || Number(process.env.PORT) || 3000;
const shouldBuild = args.includes('--build');
const hostOnly = args.includes('--host-only');

const children = [];
let shuttingDown = false;

function stopAll(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    try {
      child.kill();
    } catch {}
  }
  process.exit(code);
}
process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));

function run(command, commandArgs, options = {}) {
  const child = spawn(command, commandArgs, {
    cwd: root,
    stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    // `shell: true` is only needed for .cmd shims (npx) — never for real
    // executables whose path may contain spaces (C:\Program Files\nodejs\node.exe).
    shell: options.shell ?? (options.cmdShim ? isWindows : false),
    env: { ...process.env, ...options.env },
  });
  children.push(child);
  return child;
}

function runOnce(command, commandArgs, env = {}, cmdShim = false) {
  return new Promise((ok, fail) => {
    const child = spawn(command, commandArgs, {
      cwd: root,
      stdio: 'inherit',
      shell: cmdShim && isWindows,
      env: { ...process.env, ...env },
    });
    child.on('exit', (code) => (code === 0 ? ok() : fail(new Error(`${command} exited with ${code}`))));
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForHttp(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url, { redirect: 'manual' });
      if (res.status < 500) return true;
    } catch {}
    await sleep(500);
  }
  return false;
}

/** Mirror the deployment layout: the standalone server needs .next/static + public beside it. */
function prepareStandalone() {
  const standalone = join(root, '.next', 'standalone');
  const serverJs = join(standalone, 'server.js');
  if (!existsSync(serverJs)) return null;

  const copyDir = (from, to) => {
    if (!existsSync(from)) return;
    mkdirSync(to, { recursive: true });
    for (const name of readdirSync(from)) {
      const src = join(from, name);
      const dest = join(to, name);
      if (statSync(src).isDirectory()) copyDir(src, dest);
      else copyFileSync(src, dest);
    }
  };

  copyDir(join(root, '.next', 'static'), join(standalone, '.next', 'static'));
  copyDir(join(root, 'public'), join(standalone, 'public'));
  return serverJs;
}

async function ensureCloudflared() {
  const dir = isWindows
    ? join(process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local'), 'cloudflared')
    : join(homedir(), '.cloudflared', 'bin');
  const binary = join(dir, isWindows ? 'cloudflared.exe' : 'cloudflared');
  if (existsSync(binary)) return binary;

  const asset = isWindows
    ? 'cloudflared-windows-amd64.exe'
    : platform() === 'darwin'
      ? 'cloudflared-darwin-amd64.tgz'
      : 'cloudflared-linux-amd64';
  const url = `https://github.com/cloudflare/cloudflared/releases/latest/download/${asset}`;

  console.log(`⬇  downloading cloudflared → ${binary}`);
  mkdirSync(dir, { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
  await pipeline(res.body, createWriteStream(binary));
  if (!isWindows) await runOnce('chmod', ['+x', binary]);
  return binary;
}

async function main() {
  console.log('──────────────────────────────────────────────');
  console.log(' ZAI — local server + free public tunnel');
  console.log('──────────────────────────────────────────────');

  if (shouldBuild) {
    console.log('🔨 next build');
    await runOnce(isWindows ? 'npx.cmd' : 'npx', ['next', 'build'], {}, true);
  }

  const standalone = prepareStandalone();
  const localUrl = `http://127.0.0.1:${port}`;

  if (standalone) {
    console.log(`🚀 standalone server on ${localUrl}`);
    run(process.execPath, [standalone], {
      env: { PORT: String(port), HOSTNAME: '0.0.0.0', NODE_ENV: 'production' },
    });
  } else {
    console.log(`🚀 next start on ${localUrl}`);
    run(isWindows ? 'npx.cmd' : 'npx', ['next', 'start', '-p', String(port), '-H', '0.0.0.0'], { cmdShim: true });
  }

  if (!(await waitForHttp(localUrl))) {
    console.error('✖ app did not answer on', localUrl);
    return stopAll(1);
  }
  console.log(`✔ local:  ${localUrl}`);

  if (hostOnly) {
    console.log('ℹ  --host-only: no tunnel started');
    return;
  }

  let binary;
  try {
    binary = await ensureCloudflared();
  } catch (err) {
    console.error('✖ could not obtain cloudflared:', err.message);
    console.error('  retry later, or use `npm run public -- --host-only` and tunnel manually:');
    console.error(`  ssh -R 80:localhost:${port} nokey@localhost.run`);
    return stopAll(1);
  }

  console.log('🌐 opening Cloudflare Quick Tunnel (free, no account)…');
  const tunnel = run(binary, ['tunnel', '--url', localUrl, '--no-autoupdate'], { capture: true });
  let publicUrl = '';

  const scan = (chunk) => {
    const text = chunk.toString();
    const match = text.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/i);
    if (match && !publicUrl) {
      publicUrl = match[0];
      console.log('');
      console.log('══════════════════════════════════════════════');
      console.log(` PUBLIC URL: ${publicUrl}`);
      console.log('══════════════════════════════════════════════');
    }
    for (const line of text.split(/\r?\n/)) {
      if (/\bERR\b|failed/i.test(line)) console.log(`  [tunnel] ${line.trim()}`);
    }
  };
  tunnel.stdout?.on('data', scan);
  tunnel.stderr?.on('data', scan);

  for (let i = 0; i < 40 && !publicUrl; i += 1) await sleep(500);
  if (!publicUrl) {
    console.error('✖ tunnel did not report a public URL');
    return stopAll(1);
  }

  await sleep(2500);
  const probe = await fetch(publicUrl, { redirect: 'manual' }).catch(() => null);
  console.log(
    probe
      ? `✔ public check: HTTP ${probe.status} from ${publicUrl}`
      : '⚠ public check failed (tunnel may still be warming up)'
  );
  console.log('ℹ  keep this process running — Ctrl+C takes the site offline.');
}

main().catch((err) => {
  console.error('✖', err.message);
  stopAll(1);
});
