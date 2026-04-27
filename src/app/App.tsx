import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Phone, Mail, MapPin, Menu, X, ArrowRight } from 'lucide-react';

const PAGE_META: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: 'Lavington Builders & Designers Company Limited | Custom Furniture & Woodworks Nairobi',
    description: 'Lavington Builders & Designers Company Limited specializes in custom furniture, woodworks, beds, seats, office furniture, stairs, plus full construction, plumbing, metal fabrication and finishing in Nairobi, Kenya.',
    keywords: 'custom furniture Nairobi, woodworks Kenya, furniture makers Nairobi, kitchen cabinets Nairobi, beds wardrobes Nairobi, interior design Nairobi, construction company Nairobi, Ngong Road builders Kenya',
  },
  services: {
    title: 'Our Services | Lavington Builders & Designers Company Limited',
    description: 'Expert furniture making & woodworks — custom beds, seats, office furniture, stairs. Plus general construction, modern plumbing, metal fabrication, wooden & metal security doors, internal decoration, and office finishing.',
    keywords: 'custom furniture services Nairobi, woodwork services Kenya, interior design services Nairobi, general construction Nairobi, metal fabrication Kenya, security doors Nairobi, plumbing services Nairobi, wooden stairs Kenya',
  },
  projects: {
    title: 'Projects | Lavington Builders & Designers Company Limited',
    description: 'Browse completed and ongoing construction projects by Lavington Builders & Designers Company Limited — residential, commercial, and interior design work across Nairobi.',
    keywords: 'construction projects Nairobi, furniture portfolio Kenya, interior design projects Nairobi, residential projects Kenya, commercial projects Nairobi, completed projects Lavington builders',
  },
  about: {
    title: 'About Us | Lavington Builders & Designers Company Limited',
    description: 'Learn about Lavington Builders & Designers Company Limited — our story, values, team, and commitment to building excellence in Kenya.',
    keywords: 'about Lavington builders, construction company Nairobi history, furniture company Kenya, craftsmanship Nairobi, builders Ngong Road Nairobi',
  },
  contact: {
    title: 'Contact Us | Lavington Builders & Designers Company Limited',
    description: 'Get in touch with Lavington Builders & Designers Company Limited on Ngong Road, Nairobi. Call +254 722 863 577 or +254 710 105 029, or email lav4designs@gmail.com.',
    keywords: 'contact Lavington builders Nairobi, furniture company contact Kenya, builders Ngong Road Nairobi, +254722863577, lav4designs@gmail.com',
  },
};

const COMPANY_NAME = 'Lavington Builders & Designers Company Limited';
const SHORT_NAME = 'LAVINGTON';
const PHONE1 = '+254 722 863 577';
const PHONE2 = '+254 710 105 029';
const EMAIL = 'lav4designs@gmail.com';
const NAV_LINKS = ['HOME', 'SERVICES', 'PROJECTS', 'ABOUT', 'CONTACT'];

const SERVICES = [
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><rect x="6" y="14" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M6 18 L34 18 M10 24 L16 24 M24 24 L30 24" stroke="currentColor" strokeWidth="2"/><circle cx="10" cy="35" r="2" stroke="currentColor" strokeWidth="2"/><circle cx="30" cy="35" r="2" stroke="currentColor" strokeWidth="2"/></svg>, title: 'Custom Furniture & Woodworks', description: 'Bespoke furniture crafted to your specifications — beds, wardrobes, dining sets, office desks, kitchen cabinets, and storage solutions in premium hardwood and engineered wood.', caption: 'Quality furniture, built to last' },
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><path d="M8 28 L20 28 M8 28 L10 18 M20 28 L18 18 M10 18 L18 18 M14 18 L14 12 M10 12 L18 12 M32 24 L32 32 M28 32 L36 32 M28 28 L36 28" stroke="currentColor" strokeWidth="2"/></svg>, title: 'Seats, Sofas & Upholstery', description: 'Custom-made seats and sofas for homes and offices — choose your fabric, design, and comfort. Full upholstery and reupholstery services available.', caption: 'Comfort meets craftsmanship' },
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><rect x="6" y="18" width="28" height="14" rx="1" stroke="currentColor" strokeWidth="2"/><path d="M6 22 L34 22 M4 18 L4 14 M36 18 L36 14" stroke="currentColor" strokeWidth="2"/></svg>, title: 'Custom Beds & Bedroom Furniture', description: 'Premium bed frames, bedside tables, dressing tables, and wardrobes designed and built for comfort, style, and durability in any bedroom size.', caption: 'Rest easy with quality' },
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><rect x="6" y="8" width="28" height="28" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M6 16 L34 16 M14 8 L14 36 M12 22 L18 22 M12 27 L22 27 M22 22 L28 22" stroke="currentColor" strokeWidth="2"/></svg>, title: 'Office Furniture & Workstations', description: 'Complete office furniture solutions — executive desks, workstations, filing cabinets, meeting tables, and reception counters for modern workspaces.', caption: 'Productivity by design' },
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><path d="M8 32 L16 24 L24 24 L32 16 M32 16 L32 22 M32 16 L26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="32" r="2" fill="currentColor"/><circle cx="32" cy="16" r="2" fill="currentColor"/></svg>, title: 'Wooden Stairs & Railings', description: 'Custom-designed wooden staircases, handrails, and balustrades — built for safety, elegance, and long-lasting durability in any home or office.', caption: 'Elevate your space' },
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><rect x="5" y="8" width="30" height="24" stroke="currentColor" strokeWidth="2" rx="1"/><path d="M5 14 L35 14 M13 8 L13 32 M27 8 L27 32" stroke="currentColor" strokeWidth="2"/></svg>, title: 'General Construction & Home Repairs', description: 'Full-scope construction from foundations to finishing, plus reliable home repair and maintenance services across Nairobi.', caption: 'Build with confidence' },
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><rect x="8" y="8" width="24" height="28" rx="1" stroke="currentColor" strokeWidth="2"/><path d="M8 18 L32 18 M8 28 L32 28 M20 8 L20 18 M20 28 L20 36" stroke="currentColor" strokeWidth="2"/><circle cx="27" cy="23" r="2" stroke="currentColor" strokeWidth="2"/></svg>, title: 'Security Doors, Windows & Finishing', description: 'Wooden & metal security doors, putty-less windows, internal decoration, modern plumbing systems, metal fabrication, and complete office/home finishing.', caption: 'Complete solutions' },
];

const PROJECTS = [
  { img: '/images/projects/lavington-builders-designers-interior-design.jpg', title: 'Lavington Residence', sub: 'Full Construction & Finishing | 2024', desc: 'Complete 5-bedroom home construction including plumbing, metalwork, interior decoration, and putty-less windows.', tag: 'Residential' },
  { img: '/images/projects/lavington-builders-designers-office-interior.jpg', title: 'Westlands Office Complex', sub: 'Office Finishing & Renovation | 2024', desc: 'Complete office interior renovation with suspended ceilings, tiling, security doors, and modern plumbing systems.', tag: 'Commercial' },
  { img: '/images/projects/lavington-builders-designers-interior-design-furniture.jpg', title: 'Karen Villa', sub: 'Interior Decoration & Metalwork | 2025', desc: 'Custom interior decoration with bespoke metal fabrication for staircases, gates, and security features.', tag: 'Residential' },
  { img: '/images/projects/lavington-builders-designers-doors.jpg', title: 'Kilimani Security Doors', sub: 'Wooden & Metal Security Doors | 2025', desc: 'Supply and installation of custom wooden and metal security doors for a residential apartment complex.', tag: 'Security' },
  { img: '/images/projects/lavington-builders-designers-kitchen-interior-design.jpg', title: 'Parklands Plumbing Upgrade', sub: 'Modern Plumbing System | 2025', desc: 'Complete plumbing system overhaul and modernisation for a 20-unit apartment block in Parklands.', tag: 'Plumbing' },
  { img: '/images/projects/lavington-builders-designers-stairs.jpg', title: 'Kileleshwa Home Finishing', sub: 'Home Repairs & Finishing | 2026', desc: 'General home finishing and repairs including painting, flooring, ceiling work, and window replacement.', tag: 'Finishing' },
];

const SLIDE_DURATION = 5000; // ms per slide

const HERO_SLIDES = [
  {
    image: '/images/hero/lavington-builders-designers-kitchen-cabinets-interior-design.jpg',
    eyebrow: "Nairobi's Premier Furniture Makers",
    headlineParts: ['Custom', 'furniture &', 'woodworks'],
    highlightIndex: 1,
    body: 'Bespoke beds, wardrobes, dining sets, office desks, and kitchen cabinets — crafted by hand in premium hardwood for homes and offices across Nairobi.',
    tag: 'Furniture & Woodworks',
  },
  {
    image: '/images/hero/lavington-builders-designers-interior-design-kitchen-cabinets.jpg',
    eyebrow: 'Interior Decoration Specialists',
    headlineParts: ['Beautiful', 'interiors,', 'built for you'],
    highlightIndex: 0,
    body: 'Full interior design and decoration — ceilings, tiling, painting, custom cabinetry, and finishing that transforms every space.',
    tag: 'Interior Design',
  },
  {
    image: '/images/projects/lavington-builders-designers-interior-design.jpg',
    eyebrow: 'Full Construction Services',
    headlineParts: ['From', 'foundation', 'to finish'],
    highlightIndex: 2,
    body: 'General construction, plumbing, metalwork, security doors, and complete home or office finishing across Nairobi.',
    tag: 'Construction',
  },
];

const FEATURE_HIGHLIGHTS = [
  {
    title: 'Custom Furniture & Woodworks',
    detail: 'Bespoke beds, wardrobes, dining sets, office desks, and kitchen cabinets — built to your exact specifications in premium hardwood.',
    metric: 'Crafted to order',
    image: '/images/projects/lavington-builders-designers-kitchen-cabinets-interior-design.jpg',
  },
  {
    title: 'Interior Design & Decoration',
    detail: 'Full interior decoration services for homes and offices — ceilings, tiling, painting, and finishing that transforms your space.',
    metric: 'End-to-end finishing',
    image: '/images/hero/lavington-builders-designers-interior-design-kitchen-cabinets.jpg',
  },
  {
    title: 'Seats, Sofas & Upholstery',
    detail: 'Custom-made seats and sofas for any space — choose your fabric, size, and comfort level. Full reupholstery also available.',
    metric: 'Home & office ready',
    image: '/images/projects/lavington-builders-designers-interior-design-furniture.jpg',
  },
  {
    title: 'General Construction & Finishing',
    detail: 'From foundations to final coat — construction, plumbing, metalwork, security doors, and complete home or office finishing across Nairobi.',
    metric: '500+ projects done',
    image: '/images/projects/lavington-builders-designers-office-interior.jpg',
  },
];

const EXPERIENCE_SLIDES = [
  {
    title: 'Lavington Residence',
    text: 'Complete 5-bedroom home construction including plumbing, metalwork, interior decoration, and putty-less windows — delivered on schedule.',
    label: 'Residential • 2024',
    image: '/images/projects/lavington-builders-designers-interior-design.jpg',
  },
  {
    title: 'Metal Fabrication & Security',
    text: 'Custom wooden and metal security doors, gates, and staircases — precision-fabricated and installed for lasting strength and style.',
    label: 'Metalwork & Security',
    image: '/images/projects/lavington-builders-designers-metal-fabrication.jpg',
  },
  {
    title: 'Wooden Stairs & Railings',
    text: 'Bespoke staircases, handrails, and balustrades handcrafted in premium hardwood — safe, elegant, and built to last.',
    label: 'Woodworks • 2025',
    image: '/images/projects/lavington-builders-designers-stairs.jpg',
  },
];

function Interactive3DCard({
  item,
  index,
  onClick,
}: {
  item: (typeof FEATURE_HIGHLIGHTS)[number];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Track how far this card has scrolled into the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 1.08', 'center 0.5'],
  });

  // Organic spring wrapping — settles quickly to avoid long-running animation ticks
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    restDelta: 0.001,
  });

  // Each card arrives from a unique 3D angle — motion-designer stagger
  const startAngles: [number, number][] = [
    [-24, -32], // card 0: top-left tilt
    [-18,  28], // card 1: top-right tilt
    [-24,  32], // card 2: mirror of 0
    [-18, -28], // card 3: mirror of 1
  ];
  const [fromRX, fromRY] = startAngles[index % startAngles.length];

  const rotateX = useTransform(smoothProgress, [0, 1], [fromRX, 0]);
  const rotateY = useTransform(smoothProgress, [0, 1], [fromRY, 0]);
  const y       = useTransform(smoothProgress, [0, 1], [80, 0]);
  const scale   = useTransform(smoothProgress, [0, 1], [0.76, 1]);
  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="group">
      {/* Perspective wrapper — must be a separate element so overflow-hidden never kills 3D */}
      <div style={{ perspective: '1100px' }} className="h-[320px]">
        <motion.button
          onClick={onClick}
          className="relative w-full h-full rounded-2xl text-left block"
          style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
          whileHover={{
            scale: 1.05,
            transition: { type: 'spring', stiffness: 280, damping: 18 },
          }}
          aria-label={item.title}
        >
          {/* Inner clip — overflow-hidden here, NOT on the 3D element */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              title={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/25 to-[#D4896B]/45" />
          </div>
          <div className="absolute inset-0 border border-white/25 rounded-2xl pointer-events-none" />
          <div className="absolute left-5 right-5 bottom-5 z-10">
            <p className="inline-flex mb-3 text-[10px] font-bold tracking-[0.17em] uppercase text-[#ffd8c7] bg-black/35 px-2 py-1 rounded-full">
              {item.metric}
            </p>
            <h3 className="text-white text-[22px] font-black leading-tight mb-2">{item.title}</h3>
            <p className="text-white/85 text-[13px] leading-relaxed">{item.detail}</p>
          </div>
          <div className="absolute -inset-1 bg-[#D4896B]/25 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.button>
      </div>
    </motion.div>
  );
}

/* Each carousel slide is its own component so hooks (useTransform/useSpring)
   can be called at the top level — Rules of Hooks compliant. */
function CarouselSlide({
  slide,
  idx,
  activeProgress,
}: {
  slide: (typeof EXPERIENCE_SLIDES)[number];
  idx: number;
  activeProgress: MotionValue<number>;
}) {
  // Continuous fractional distance from the active centre position
  const rawOffset = useTransform(activeProgress, (v) => idx - v);

  // Map offset → visual transforms (offset 0 = centre, ±1 = adjacent)
  const rawRotateY = useTransform(rawOffset, [-2, -1, 0, 1, 2], [18,  10, 0, -10, -18]);
  const rawScale   = useTransform(rawOffset, [-2, -1, 0, 1, 2], [0.80, 0.90, 1.05, 0.90, 0.80]);
  const rawOpacity = useTransform(rawOffset, [-2, -1, 0, 1, 2], [0.12, 0.50, 1,    0.50, 0.12]);
  const rawX       = useTransform(rawOffset, [-2, -1, 0, 1, 2], [52,   14,  0,   -14,  -52]);

  // Spring smoothing — gives organic, weighted momentum
  const cfg = { stiffness: 130, damping: 26, mass: 0.85 };
  const rotateY = useSpring(rawRotateY, cfg);
  const scale   = useSpring(rawScale,   cfg);
  const opacity = useSpring(rawOpacity, cfg);
  const x       = useSpring(rawX,       cfg);

  return (
    <motion.div
      className="relative h-[360px] rounded-2xl w-full flex-shrink-0"
      style={{ rotateY, scale, opacity, x, transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
      aria-label={slide.title}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <ImageWithFallback src={slide.image} alt={slide.title} title={slide.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      <div className="absolute left-6 right-6 bottom-6 z-10">
        <p className="text-[#ffd8c7] text-[11px] tracking-[0.15em] font-bold uppercase mb-2">{slide.label}</p>
        <h3 className="text-white text-[24px] font-black mb-2">{slide.title}</h3>
        <p className="text-gray-200 text-[13px] leading-relaxed">{slide.text}</p>
      </div>
    </motion.div>
  );
}

function InteractiveExperienceCarousel({ onNav }: { onNav: (p: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Scroll progress of the tall section drives everything
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Continuous 0 → (N-1) value — the single source of truth for all slide positions
  const activeProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, EXPERIENCE_SLIDES.length - 1],
  );

  // Sync to discrete dot indicator without causing slide re-renders
  useMotionValueEvent(activeProgress, 'change', (v) => {
    setActiveDot(Math.round(v));
  });

  // Progress bar driven purely by motion value — zero re-renders
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      className="bg-[#151311] relative"
      style={{ height: `${(EXPERIENCE_SLIDES.length + 1) * 100}vh` }}
    >
      {/* Sticky frame — pinned while the tall section scrolls past */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto px-8 w-full">

          <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
            <div>
              <motion.p
                className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-3 uppercase"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                Interactive Showcase
              </motion.p>
              <motion.h2
                className="text-white text-[40px] font-black leading-[1.15] max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                Explore our completed projects
              </motion.h2>
            </div>
            <p className="text-white/35 text-[12px] tracking-wide hidden md:block">↓ Scroll to advance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6" style={{ perspective: '1400px' }}>
            {EXPERIENCE_SLIDES.map((slide, idx) => (
              <CarouselSlide
                key={slide.title}
                slide={slide}
                idx={idx}
                activeProgress={activeProgress}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-5">
              <div className="flex gap-2">
                {EXPERIENCE_SLIDES.map((slide, idx) => (
                  <div
                    key={slide.title}
                    className={`h-2 rounded-full transition-all duration-500 ${activeDot === idx ? 'w-9 bg-[#D4896B]' : 'w-2 bg-white/30'}`}
                  />
                ))}
              </div>
              {/* Width driven by motion value — no React state, no re-render */}
              <div className="w-32 h-[3px] bg-white/12 rounded-full overflow-hidden">
                <motion.div className="h-full bg-[#D4896B] rounded-full" style={{ width: progressWidth }} />
              </div>
            </div>
            <button
              onClick={() => onNav('projects')}
              className="px-7 py-3 bg-[#D4896B] text-white rounded-full text-[13px] font-bold hover:bg-[#c27a5e] transition-colors"
            >
              VIEW FULL PORTFOLIO
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

function TopBar() {
  return (
    <div className="bg-[#1a1a1a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-2 flex flex-wrap justify-between items-center text-xs gap-3">
        <div className="flex items-center gap-5">
          <a href={`tel:${PHONE1.replace(/\s/g,'')}`} className="flex items-center gap-1.5 hover:text-[#D4896B] transition-colors"><Phone className="w-3.5 h-3.5" />{PHONE1}</a>
          <a href={`tel:${PHONE2.replace(/\s/g,'')}`} className="flex items-center gap-1.5 hover:text-[#D4896B] transition-colors"><Phone className="w-3.5 h-3.5" />{PHONE2}</a>
          <a href={`mailto:${EMAIL}`} className="hidden md:flex items-center gap-1.5 hover:text-[#D4896B] transition-colors"><Mail className="w-3.5 h-3.5" />{EMAIL}</a>
        </div>
        <p className="text-gray-400 hidden sm:block text-[11px] tracking-wider">Expert Furniture & Woodworks • Full Construction Services</p>
      </div>
    </div>
  );
}

function Nav({ currentPage, onNav }: { currentPage: string; onNav: (p: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => onNav('home')} className="flex flex-col leading-none text-left">
            <span className="text-xl font-black text-[#1a1a1a] tracking-tight">{SHORT_NAME}</span>
            <span className="text-[9px] tracking-widest text-[#D4896B] font-bold uppercase">Builders &amp; Designers</span>
          </button>
          <div className="hidden lg:flex items-center gap-8 text-[13px] font-bold tracking-wider">
            {NAV_LINKS.map(link => {
              const key = link.toLowerCase();
              return (
                <button key={key} onClick={() => onNav(key)}
                  className={`transition-colors pb-1 border-b-2 ${currentPage === key ? 'border-[#D4896B] text-[#D4896B]' : 'border-transparent text-gray-700 hover:text-[#D4896B]'}`}>
                  {link}
                </button>
              );
            })}
          </div>
          <a href={`tel:${PHONE1.replace(/\s/g,'')}`} className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-[#D4896B] text-white rounded-full text-[12px] font-bold hover:bg-[#c27a5e] transition-colors">
            <Phone className="w-3.5 h-3.5" /> Call Now
          </a>
          <button className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-2">
          {NAV_LINKS.map(link => {
            const key = link.toLowerCase();
            return (
              <button key={key} onClick={() => { onNav(key); setOpen(false); }}
                className={`block w-full text-left py-2.5 text-[14px] font-bold ${currentPage === key ? 'text-[#D4896B]' : 'text-gray-700'}`}>
                {link}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}

function Footer({ onNav }: { onNav: (p: string) => void }) {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-20 pb-8">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-5">
              <p className="text-xl font-black">{SHORT_NAME}</p>
              <p className="text-[9px] tracking-widest text-[#D4896B] font-bold uppercase">Builders &amp; Designers</p>
            </div>
            <p className="text-gray-400 text-[13px] leading-relaxed mb-6">{COMPANY_NAME} — specializing in custom furniture & woodworks, plus full construction and design services across Kenya.</p>
            <div className="space-y-2.5 text-[13px] text-gray-400">
              <p className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-[#D4896B] flex-shrink-0" />{PHONE1}</p>
              <p className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-[#D4896B] flex-shrink-0" />{PHONE2}</p>
              <p className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-[#D4896B] flex-shrink-0" />{EMAIL}</p>
              <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[#D4896B] flex-shrink-0" />Ngong Road, Nairobi, Kenya</p>
            </div>
          </div>
          <div>
            <h4 className="text-[12px] font-black tracking-widest mb-6 text-white uppercase">Services</h4>
            <ul className="space-y-3 text-gray-400 text-[13px]">
              {SERVICES.map(s => (
                <li key={s.title}><button onClick={() => onNav('services')} className="hover:text-[#D4896B] transition-colors text-left leading-tight">{s.title.split('&')[0].trim()}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-black tracking-widest mb-6 text-white uppercase">Company</h4>
            <ul className="space-y-3 text-gray-400 text-[13px]">
              {['home','about','projects','contact'].map(p => (
                <li key={p}><button onClick={() => onNav(p)} className="hover:text-[#D4896B] transition-colors capitalize">{p.charAt(0).toUpperCase()+p.slice(1)}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-black tracking-widest mb-6 text-white uppercase">Get In Touch</h4>
            <p className="text-gray-400 text-[13px] leading-relaxed mb-5">Ready to start your project? Contact us today for a free consultation.</p>
            <button onClick={() => onNav('contact')} className="px-5 py-2.5 bg-[#D4896B] text-white rounded-full text-[12px] font-bold hover:bg-[#c27a5e] transition-colors">Contact Us →</button>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[12px]">&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <p className="text-gray-600 text-[11px]">Registered in Kenya | Building Excellence Since Day One</p>
        </div>
      </div>
    </footer>
  );
}

/* ── SECTION: Showroom Tour (Image 8 style) ── */
function ShowroomTourSection({ onNav }: { onNav: (p: string) => void }) {
  return (
    <section className="relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/images/hero/lavington-builders-designers-kitchen-cabinets-interior-design.jpg"
          alt="Lavington Builders & Designers showroom — beautifully finished modern home interior in Nairobi"
          title="Lavington Builders & Designers — Interior Showroom Tour"
          className="w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
      </div>
      <div className="relative pt-20 pb-0 px-6 text-center select-none">
        <p className="text-[11px] tracking-[0.25em] text-[#D4896B] font-bold mb-4 uppercase">Portfolio Highlight</p>
        <div className="overflow-hidden">
          <h2 className="text-[clamp(44px,8.5vw,105px)] font-black leading-[0.9] tracking-tight text-transparent"
            style={{WebkitTextStroke:'2px rgba(255,255,255,0.8)'}}>
            OUR WORK
          </h2>
        </div>
        <div className="overflow-hidden">
          <h2 className="text-[clamp(32px,6.5vw,80px)] font-black leading-[1] tracking-tight text-transparent"
            style={{WebkitTextStroke:'2px rgba(255,255,255,0.5)'}}>
            SHOWROOM TOUR
          </h2>
        </div>
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 mt-10">
        {[
          { src:'/images/projects/lavington-builders-designers-kitchen-cabinets-interior-design.jpg', alt:'Open-plan kitchen and living room finished by Lavington Builders & Designers Company Limited Nairobi', title:'Open-Plan Kitchen & Living', desc:'Premium finishes, seamless layout design' },
          { src:'/images/hero/lavington-builders-designers-interior-design-kitchen-cabinets.jpg', alt:'Contemporary kitchen with marble island — interior design by Lavington Builders & Designers Nairobi Kenya', title:'Contemporary Kitchen Design', desc:'Marble island, custom cabinetry, professional finish' },
          { src:'/images/projects/lavington-builders-designers-interior-design-kitchen-cabinets.jpg', alt:'White kitchen premium fit-out installed by Lavington Builders & Designers Company Limited', title:'White Kitchen — Premium Fit-out', desc:'High-end fittings, clean lines, lasting quality' },
        ].map((item, i) => (
          <div key={i} className="overflow-hidden group cursor-pointer" onClick={() => onNav('projects')}>
            <div className="relative h-[300px] md:h-[360px] overflow-hidden">
              <ImageWithFallback
                src={item.src} alt={item.alt} title={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-bold text-[16px]">{item.title}</p>
                <p className="text-gray-300 text-[13px]">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── SECTION: CTA Cards + Services (Image 11 style) ── */
function CTACardsAndServicesSection({ onNav }: { onNav: (p: string) => void }) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* CTA Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <div className="relative h-[280px] rounded-xl overflow-hidden group cursor-pointer" onClick={() => onNav('services')}>
            <ImageWithFallback
              src="/images/projects/lavington-builders-designers-interior-design-furniture.jpg"
              alt="Explore construction and design services by Lavington Builders & Designers Company Limited"
              title="Choose a new look for your home — Lavington Builders & Designers"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-10 text-white">
              <p className="text-[10px] tracking-[0.2em] text-[#D4896B] font-bold mb-2 uppercase">Custom Furniture</p>
              <h3 className="text-[26px] font-bold leading-tight mb-6">Furnish your<br />home with<br />custom pieces</h3>
              <button className="px-6 py-2.5 bg-[#D4896B] text-white rounded-full text-[13px] font-bold hover:bg-[#c27a5e] transition-colors flex items-center gap-2">
                EXPLORE SERVICES <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="relative h-[280px] rounded-xl overflow-hidden group cursor-pointer" onClick={() => onNav('contact')}>
            <ImageWithFallback
              src="/images/projects/lavington-builders-designers-metal-fabrication.jpg"
              alt="Book a consultation with Lavington Builders & Designers Company Limited specialist"
              title="Meet your home design specialist — Lavington Builders & Designers"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-10 text-white">
              <p className="text-[10px] tracking-[0.2em] text-[#D4896B] font-bold mb-2 uppercase">Expert Consultation</p>
              <h3 className="text-[26px] font-bold leading-tight mb-6">Meet your<br />home design<br />specialist</h3>
              <button className="px-6 py-2.5 bg-[#D4896B] text-white rounded-full text-[13px] font-bold hover:bg-[#c27a5e] transition-colors flex items-center gap-2">
                BOOK APPOINTMENT <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Services Icons */}
        <div className="text-center mb-12">
          <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-3 uppercase">What We Do</p>
          <h2 className="text-[32px] font-bold mb-4">Our Services</h2>
          <p className="text-gray-500 text-[15px] max-w-xl mx-auto">Expert furniture making & woodworks — plus comprehensive construction and finishing solutions</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6">
          {SERVICES.map(s => (
            <div key={s.title} className="text-center group cursor-pointer" onClick={() => onNav('services')}>
              <div className="w-16 h-16 mx-auto mb-3 bg-[#fef9f6] rounded-full flex items-center justify-center text-[#D4896B] group-hover:bg-[#D4896B] group-hover:text-white transition-colors duration-300">{s.icon}</div>
              <p className="text-[11px] text-gray-700 font-semibold leading-tight">{s.title.split('&')[0].trim()}</p>
            </div>
          ))}
        </div>

        {/* Gallery Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-16">
          {[
            { src:'/images/projects/lavington-builders-designers-kitchen-cabinets-interior-design.jpg', alt:'Lavington Builders completed kitchen renovation — bright modern space in Nairobi', title:'Kitchen Renovation' },
            { src:'/images/projects/lavington-builders-designers-interior-design.jpg', alt:'Residential interior finishing by Lavington Builders & Designers Nairobi Kenya', title:'Interior Finishing' },
            { src:'/images/projects/lavington-builders-designers-interior-design-kitchen-cabinets.jpg', alt:'Premium home construction project by Lavington Builders & Designers Company Limited', title:'Premium Home Build' },
            { src:'/images/projects/lavington-builders-designers-office-interior.jpg', alt:'Modern office finishing and interior design by Lavington Builders Nairobi', title:'Office Finishing' },
            { src:'/images/projects/lavington-builders-designers-interior-design-furniture.jpg', alt:'Custom interior decoration by Lavington Builders & Designers Company Limited', title:'Interior Decoration' },
          ].map((item, idx) => (
            <div key={idx} className="aspect-square overflow-hidden rounded-lg group relative cursor-pointer" onClick={() => onNav('projects')}>
              <ImageWithFallback src={item.src} alt={item.alt} title={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-[11px] font-bold">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PAGE HERO (inner pages) ── */
function PageHero({
  image,
  eyebrow,
  title,
  description,
}: {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative min-h-[72vh] flex items-end overflow-hidden bg-[#0d0b09]">
      {/* Ken Burns background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.14 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 12, ease: 'linear' }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/40 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 w-full pb-20 pt-48">
        <motion.p
          className="text-[#D4896B] text-[11px] tracking-[0.25em] font-bold mb-5 uppercase"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
        >
          {eyebrow}
        </motion.p>

        <div className="overflow-hidden mb-6">
          <motion.h1
            className="text-[clamp(42px,6vw,82px)] font-black leading-[1.04] text-white"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
          </motion.h1>
        </div>

        <motion.p
          className="text-white/60 text-[16px] max-w-[520px] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
        >
          {description}
        </motion.p>

      </div>
    </section>
  );
}

/* ── HERO SECTION ── */
function HeroSection({ onNav }: { onNav: (p: string) => void }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const goTo = (next: number) => {
    const n = (next + HERO_SLIDES.length) % HERO_SLIDES.length;
    setDirection(n === (current + 1) % HERO_SLIDES.length ? 1 : -1);
    setCurrent(n);
  };

  // Always auto-advances — no pause on hover
  useEffect(() => {
    const id = window.setTimeout(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(id);
  }, [current]);

  // Preload the next slide's image so the cross-fade has no blank frames
  useEffect(() => {
    const nextIndex = (current + 1) % HERO_SLIDES.length;
    const img = new Image();
    img.src = HERO_SLIDES[nextIndex].image;
  }, [current]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-[#0d0b09] flex items-center"
    >
      {/* ── Background images: cross-fade + Ken Burns zoom ── */}
      <AnimatePresence>
        {HERO_SLIDES.map((s, i) =>
          i === current ? (
            <motion.div
              key={s.image}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              {/* Ken Burns: subtle zoom-out over full slide duration */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.18 }}
                animate={{ scale: 1.0 }}
                transition={{ duration: SLIDE_DURATION / 1000 + 2.5, ease: 'linear' }}
              >
                <ImageWithFallback
                  src={s.image}
                  alt={s.headlineParts.join(' ')}
                  title={s.tag}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Gradient vignettes */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>

      {/* ── Slide content ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 w-full py-36 lg:py-44">
        <div className="max-w-[640px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="flex flex-col"
              initial={{ x: direction * 60 }}
              animate={{ x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >

              {/* Eyebrow tag */}
              <motion.p
                className="text-[#D4896B] text-[11px] tracking-[0.25em] font-bold mb-7 uppercase"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
              >
                {slide.eyebrow}
              </motion.p>

              {/* Headline — each line staggers in with a spring */}
              <h1 className="text-[clamp(46px,6.5vw,88px)] leading-[1.04] font-black text-white mb-8">
                {slide.headlineParts.map((part, i) => (
                  <div key={`${current}-wrap-${i}`} className="overflow-hidden pb-1">
                    <motion.span
                      className={`block ${
                        i === slide.highlightIndex ? 'text-[#D4896B]' : ''
                      }`}
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '-85%', opacity: 0 }}
                      transition={{
                        duration: 0.95,
                        delay: 0.08 + i * 0.14,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {part}
                    </motion.span>
                  </div>
                ))}
              </h1>

              {/* Body copy */}
              <motion.p
                className="text-white/65 text-[16px] leading-relaxed mb-10 max-w-[500px]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {slide.body}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.72, ease: 'easeOut' }}
              >
                <button
                  onClick={() => onNav('services')}
                  className="px-8 py-4 bg-[#D4896B] text-white rounded-full text-[14px] font-bold hover:bg-[#c27a5e] transition-colors"
                >
                  Explore Services
                </button>
                <button
                  onClick={() => onNav('contact')}
                  className="px-8 py-4 bg-white/15 text-white border border-white/30 rounded-full text-[14px] font-bold hover:bg-white/25 transition-colors"
                >
                  Book Consultation
                </button>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom controls bar ── */}
      <div className="absolute bottom-10 left-0 right-0 z-10">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between gap-6">

          {/* Dots + timed progress + counter */}
          <div className="flex items-center gap-5">
            <div className="flex gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-[3px] rounded-full transition-all duration-500 ${
                    i === current ? 'w-9 bg-[#D4896B]' : 'w-3 bg-white/35'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            {/* Progress bar — key resets animation each slide */}
            <div className="w-24 h-[2px] bg-white/18 rounded-full overflow-hidden">
              <motion.div
                key={`prog-${current}`}
                className="h-full bg-[#D4896B] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                style={{ transformOrigin: 'left center' }}
              />
            </div>
            <span className="text-white/35 text-[12px] font-mono tabular-nums hidden sm:block">
              {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(HERO_SLIDES.length).padStart(2, '0')}
            </span>
          </div>

          {/* Prev / Next */}
          <div className="flex gap-3">
            <button
              onClick={() => goTo(current - 1)}
              className="w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-colors text-lg"
              aria-label="Previous slide"
            >←</button>
            <button
              onClick={() => goTo(current + 1)}
              className="w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-colors text-lg"
              aria-label="Next slide"
            >→</button>
          </div>

          {/* Stats badge */}
          <motion.div
            className="hidden md:block bg-white/12 border border-white/15 rounded-xl px-5 py-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
          >
            <p className="text-[28px] font-black text-[#D4896B] leading-none">500+</p>
            <p className="text-white/55 text-[11px] font-semibold mt-0.5">Projects Completed</p>
          </motion.div>
        </div>
      </div>

      {/* ── Vertical slide rail — right edge on xl ── */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-500 ${
              i === current ? 'w-[3px] h-12 bg-[#D4896B]' : 'w-[3px] h-4 bg-white/28'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ── HOME PAGE ── */
function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <main>
      <HeroSection onNav={onNav} />

      <section className="bg-[#fff7f1] py-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-12">
            <motion.p
              className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-3 uppercase"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              viewport={{ once: true }}
            >What We Do</motion.p>
            <motion.h2
              className="text-[44px] font-black leading-[1.15] mb-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.07, ease: 'easeOut' }}
              viewport={{ once: true }}
            >Our core services</motion.h2>
            <motion.p
              className="text-gray-600 text-[15px] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              viewport={{ once: true }}
            >Custom furniture, woodworks, interior design, and full construction — scroll to reveal each card.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {FEATURE_HIGHLIGHTS.map((item, index) => (
              <Interactive3DCard key={item.title} item={item} index={index} onClick={() => onNav('services')} />
            ))}
          </div>
        </div>
      </section>

      <InteractiveExperienceCarousel onNav={onNav} />

      <CTACardsAndServicesSection onNav={onNav} />

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-[130px_1fr] gap-4">
              <div className="space-y-4">
                <ImageWithFallback
                  src="/images/projects/lavington-builders-designers-kitchen-cabinets-interior-design.jpg"
                  alt="Lavington Builders security door installation — wooden and metal doors Nairobi"
                  title="Wooden & Metal Security Doors by Lavington Builders"
                  className="w-full h-[130px] object-cover rounded-lg"
                />
                <ImageWithFallback
                  src="/images/projects/lavington-builders-designers-interior-design.jpg"
                  alt="Lavington Builders metal fabrication — custom gates and grilles Nairobi Kenya"
                  title="Metal Fabrication & Designs by Lavington Builders"
                  className="w-full h-[130px] object-cover rounded-lg"
                />
              </div>
              <ImageWithFallback
                src="/images/projects/lavington-builders-designers-interior-design.jpg"
                alt="Professional construction and interior design by Lavington Builders & Designers Company Limited Nairobi"
                title="Creative interior solutions by Lavington Builders & Designers"
                className="w-full h-[490px] object-cover rounded-xl"
              />
            </div>
            <div>
              <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-6 uppercase">Why Choose Us</p>
              <h2 className="text-[44px] font-black leading-[1.15] mb-6">Expert craftsmen<br />specializing in<br />furniture & woodworks</h2>
              <p className="text-gray-600 text-[15px] leading-relaxed mb-8">From custom-made beds and office desks to beautiful wooden stairs and upholstered seats — our skilled artisans create furniture that combines functionality, beauty, and lasting quality. We also handle all your construction and finishing needs.</p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                {[{n:'500+',l:'Projects Done'},{n:'15+',l:'Years Experience'},{n:'7',l:'Core Services'},{n:'100%',l:'Client Satisfaction'}].map(s => (
                  <div key={s.l}><p className="text-[34px] font-black text-[#D4896B] leading-none">{s.n}</p><p className="text-gray-600 text-[13px] mt-1">{s.l}</p></div>
                ))}
              </div>
              <button onClick={() => onNav('about')} className="px-7 py-3.5 border-2 border-gray-900 text-gray-900 rounded-full text-[13px] font-black tracking-wider hover:bg-gray-900 hover:text-white transition-colors">ABOUT US →</button>
            </div>
          </div>
        </div>
      </section>

      <ShowroomTourSection onNav={onNav} />

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-4 uppercase">Simple Process</p>
            <h2 className="text-[44px] font-black leading-[1.2]">4 easy steps to<br />your dream build</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { n:'01', title:'Consultation', desc:'Book a free site visit or phone consultation to discuss your project needs, budget, and timeline.', img:'/images/projects/lavington-builders-designers-office-interior.jpg' },
              { n:'02', title:'Design & Quote', desc:'Our team creates a detailed design proposal with transparent, itemised costing for your approval.', img:'/images/projects/lavington-builders-designers-interior-design.jpg' },
              { n:'03', title:'Construction', desc:'Skilled craftsmen get to work with premium materials, regular progress updates, and zero shortcuts.', img:'/images/projects/lavington-builders-designers-stairs.jpg' },
              { n:'04', title:'Handover', desc:'We walk you through the completed project, ensuring every detail meets your highest expectations.', img:'/images/projects/lavington-builders-designers-interior-design-furniture.jpg' },
            ].map(step => (
              <div key={step.n} className="group">
                <div className="relative overflow-hidden rounded-xl mb-5">
                  <ImageWithFallback
                    src={step.img}
                    alt={`Step ${step.n}: ${step.title} — Lavington Builders & Designers construction process Nairobi`}
                    title={`${step.title} — Lavington Builders & Designers`}
                    className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 bg-[#D4896B] rounded-full flex items-center justify-center text-white text-[13px] font-black">{step.n}</div>
                </div>
                <h3 className="text-[18px] font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-[14px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#fef9f6] py-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-4 uppercase">Client Testimonials</p>
            <h2 className="text-[40px] font-black">What our clients say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote:'Lavington Builders transformed our home beyond our expectations. The attention to detail in the interior decoration and finishing was outstanding. Highly recommend!', name:'Martin Kamau', role:'Karen, Nairobi' },
              { quote:'Professional, punctual, and skilled. They handled our office renovation — plumbing, painting, and ceiling work — flawlessly. Great value and exceptional quality.', name:'Sarah Wanjiku', role:'Westlands, Nairobi' },
              { quote:'The security doors they fabricated and installed are both beautiful and strong. The team was respectful, clean, and finished on schedule. Very satisfied.', name:'James Otieno', role:'Kilimani, Nairobi' },
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="text-[#D4896B] text-4xl font-serif mb-4">"</div>
                <p className="text-gray-700 text-[15px] leading-relaxed italic mb-6">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#D4896B] flex items-center justify-center text-white font-bold text-[14px]">{t.name.split(' ').map((n:string)=>n[0]).join('')}</div>
                  <div><p className="font-bold text-[15px]">{t.name}</p><p className="text-gray-500 text-[12px]">{t.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/projects/lavington-builders-designers-interior-design.jpg"
            alt="Lavington Builders & Designers Company Limited — start your construction project in Nairobi today"
            title="Start your build with Lavington Builders & Designers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/62" />
        </div>
        <div className="max-w-[1400px] mx-auto px-8 relative z-10 text-center text-white">
          <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-4 uppercase">Crafted With Care</p>
          <h2 className="text-[52px] font-black leading-[1.2] mb-4">Ready for custom<br />furniture & woodworks?</h2>
          <p className="text-gray-300 text-[16px] mb-10 max-w-lg mx-auto">From beds and seats to stairs and office furniture — call us on {PHONE1} or {PHONE2} for quality craftsmanship.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => onNav('contact')} className="px-10 py-4 bg-[#D4896B] text-white rounded-full text-[14px] font-bold hover:bg-[#c27a5e] transition-colors">GET STARTED TODAY</button>
            <a href={`tel:${PHONE1.replace(/\s/g,'')}`} className="px-10 py-4 bg-white text-gray-900 rounded-full text-[14px] font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── SERVICES PAGE ── */
function ServicesPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <main>
      <PageHero
        image="https://images.unsplash.com/photo-1687422810663-c316494f725a?auto=format&fit=crop&w=1920&q=85"
        eyebrow="What We Offer"
        title="Our Services"
        description={`From custom furniture and woodworks to complete construction — ${COMPANY_NAME} delivers expert craftsmanship across all your home and office needs.`}
      />
      <section className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="group border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 hover:border-[#D4896B]/30">
                <div className="w-16 h-16 mb-6 bg-[#fef9f6] rounded-xl flex items-center justify-center text-[#D4896B] group-hover:bg-[#D4896B] group-hover:text-white transition-colors duration-300">{s.icon}</div>
                <p className="text-[11px] tracking-widest text-[#D4896B] font-bold mb-2 uppercase">Service {String(i+1).padStart(2,'0')}</p>
                <h3 className="text-[20px] font-bold mb-3">{s.title}</h3>
                <p className="text-gray-500 text-[14px] leading-relaxed mb-4">{s.description}</p>
                <p className="text-[#D4896B] text-[12px] font-semibold italic">{s.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ShowroomTourSection onNav={onNav} />
      <section className="bg-[#fef9f6] py-20">
        <div className="max-w-[900px] mx-auto px-8 text-center">
          <h2 className="text-[42px] font-black mb-6">Need custom furniture or woodwork?</h2>
          <p className="text-gray-600 text-[16px] leading-relaxed mb-10">Whether it's a bed, sofa, office desk, staircase, or full construction project — contact us to discuss your vision and receive a free, detailed quote.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => onNav('contact')} className="px-8 py-4 bg-[#D4896B] text-white rounded-full text-[14px] font-bold hover:bg-[#c27a5e] transition-colors">Request a Quote</button>
            <a href={`tel:${PHONE1.replace(/\s/g,'')}`} className="px-8 py-4 border-2 border-gray-800 text-gray-800 rounded-full text-[14px] font-bold hover:bg-gray-800 hover:text-white transition-colors">{PHONE1}</a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── PROJECTS PAGE ── */
function ProjectsPage({ onNav }: { onNav: (p: string) => void }) {
  const [filter, setFilter] = useState('All');
  const tags = ['All','Residential','Commercial','Security','Plumbing','Finishing'];
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.tag === filter);
  return (
    <main>
      <PageHero
        image="https://images.unsplash.com/photo-1611144727915-ef30a08aaeb3?auto=format&fit=crop&w=1920&q=85"
        eyebrow="Our Portfolio"
        title="Projects"
        description="Explore completed projects showcasing our craftsmanship and dedication to quality across Nairobi."
      />
      <ShowroomTourSection onNav={onNav} />
      <section className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-5 py-2 rounded-full text-[13px] font-bold border-2 transition-colors ${filter === t ? 'bg-[#D4896B] border-[#D4896B] text-white' : 'border-gray-200 text-gray-600 hover:border-[#D4896B] hover:text-[#D4896B]'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((proj, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-[260px] overflow-hidden">
                  <ImageWithFallback
                    src={proj.img}
                    alt={`${proj.title} — construction project by Lavington Builders & Designers Company Limited Nairobi`}
                    title={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-[#D4896B] text-white text-[11px] font-bold rounded-full">{proj.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-[19px] font-bold mb-1">{proj.title}</h3>
                  <p className="text-[#D4896B] text-[12px] font-bold mb-3">{proj.sub}</p>
                  <p className="text-gray-600 text-[14px] leading-relaxed">{proj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── ABOUT PAGE ── */
function AboutPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <main>
      <PageHero
        image="https://images.unsplash.com/photo-1635039650095-38192b61520d?auto=format&fit=crop&w=1920&q=85"
        eyebrow="Who We Are"
        title="About Us"
        description={`Building with excellence, designing with purpose — ${COMPANY_NAME} is your trusted partner from concept to completion.`}
      />
      <section className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-6 uppercase">Our Story</p>
              <h2 className="text-[44px] font-black leading-[1.2] mb-6">Crafted by hand,<br />built with passion</h2>
              <div className="space-y-5 text-gray-600 text-[15px] leading-relaxed">
                <p>{COMPANY_NAME} specializes in custom furniture and woodworks — from elegant beds and comfortable sofas to functional office furniture, beautiful wooden stairs, and bespoke cabinetry. Every piece is crafted by skilled artisans who take pride in their work.</p>
                <p>Our primary focus is furniture making and woodwork, where we transform premium hardwoods and engineered materials into functional art for homes and offices across Nairobi. Each piece is built to your exact specifications, ensuring perfect fit, finish, and durability.</p>
                <p>Beyond furniture, we offer complete construction services — general building, modern plumbing, metal fabrication, security doors, windows, interior decoration, and full office/home finishing. One team, all your needs.</p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-8">
                {[{n:'500+',l:'Projects Completed'},{n:'15+',l:'Years Experience'},{n:'7',l:'Core Services'},{n:'100%',l:'Client Commitment'}].map(s => (
                  <div key={s.l}><p className="text-[38px] font-black text-[#D4896B] leading-none">{s.n}</p><p className="text-gray-500 text-[13px] mt-1">{s.l}</p></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <ImageWithFallback
                src="/images/projects/lavington-builders-designers-office-interior.jpg"
                alt="Lavington Builders & Designers Company Limited team working on construction project in Nairobi"
                title="Our construction team at work — Lavington Builders & Designers"
                className="w-full h-[320px] object-cover rounded-xl"
              />
              <div className="grid grid-cols-2 gap-4">
                <ImageWithFallback
                  src="/images/projects/lavington-builders-designers-interior-design-furniture.jpg"
                  alt="Metal fabrication and construction work by Lavington Builders Nairobi Kenya"
                  title="Metal Fabrication — Lavington Builders"
                  className="w-full h-[180px] object-cover rounded-xl"
                />
                <ImageWithFallback
                  src="/images/projects/lavington-builders-designers-metal-fabrication.jpg"
                  alt="Interior design and decoration by Lavington Builders & Designers Company Limited"
                  title="Interior Decoration — Lavington Builders"
                  className="w-full h-[180px] object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#fef9f6] py-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-4 uppercase">Our Values</p>
            <h2 className="text-[42px] font-black">What drives us</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon:'🏗️', title:'Quality Craftsmanship', desc:'We use premium materials and proven techniques on every project, no exceptions.' },
              { icon:'🤝', title:'Client Trust', desc:'Transparent communication and honest pricing build lasting relationships.' },
              { icon:'⏱️', title:'On-Time Delivery', desc:'We respect your time and commit to realistic, achievable schedules.' },
              { icon:'✨', title:'Attention to Detail', desc:'From foundations to final finishes, every detail is treated with care.' },
            ].map(v => (
              <div key={v.title} className="bg-white p-8 rounded-2xl text-center shadow-sm">
                <div className="text-4xl mb-5">{v.icon}</div>
                <h3 className="text-[18px] font-bold mb-3">{v.title}</h3>
                <p className="text-gray-600 text-[14px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="max-w-[900px] mx-auto px-8 text-center">
          <h2 className="text-[42px] font-black mb-6">Let's build something great together</h2>
          <p className="text-gray-600 text-[16px] mb-10">Reach out to our team — we'd love to hear about your project.</p>
          <button onClick={() => onNav('contact')} className="px-10 py-4 bg-[#D4896B] text-white rounded-full text-[15px] font-bold hover:bg-[#c27a5e] transition-colors">Get In Touch →</button>
        </div>
      </section>
    </main>
  );
}

/* ── CONTACT PAGE ── */
function ContactPage() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', service:'', message:'' });
  const [sent, setSent] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(f=>({...f,[e.target.name]:e.target.value}));
  const handleSubmit = () => { if(form.name && form.phone) setSent(true); };
  return (
    <main>
      <PageHero
        image="https://images.unsplash.com/photo-1585523658894-cc78fc2c8f67?auto=format&fit=crop&w=1920&q=85"
        eyebrow="Reach Us"
        title="Contact Us"
        description="We'd love to hear about your project. Call, email, or fill in the form below."
      />
      <section className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-6 uppercase">Get In Touch</p>
              <h2 className="text-[42px] font-black leading-[1.2] mb-8">Let's discuss<br />your project</h2>
              <div className="space-y-8">
                {[
                  { icon:<Phone className="w-6 h-6 text-[#D4896B]"/>, label:'Phone', content:<><a href={`tel:${PHONE1.replace(/\s/g,'')}`} className="block text-gray-600 hover:text-[#D4896B] transition-colors text-[15px]">{PHONE1}</a><a href={`tel:${PHONE2.replace(/\s/g,'')}`} className="block text-gray-600 hover:text-[#D4896B] transition-colors text-[15px]">{PHONE2}</a></> },
                  { icon:<Mail className="w-6 h-6 text-[#D4896B]"/>, label:'Email', content:<a href={`mailto:${EMAIL}`} className="text-gray-600 hover:text-[#D4896B] transition-colors text-[15px]">{EMAIL}</a> },
                  { icon:<MapPin className="w-6 h-6 text-[#D4896B]"/>, label:'Location', content:<><p className="text-gray-600 text-[15px]">Ngong Road, Nairobi, Kenya</p><p className="text-gray-500 text-[13px] mt-1">Serving all areas across Nairobi & beyond</p></> },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-[#fef9f6] rounded-xl flex items-center justify-center flex-shrink-0">{item.icon}</div>
                    <div><p className="font-bold text-[16px] mb-1">{item.label}</p>{item.content}</div>
                  </div>
                ))}
              </div>
              <div className="mt-12 bg-[#fef9f6] rounded-2xl p-8">
                <h3 className="font-bold text-[18px] mb-4">Office Hours</h3>
                <div className="space-y-2 text-[14px] text-gray-600">
                  <div className="flex justify-between"><span>Monday – Friday</span><span className="font-bold">7:00 AM – 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="font-bold">8:00 AM – 4:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="text-gray-400">By Appointment</span></div>
                </div>
              </div>
            </div>
            <div className="bg-[#fafafa] rounded-2xl p-10">
              {sent ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-6">✅</div>
                  <h3 className="text-[26px] font-bold mb-4">Message Sent!</h3>
                  <p className="text-gray-600 text-[15px]">Thank you for reaching out. Our team will contact you within 24 hours on {form.phone}.</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-[26px] font-bold mb-8">Send us a message</h3>
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[13px] font-bold mb-2 text-gray-700">Full Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#D4896B] bg-white"/>
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold mb-2 text-gray-700">Phone *</label>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+254 7XX XXX XXX" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#D4896B] bg-white"/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold mb-2 text-gray-700">Email</label>
                      <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#D4896B] bg-white"/>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold mb-2 text-gray-700">Service Required</label>
                      <select name="service" value={form.service} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#D4896B] bg-white text-gray-700">
                        <option value="">Select a service</option>
                        {SERVICES.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold mb-2 text-gray-700">Message</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about your project..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#D4896B] bg-white resize-none"/>
                    </div>
                    <button onClick={handleSubmit} className="w-full py-4 bg-[#D4896B] text-white rounded-xl text-[14px] font-bold hover:bg-[#c27a5e] transition-colors">SEND MESSAGE →</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── ROOT ── */
export default function App() {
  const [page, setPage] = useState<string>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const finishLoading = () => {
      window.setTimeout(() => setIsLoading(false), 1100);
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading);
    }

    return () => window.removeEventListener('load', finishLoading);
  }, []);

  const handleNav = (p: string) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // Update document meta tags on page change
  useEffect(() => {
    const pageMeta = PAGE_META[page] || PAGE_META.home;
    const origin = window.location.origin;
    const path = page === 'home' ? '' : `/${page}`;
    const pageUrl = `${origin}${path}`;
    const ogImage = `${origin}/images/projects/lavington-builders-designers-logo.png`;

    const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta') as HTMLMetaElement;
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link') as HTMLLinkElement;
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    document.title = pageMeta.title;
    setMeta('meta[name="description"]', 'name', 'description', pageMeta.description);
    setMeta('meta[name="keywords"]', 'name', 'keywords', pageMeta.keywords);
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageMeta.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', pageMeta.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', pageUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageMeta.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', pageMeta.description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    setLink('canonical', pageUrl);
  }, [page]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-[#120f0d] flex flex-col items-center justify-center text-center px-6">
          <div className="relative w-[132px] h-[132px] rounded-full border border-white/15 flex items-center justify-center mb-6">
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#D4896B] animate-spin" />
            <img
              src="/images/projects/lavington-builders-designers-logo.png"
              alt="Lavington Builders & Designers logo"
              className="w-20 h-20 object-contain drop-shadow-[0_10px_25px_rgba(212,137,107,0.35)]"
            />
          </div>
          <p className="text-[#D4896B] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">Lavington Builders & Designers</p>
          <p className="text-gray-300 text-[13px]">Bespoke beds, wardrobes, dining sets, office desks, and kitchen cabinets — crafted by hand in premium hardwood for homes and offices...</p>
        </div>
      )}
      <div className="min-h-screen bg-white">
        <TopBar />
        <Nav currentPage={page} onNav={handleNav} />
        {page === 'home' && <HomePage onNav={handleNav} />}
        {page === 'services' && <ServicesPage onNav={handleNav} />}
        {page === 'projects' && <ProjectsPage onNav={handleNav} />}
        {page === 'about' && <AboutPage onNav={handleNav} />}
        {page === 'contact' && <ContactPage />}
        <Footer onNav={handleNav} />
      </div>
    </>
  );
}
