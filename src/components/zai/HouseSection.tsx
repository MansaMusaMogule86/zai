'use client';

import { useState, useRef, useMemo } from 'react';
import { Variants,  motion, AnimatePresence, useInView } from 'framer-motion';
import { useZaiStore } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';
import { houseServices, type HouseService } from '@/lib/products';
import ZaiImage from './ZaiImage';

/* ── Time Slots ──────────────────────────────────────── */
const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
];

const ARTISTS = ['Any Available', 'Zainab'] as const;

/* ── Animation Helpers ────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

/* ── Booking Form Input Class ─────────────────────────── */
const inputClass =
  'w-full bg-transparent border-b border-zai-ivory/10 focus:border-zai-gold/50 text-zai-ivory placeholder:text-zai-ivory/20 font-body text-sm pb-3 outline-none transition-colors duration-500';

/* ═══════════════════════════════════════════════════════════════
   HOUSE SECTION
   ═══════════════════════════════════════════════════════════════ */
export default function HouseSection() {
  const setView = useZaiStore((s) => s.setView);
  const bookingStep = useZaiStore((s) => s.bookingStep);
  const setBookingStep = useZaiStore((s) => s.setBookingStep);

  const [selectedService, setSelectedService] = useState<HouseService | null>(null);
  const [selectedArtist, setSelectedArtist] = useState('Any Available');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', email: '' });

  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: '-10% 0px' });

  const interiorRef = useRef<HTMLDivElement>(null);
  const interiorInView = useInView(interiorRef, { once: true, margin: '-10% 0px' });

  /* Next 14 days */
  const next14Days = useMemo(() => {
    const days: { dayName: string; dateNum: number; dateStr: string }[] = [];
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push({
        dayName: dayNames[d.getDay()],
        dateNum: d.getDate(),
        dateStr: `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`,
      });
    }
    return days;
  }, []);

  const handleBookNow = (service: HouseService) => {
    setSelectedService(service);
    setBookingStep(1);
  };

  const handleNext = () => {
    setBookingStep(Math.min(bookingStep + 1, 5));
  };

  const handleBack = () => {
    if (bookingStep <= 1) {
      setBookingStep(0);
      return;
    }
    setBookingStep(bookingStep - 1);
  };

  const canProceed = () => {
    switch (bookingStep) {
      case 1: return !!selectedService;
      case 2: return !!selectedDate;
      case 3: return !!selectedTime;
      case 4: return customerInfo.name.trim() !== '' && customerInfo.phone.trim() !== '';
      default: return false;
    }
  };

  const isBookingOpen = bookingStep > 0;

  return (
    <section className="relative bg-zai-black">
      {/* Subtle warm pearl/champagne radial gradient */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(232,213,184,0.04) 0%, transparent 70%)' }}
      />

      {/* ── 1. HOUSE HERO ──────────────────────────────── */}
      <div className="relative w-full overflow-hidden bg-black h-[520px] max-h-[58svh] min-h-[440px] md:h-[560px] md:max-h-[65vh] lg:h-[620px] lg:max-h-[68vh] lg:min-h-[520px]">
        <img
          src={zaiAssets.house.heroDesktop}
          alt="House of ZAI — Ritual & Beauty Services"
          className="w-full h-full object-cover object-[52%_35%] lg:object-[center_38%]"
        />

        {/* Warm dark gradient from bottom */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(30,20,15,0.3) 50%, transparent 100%)' }}
        />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={() => setView('home')}
          className="absolute top-6 left-6 md:top-10 md:left-10 text-xs tracking-editorial text-zai-ivory/60 hover:text-zai-ivory transition-colors duration-300 z-10"
        >
          ← WORLD
        </motion.button>

        {/* Hero text bottom-left */}
        <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-5xl md:text-7xl text-zai-ivory"
          >
            ENTER THE HOUSE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-3 text-sm tracking-editorial text-house-champagne/70"
          >
            Where beauty becomes ritual.
          </motion.p>
        </div>
      </div>

      {/* ── 2. SERVICES GRID ────────────────────────────── */}
      <div ref={servicesRef} className="px-6 md:px-12 lg:px-24 pt-16 pb-24 md:pt-20 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-editorial text-zai-gold/50 mb-3"
        >
          THE SERVICES
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm text-zai-ivory/40 mb-12"
        >
          Every treatment is a ceremony.
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={servicesInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {houseServices.map((service, i) => (
            <motion.div
              key={service.id}
              custom={i}
              variants={fadeUp}
              className="bg-zai-charcoal/50 border border-zai-ivory/5 hover:border-house-champagne/30 transition-all duration-500 group overflow-hidden"
            >
              {/* Service image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                {service.assetKey && (
                  <ZaiImage
                    src={zaiAssets.house[service.assetKey.split('.')[1] as keyof typeof zaiAssets.house]}
                    alt={service.name}
                    brand="house"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
              </div>

              {/* Service info */}
              <div className="p-5 space-y-3">
                <h3 className="font-display text-xl text-zai-ivory">{service.name}</h3>
                <p className="text-xs text-zai-ivory/40 tracking-editorial">{service.duration}</p>
                <p className="text-sm text-zai-gold/70">{service.priceRange}</p>
                <button
                  onClick={() => handleBookNow(service)}
                  className="btn-luxury px-4 py-2 text-[11px] mt-2"
                >
                  BOOK NOW
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── 3. BOOKING FLOW ──────────────────────────── */}
        <AnimatePresence>
          {isBookingOpen && (
            <motion.div
              key="booking-flow"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden mt-16"
            >
              <div className="divider-gold mb-12" />

              {/* Step indicator */}
              <div className="flex items-center justify-between mb-12 max-w-md">
                <button
                  onClick={handleBack}
                  className="text-xs tracking-editorial text-zai-ivory/40 hover:text-zai-ivory transition-colors"
                >
                  ← BACK
                </button>
                <span className="text-xs tracking-editorial text-zai-gold/50">
                  STEP {bookingStep} OF 5
                </span>
              </div>

              <div className="max-w-lg mx-auto">
                <AnimatePresence mode="wait">
                  {/* ── STEP 1: Select Service & Artist ──── */}
                  {bookingStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-10"
                    >
                      <div>
                        <p className="text-xs tracking-editorial text-zai-gold/50 mb-4">SELECTED SERVICE</p>
                        <p className="font-display text-2xl text-zai-ivory">
                          {selectedService?.name}
                        </p>
                        <p className="text-sm text-zai-ivory/40 mt-1">
                          {selectedService?.duration} · {selectedService?.priceRange}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs tracking-editorial text-zai-gold/50 mb-4">SELECT ARTIST</p>
                        <div className="flex gap-3">
                          {ARTISTS.map((artist) => (
                            <button
                              key={artist}
                              onClick={() => setSelectedArtist(artist)}
                              className={`px-5 py-2.5 text-xs tracking-editorial transition-all duration-300 border ${selectedArtist === artist ? 'border-zai-gold/60 text-zai-gold bg-zai-gold/5' : 'border-zai-ivory/10 text-zai-ivory/50 hover:border-zai-ivory/20 hover:text-zai-ivory/70'}`}
                            >
                              {artist.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 2: Select Date ──────────────── */}
                  {bookingStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <p className="text-xs tracking-editorial text-zai-gold/50">SELECT DATE</p>
                      <div className="grid grid-cols-7 gap-2">
                        {next14Days.map((d) => (
                          <button
                            key={d.dateStr}
                            onClick={() => setSelectedDate(d.dateStr)}
                            className={`flex flex-col items-center py-3 px-1 transition-all duration-300 border ${selectedDate === d.dateStr ? 'border-zai-gold/60 bg-zai-gold/5' : 'border-zai-ivory/5 hover:border-zai-ivory/15'}`}
                          >
                            <span className="text-[10px] tracking-editorial text-zai-ivory/30 mb-1">
                              {d.dayName}
                            </span>
                            <span className={`text-sm font-body ${selectedDate === d.dateStr ? 'text-zai-gold' : 'text-zai-ivory/60'}`}>
                              {d.dateNum}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 3: Select Time ──────────────── */}
                  {bookingStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <p className="text-xs tracking-editorial text-zai-gold/50">SELECT TIME</p>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-3 text-sm font-body tracking-editorial transition-all duration-300 border ${selectedTime === time ? 'border-zai-gold/60 text-zai-gold bg-zai-gold/5' : 'border-zai-ivory/5 text-zai-ivory/50 hover:border-zai-ivory/15 hover:text-zai-ivory/70'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 4: Customer Info ────────────── */}
                  {bookingStep === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-8"
                    >
                      <p className="text-xs tracking-editorial text-zai-gold/50 mb-2">YOUR DETAILS</p>
                      <div>
                        <label className="sr-only" htmlFor="house-name">Name</label>
                        <input
                          id="house-name"
                          type="text"
                          placeholder="NAME"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo((c) => ({ ...c, name: e.target.value }))}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="house-phone">Phone</label>
                        <input
                          id="house-phone"
                          type="tel"
                          placeholder="PHONE"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo((c) => ({ ...c, phone: e.target.value }))}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="house-email">Email</label>
                        <input
                          id="house-email"
                          type="email"
                          placeholder="EMAIL"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo((c) => ({ ...c, email: e.target.value }))}
                          className={inputClass}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 5: Confirmation ────────────── */}
                  {bookingStep === 5 && (
                    <motion.div
                      key="step-5"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-8 text-center py-8"
                    >
                      <p className="font-display text-3xl md:text-4xl text-zai-ivory">
                        YOUR APPOINTMENT IS CONFIRMED{' '}
                        <span className="text-gradient-gold">.</span>
                      </p>

                      <div className="divider-gold" />

                      <div className="space-y-3 text-left max-w-xs mx-auto">
                        <div className="flex justify-between text-sm">
                          <span className="text-zai-ivory/40">SERVICE</span>
                          <span className="text-zai-ivory font-display">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zai-ivory/40">ARTIST</span>
                          <span className="text-zai-ivory font-display">{selectedArtist}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zai-ivory/40">DATE</span>
                          <span className="text-zai-ivory font-display">{selectedDate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zai-ivory/40">TIME</span>
                          <span className="text-zai-ivory font-display">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zai-ivory/40">GUEST</span>
                          <span className="text-zai-ivory font-display">{customerInfo.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation buttons (hidden on step 5) */}
                {bookingStep < 5 && (
                  <div className="flex justify-end mt-12">
                    <button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className={`btn-luxury px-6 py-2 text-[11px] transition-all duration-300 ${!canProceed() ? 'opacity-30 cursor-not-allowed pointer-events-none' : ''}`}
                    >
                      NEXT
                    </button>
                  </div>
                )}

                {/* Done button on step 5 */}
                {bookingStep === 5 && (
                  <div className="flex justify-center mt-12 gap-4">
                    <button
                      onClick={() => {
                        setBookingStep(0);
                        setSelectedService(null);
                        setSelectedArtist('Any Available');
                        setSelectedDate(null);
                        setSelectedTime(null);
                        setCustomerInfo({ name: '', phone: '', email: '' });
                      }}
                      className="btn-gold px-6 py-2 text-[11px]"
                    >
                      BOOK ANOTHER
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 4. REAL SALON RESULTS GALLERY ──────────────── */}
      <div ref={interiorRef} className="px-6 md:px-12 lg:px-24 pb-24 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={interiorInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-editorial text-zai-gold/50 mb-3 uppercase"
        >
          THE SALON RESULTS
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={interiorInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm text-zai-ivory/60 mb-10 font-body"
        >
          Real brow, lip, lash, and nail artistry from the House of Zai salon in Bahrain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={interiorInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { title: 'BROWS', label: 'Mapping & Lamination', img: zaiAssets.house.brows01 },
            { title: 'LASHES', label: 'Lift & Extensions', img: zaiAssets.house.lashes01 },
            { title: 'LIPS', label: 'Pigmentation & Blush', img: zaiAssets.house.lips01 },
            { title: 'NAILS', label: 'Gel Art & Care', img: zaiAssets.house.nails01 },
          ].map((item) => (
            <div
              key={item.title}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-zai-ivory/10 bg-[#070707]"
            >
              <img
                src={item.img}
                alt={`House of Zai ${item.title}`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[10px] tracking-editorial text-zai-gold/75 uppercase block font-body">
                  {item.title}
                </span>
                <span className="font-display text-sm text-zai-ivory">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
