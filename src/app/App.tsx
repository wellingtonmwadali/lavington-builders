import { useState } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Phone, Mail, MapPin, Menu, X, ArrowRight } from 'lucide-react';

const PAGE_META: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Lavington Builders & Designers Company Limited | Premium Construction in Nairobi',
    description: 'Lavington Builders & Designers Company Limited offers expert construction, plumbing, metal fabrication, security doors, internal decoration, window designs, and office finishing in Nairobi, Kenya.',
  },
  services: {
    title: 'Our Services | Lavington Builders & Designers Company Limited',
    description: 'Explore our full range of services: general construction, modern plumbing, metal fabrication, wooden & metal security doors, internal decoration, putty-less window designs, and office finishing.',
  },
  projects: {
    title: 'Projects | Lavington Builders & Designers Company Limited',
    description: 'Browse completed and ongoing construction projects by Lavington Builders & Designers Company Limited — residential, commercial, and interior design work across Nairobi.',
  },
  about: {
    title: 'About Us | Lavington Builders & Designers Company Limited',
    description: 'Learn about Lavington Builders & Designers Company Limited — our story, values, team, and commitment to building excellence in Kenya.',
  },
  contact: {
    title: 'Contact Us | Lavington Builders & Designers Company Limited',
    description: 'Get in touch with Lavington Builders & Designers Company Limited. Call +254 722 863 577 or +254 710 105 029, or email lav4designs@gmail.com.',
  },
};

const COMPANY_NAME = 'Lavington Builders & Designers Company Limited';
const SHORT_NAME = 'LAVINGTON';
const PHONE1 = '+254 722 863 577';
const PHONE2 = '+254 710 105 029';
const EMAIL = 'lav4designs@gmail.com';
const NAV_LINKS = ['HOME', 'SERVICES', 'PROJECTS', 'ABOUT', 'CONTACT'];

const SERVICES = [
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><rect x="5" y="8" width="30" height="24" stroke="currentColor" strokeWidth="2" rx="1"/><path d="M5 14 L35 14 M13 8 L13 32 M27 8 L27 32" stroke="currentColor" strokeWidth="2"/></svg>, title: 'General Construction & Home Repairs', description: 'Full-scope construction from foundations to finishing, plus reliable home repair and maintenance services across Nairobi.', caption: 'Build with confidence' },
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><path d="M20 8 L20 32 M14 14 C14 14 10 14 10 18 C10 22 14 22 14 22 L26 22 C26 22 30 22 30 18 C30 14 26 14 26 14" stroke="currentColor" strokeWidth="2"/><circle cx="20" cy="32" r="3" stroke="currentColor" strokeWidth="2"/></svg>, title: 'Modern Plumbing System', description: 'Installation, repair, and modernisation of plumbing systems for residential and commercial properties using quality materials.', caption: 'Reliable flow, every day' },
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><rect x="8" y="16" width="24" height="18" stroke="currentColor" strokeWidth="2"/><path d="M8 16 L20 8 L32 16 M16 34 L16 24 L24 24 L24 34" stroke="currentColor" strokeWidth="2"/></svg>, title: 'Metal Fabrication & Designs', description: 'Custom metalwork including gates, grilles, staircases, and structural steel — fabricated and installed to your exact specifications.', caption: 'Strength meets elegance' },
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><rect x="8" y="8" width="24" height="28" rx="1" stroke="currentColor" strokeWidth="2"/><path d="M8 18 L32 18 M8 28 L32 28 M20 8 L20 18 M20 28 L20 36" stroke="currentColor" strokeWidth="2"/><circle cx="27" cy="23" r="2" stroke="currentColor" strokeWidth="2"/></svg>, title: 'Wooden & Metal Security Doors', description: 'Durable, stylish security doors crafted from premium wood and steel — designed to enhance safety without compromising aesthetics.', caption: 'Secure your home in style' },
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><rect x="6" y="10" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M6 16 L34 16 M10 16 L10 30 M30 16 L30 30" stroke="currentColor" strokeWidth="2"/><path d="M14 24 C14 24 17 21 20 24 C23 27 26 24 26 24" stroke="currentColor" strokeWidth="1.5"/></svg>, title: 'Internal Decoration', description: 'Transform interiors with expert decoration — wall finishes, ceilings, custom fixtures, and ambient lighting solutions.', caption: 'Beauty from the inside out' },
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><rect x="8" y="10" width="24" height="20" stroke="currentColor" strokeWidth="2" rx="1"/><path d="M8 14 L32 14 M8 26 L32 26 M14 10 L14 30 M26 10 L26 30" stroke="currentColor" strokeWidth="2"/></svg>, title: 'Putty-less Window Designs', description: 'Modern, maintenance-free window installations with clean aluminium and UPVC profiles — no putty, no cracking, no compromise.', caption: 'Crystal clear, frame perfect' },
  { icon: <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none"><rect x="6" y="8" width="28" height="28" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M6 16 L34 16 M14 8 L14 36 M12 22 L18 22 M12 27 L22 27 M22 22 L28 22" stroke="currentColor" strokeWidth="2"/></svg>, title: 'General Office & Home Finishing', description: 'Complete interior and exterior finishing for offices and homes — tiling, painting, suspended ceilings, flooring, and all final touches.', caption: 'Perfection in every detail' },
];

const PROJECTS = [
  { img: '/images/projects/lavington-builders-designers-interior-design.jpg', title: 'Lavington Residence', sub: 'Full Construction & Finishing | 2024', desc: 'Complete 5-bedroom home construction including plumbing, metalwork, interior decoration, and putty-less windows.', tag: 'Residential' },
  { img: '/images/projects/lavington-builders-designers-office-interior.jpg', title: 'Westlands Office Complex', sub: 'Office Finishing & Renovation | 2024', desc: 'Complete office interior renovation with suspended ceilings, tiling, security doors, and modern plumbing systems.', tag: 'Commercial' },
  { img: '/images/projects/lavington-builders-designers-interior-design-furniture.jpg', title: 'Karen Villa', sub: 'Interior Decoration & Metalwork | 2025', desc: 'Custom interior decoration with bespoke metal fabrication for staircases, gates, and security features.', tag: 'Residential' },
  { img: '/images/projects/lavington-builders-designers-doors.jpg', title: 'Kilimani Security Doors', sub: 'Wooden & Metal Security Doors | 2025', desc: 'Supply and installation of custom wooden and metal security doors for a residential apartment complex.', tag: 'Security' },
  { img: '/images/projects/lavington-builders-designers-kitchen-interior-design.jpg', title: 'Parklands Plumbing Upgrade', sub: 'Modern Plumbing System | 2025', desc: 'Complete plumbing system overhaul and modernisation for a 20-unit apartment block in Parklands.', tag: 'Plumbing' },
  { img: '/images/projects/lavington-builders-designers-stairs.jpg', title: 'Kileleshwa Home Finishing', sub: 'Home Repairs & Finishing | 2026', desc: 'General home finishing and repairs including painting, flooring, ceiling work, and window replacement.', tag: 'Finishing' },
];

function TopBar() {
  return (
    <div className="bg-[#1a1a1a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-2 flex flex-wrap justify-between items-center text-xs gap-3">
        <div className="flex items-center gap-5">
          <a href={`tel:${PHONE1.replace(/\s/g,'')}`} className="flex items-center gap-1.5 hover:text-[#D4896B] transition-colors"><Phone className="w-3.5 h-3.5" />{PHONE1}</a>
          <a href={`tel:${PHONE2.replace(/\s/g,'')}`} className="flex items-center gap-1.5 hover:text-[#D4896B] transition-colors"><Phone className="w-3.5 h-3.5" />{PHONE2}</a>
          <a href={`mailto:${EMAIL}`} className="hidden md:flex items-center gap-1.5 hover:text-[#D4896B] transition-colors"><Mail className="w-3.5 h-3.5" />{EMAIL}</a>
        </div>
        <p className="text-gray-400 hidden sm:block text-[11px] tracking-wider">Building Excellence Across Kenya</p>
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
            <p className="text-gray-400 text-[13px] leading-relaxed mb-6">{COMPANY_NAME} — delivering construction excellence and innovative design solutions across Kenya.</p>
            <div className="space-y-2.5 text-[13px] text-gray-400">
              <p className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-[#D4896B] flex-shrink-0" />{PHONE1}</p>
              <p className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-[#D4896B] flex-shrink-0" />{PHONE2}</p>
              <p className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-[#D4896B] flex-shrink-0" />{EMAIL}</p>
              <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[#D4896B] flex-shrink-0" />Lavington, Nairobi, Kenya</p>
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
              <p className="text-[10px] tracking-[0.2em] text-[#D4896B] font-bold mb-2 uppercase">Our Expertise</p>
              <h3 className="text-[26px] font-bold leading-tight mb-6">Choose a new<br />look for your<br />home</h3>
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
          <p className="text-gray-500 text-[15px] max-w-xl mx-auto">Comprehensive construction and design solutions delivered with precision and care</p>
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

/* ── HOME PAGE ── */
function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-white pt-20 pb-16">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
            <div className="max-w-xl">
              <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-6 uppercase">Nairobi's Trusted Builders</p>
              <h1 className="text-[56px] leading-[1.1] font-black mb-6">Build & design your <span className="text-[#D4896B]">dream</span> property with experts</h1>
              <p className="text-gray-600 text-[16px] leading-relaxed mb-10 max-w-[480px]">{COMPANY_NAME} delivers premium construction, expert plumbing, custom metalwork, and stunning interior design across Nairobi and beyond.</p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => onNav('services')} className="px-8 py-4 bg-[#D4896B] text-white rounded-full text-[14px] font-bold hover:bg-[#c27a5e] transition-colors">Explore Services</button>
                <button onClick={() => onNav('contact')} className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full text-[14px] font-bold hover:bg-gray-900 hover:text-white transition-colors">Book Consultation</button>
              </div>
            </div>
            <div className="relative h-[520px]">
              <div className="absolute left-0 top-0 w-[52%] h-full">
                <ImageWithFallback
                  src="/images/hero/lavington-builders-designers-kitchen-cabinets-interior-design.jpg"
                  alt="Lavington Builders completed modern home — luxury interior with open plan design in Nairobi Kenya"
                  title="Modern home construction by Lavington Builders & Designers Company Limited"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute right-0 top-[80px] w-[52%] h-[calc(100%-80px)]">
                <ImageWithFallback
                  src="/images/hero/lavington-builders-designers-interior-design-kitchen-cabinets.jpg"
                  alt="Premium interior decoration and finishing work by Lavington Builders & Designers Nairobi Kenya"
                  title="Interior decoration and home finishing by Lavington Builders"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute bottom-8 left-4 bg-white rounded-xl shadow-xl p-5 z-10">
                <p className="text-[36px] font-black text-[#D4896B] leading-none">500+</p>
                <p className="text-gray-600 text-[12px] font-semibold mt-1">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <h2 className="text-[44px] font-black leading-[1.15] mb-6">Creative solutions<br />by professional<br />builders & designers</h2>
              <p className="text-gray-600 text-[15px] leading-relaxed mb-8">With years of hands-on experience across Nairobi and Kenya, our team brings craftsmanship, creativity, and commitment to every project — from small home repairs to full commercial builds.</p>
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
          <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-6 uppercase">Building With Heart</p>
          <h2 className="text-[52px] font-black leading-[1.2] mb-4">Ready to build your<br />dream property?</h2>
          <p className="text-gray-300 text-[16px] mb-10 max-w-lg mx-auto">Call us on {PHONE1} or {PHONE2} — we're ready to bring your vision to life.</p>
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
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/projects/lavington-builders-designers-metal-fabrication.jpg"
            alt="Construction services by Lavington Builders & Designers Company Limited — general construction, plumbing, metalwork Nairobi"
            title="Services — Lavington Builders & Designers Company Limited"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/62" />
        </div>
        <div className="max-w-[1400px] mx-auto px-8 relative z-10 text-white">
          <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-4 uppercase">What We Offer</p>
          <h1 className="text-[60px] font-black leading-[1.1] mb-4">Our Services</h1>
          <p className="text-gray-300 text-[17px] max-w-xl">From foundations to finishing touches — {COMPANY_NAME} covers every stage of your construction and design project.</p>
        </div>
      </section>
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
          <h2 className="text-[42px] font-black mb-6">Need a custom solution?</h2>
          <p className="text-gray-600 text-[16px] leading-relaxed mb-10">Every project is unique. Contact us to discuss your specific requirements and receive a tailored quote.</p>
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
      <section className="relative py-28">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/projects/lavington-builders-designers-stairs.jpg"
            alt="Portfolio of completed construction projects by Lavington Builders & Designers Company Limited Nairobi Kenya"
            title="Projects — Lavington Builders & Designers Company Limited"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/62" />
        </div>
        <div className="max-w-[1400px] mx-auto px-8 relative z-10 text-white">
          <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-4 uppercase">Our Portfolio</p>
          <h1 className="text-[60px] font-black leading-[1.1] mb-4">Projects</h1>
          <p className="text-gray-300 text-[17px] max-w-xl">Explore completed projects showcasing our craftsmanship and dedication to quality across Nairobi.</p>
        </div>
      </section>
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
      <section className="relative py-28">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/projects/lavington-builders-designers-kitchen-interior-design.jpg"
            alt="About Lavington Builders & Designers Company Limited — professional construction team Nairobi Kenya"
            title="About Us — Lavington Builders & Designers Company Limited"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="max-w-[1400px] mx-auto px-8 relative z-10 text-white">
          <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-4 uppercase">Who We Are</p>
          <h1 className="text-[60px] font-black leading-[1.1] mb-4">About Us</h1>
          <p className="text-gray-300 text-[17px] max-w-2xl">Building with excellence, designing with purpose — {COMPANY_NAME} is your trusted partner from concept to completion.</p>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-6 uppercase">Our Story</p>
              <h2 className="text-[44px] font-black leading-[1.2] mb-6">Built on trust,<br />delivered with pride</h2>
              <div className="space-y-5 text-gray-600 text-[15px] leading-relaxed">
                <p>{COMPANY_NAME} was founded with a clear mission: to deliver high-quality, affordable construction and design services to homes and businesses across Nairobi.</p>
                <p>We have grown steadily by earning the trust of our clients through transparent pricing, skilled workmanship, and genuine care for the spaces we help create. Every nail, pipe, and pane of glass reflects our commitment to excellence.</p>
                <p>Today, our experienced team offers a comprehensive range of services — from general construction and plumbing to metal fabrication, interior decoration, security doors, and office finishing.</p>
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
      <section className="relative py-28">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/projects/lavington-builders-designers-interior-design.jpg"
            alt="Contact Lavington Builders & Designers Company Limited — call +254 722 863 577 or email lav4designs@gmail.com"
            title="Contact Us — Lavington Builders & Designers Company Limited"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="max-w-[1400px] mx-auto px-8 relative z-10 text-white">
          <p className="text-[#D4896B] text-[11px] tracking-[0.2em] font-bold mb-4 uppercase">Reach Us</p>
          <h1 className="text-[60px] font-black leading-[1.1] mb-4">Contact Us</h1>
          <p className="text-gray-300 text-[17px] max-w-xl">We'd love to hear about your project. Call, email, or fill in the form below.</p>
        </div>
      </section>
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
                  { icon:<MapPin className="w-6 h-6 text-[#D4896B]"/>, label:'Location', content:<><p className="text-gray-600 text-[15px]">Lavington, Nairobi, Kenya</p><p className="text-gray-500 text-[13px] mt-1">Serving all areas across Nairobi & beyond</p></> },
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
  const handleNav = (p: string) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const meta = PAGE_META[page] || PAGE_META.home;
  if (typeof document !== 'undefined') {
    document.title = meta.title;
    let m = document.querySelector('meta[name="description"]') as HTMLMetaElement|null;
    if (!m) { m = document.createElement('meta') as HTMLMetaElement; m.name = 'description'; document.head.appendChild(m); }
    m.content = meta.description;
  }
  return (
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
  );
}
