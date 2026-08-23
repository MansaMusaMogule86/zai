import { execSync } from 'child_process';
import { createServer } from 'http';

// Proxy server that keeps alive
const proxy = createServer((req, res) => {
  res.writeHead(502);
  res.end('Proxy not ready');
});

proxy.listen(3001, () => {
  console.log('Keep-alive proxy on :3001');
});
