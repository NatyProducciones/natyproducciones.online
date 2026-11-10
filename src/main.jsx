import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Clapperboard,
  Instagram,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  Menu,
  Mic,
  Music,
  PartyPopper,
  Phone,
  Play,
  Radio,
  Sparkles,
  UsersRound,
  Volume2,
  Waves,
  X,
} from 'lucide-react';
import './styles.css';

const photos = [
  { src: 'photo-01.jpg', title: 'Micrófono en acción', type: 'foto' },
  { src: 'natylavoz-promocional.mp4', title: 'Pieza promocional NatyLaVoz Comercial', type: 'video' },
  { src: 'photo-03.jpg', title: 'Presentación con micrófono', type: 'foto' },
  { src: 'photo-04.jpg', title: 'Espectáculo en vivo', type: 'foto' },
  { src: 'photo-05.jpg', title: 'Evento con público', type: 'foto' },
  { src: 'photo-06.jpg', title: 'Promoción en punto de venta', type: 'foto' },
  { src: 'photo-07.jpg', title: 'Jornada de promoción', type: 'foto' },
  { src: 'photo-08.jpg', title: 'Actividad promocional en exterior', type: 'foto' },
  { src: 'photo-09.jpg', title: 'Activación en punto de venta', type: 'foto' },
  { src: 'photo-10.jpg', title: 'Anuncio con amplificación', type: 'foto' },
  { src: 'photo-11.jpg', title: 'Promoción en la calle', type: 'foto' },
  { src: 'photo-12.jpg', title: 'Una voz para cada marca', type: 'diseño' },
  { src: 'photo-13.jpg', title: 'Espacio de promoción', type: 'foto' },
  { src: 'photo-14.jpg', title: 'Cuñas comerciales', type: 'diseño' },
  { src: 'photo-15.jpg', title: 'Vehículo de sonido promocional', type: 'foto' },
  { src: 'photo-16.jpg', title: 'Presencia en punto de venta', type: 'foto' },
  { src: 'photo-17.jpg', title: 'Registro de actividad comercial', type: 'foto' },
  { src: 'photo-18.jpg', title: 'Promoción móvil', type: 'foto' },
  { src: 'photo-19.jpg', title: 'Promoción en local', type: 'foto' },
  { src: 'photo-20.jpg', title: 'Actividad comercial', type: 'foto' },
  { src: 'photo-21.jpg', title: 'Servicios de Naty Producciones', type: 'diseño' },
  { src: 'photo-22.jpg', title: 'Sonido para eventos', type: 'foto' },
  { src: 'photo-23.jpg', title: 'Show en vivo', type: 'foto' },
];

const videos = Array.from({ length: 7 }, (_, index) => ({
  src: `video-${String(index + 1).padStart(2, '0')}.mp4`,
  title: `Registro audiovisual ${String(index + 1).padStart(2, '0')}`,
  type: 'video',
}));

const portfolio = [...videos, ...photos];
const mediaUrl = (file) => `${import.meta.env.BASE_URL}media/${file}`;

const services = [
  {
    icon: Radio,
    title: 'Cuñas comerciales',
    text: 'Mensajes para radio y medios digitales, lanzamientos, promociones y temporadas.',
    number: '01',
  },
  {
    icon: Megaphone,
    title: 'Perifoneo y anuncios',
    text: 'Publicidad móvil con sonido para comunicar tu mensaje en el lugar indicado.',
    number: '02',
  },
  {
    icon: UsersRound,
    title: 'Volanteo y promociones',
    text: 'Apoyo promocional para acercar marcas, productos y servicios a las personas.',
    number: '03',
  },
  {
    icon: PartyPopper,
    title: 'Eventos y animación',
    text: 'En el material promocional aparecen DJ, bailarinas, recreación y show infantil.',
    number: '04',
  },
  {
    icon: Clapperboard,
    title: 'Video y redes sociales',
    text: 'Videos institucionales y contenido para redes sociales, según la pieza promocional.',
    number: '05',
  },
];

function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return '--:--';
  const totalSeconds = Math.round(seconds);
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;
}

function useReveal(dependency) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [dependency]);
}

function VideoCard({ item, index }) {
  const [nearViewport, setNearViewport] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !('IntersectionObserver' in window)) {
      setNearViewport(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px' },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="work-card video-card" data-reveal ref={cardRef} style={{ '--delay': `${(index % 3) * 90}ms` }}>
      <div className="video-frame">
        {nearViewport && (
          <video
            controls
            autoPlay={false}
            muted
            playsInline
            preload="metadata"
            aria-label={item.title}
          >
            <source src={mediaUrl(item.src)} type="video/mp4" />
            Tu navegador no puede reproducir este video.
          </video>
        )}
        {!nearViewport && <div className="video-placeholder"><Play size={24} /></div>}
      </div>
      <div className="work-caption">
        <div>
          <span className="work-kicker">Video · archivo original</span>
          <h3>{item.title}</h3>
        </div>
        <span className="work-index">{String(index + 1).padStart(2, '0')}</span>
      </div>
    </article>
  );
}

function PhotoCard({ item, index }) {
  return (
    <article
      className={`work-card photo-card ${item.type !== 'foto' ? 'design-card' : ''}`}
      data-reveal
      style={{ '--delay': `${(index % 3) * 70}ms` }}
    >
      <div className="photo-frame">
        <img src={mediaUrl(item.src)} alt={item.title} loading="lazy" />
        <span className="photo-chip">{item.type === 'diseño' ? 'Pieza gráfica' : 'Fotografía'}</span>
      </div>
      <div className="work-caption">
        <div>
          <span className="work-kicker">Portafolio</span>
          <h3>{item.title}</h3>
        </div>
        <ArrowUpRight className="caption-arrow" size={18} aria-hidden="true" />
      </div>
    </article>
  );
}

function App() {
  const [filter, setFilter] = useState('todo');
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioDuration, setAudioDuration] = useState(null);
  const audioRef = useRef(null);
  useReveal(filter);
  const filteredPortfolio = portfolio.filter((item) => filter === 'todo' || item.type === filter);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio?.pause();
    return () => audio?.pause();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleTilt = (event) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(x - 0.5) * 6}deg`);
    event.currentTarget.style.setProperty('--shine-x', `${x * 100}%`);
    event.currentTarget.style.setProperty('--shine-y', `${y * 100}%`);
  };

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Naty Producciones, inicio" onClick={closeMenu}>
          <span className="brand-mark"><span>NY</span><i>♪</i></span>
          <span className="brand-copy">
            <strong>NATY <em>PRODUCCIONES</em></strong>
            <small>LA VOZ QUE IMPULSA MARCAS</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Navegación principal">
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#portafolio" onClick={closeMenu}>Portafolio</a>
          <a href="#audio" onClick={closeMenu}>Escucha</a>
          <a href="#contacto" className="nav-cta" onClick={closeMenu}>Hablemos <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-shell" id="inicio">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-copy" data-reveal>
            <div className="eyebrow"><span className="eyebrow-dot" /> PUBLICIDAD · VOZ · EVENTOS</div>
            <h1>Tu marca tiene algo que decir.<br /><span>Hagamos que suene.</span></h1>
            <p className="hero-lede">
              Cuñas comerciales, perifoneo y producción promocional para que tu mensaje llegue con fuerza.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contacto">Cuéntame tu idea <ArrowUpRight size={17} /></a>
              <a className="text-link" href="#portafolio">Ver trabajos <ArrowDownRight size={17} /></a>
            </div>
            <div className="hero-note">
              <MapPin size={16} />
              <span>Cali, Colombia</span>
              <span className="note-divider" />
              <span>Tu mensaje, en el momento indicado.</span>
            </div>
          </div>

          <div className="hero-visual-wrap" data-reveal>
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div
              className="hero-visual"
              onPointerMove={handleTilt}
              onPointerLeave={resetTilt}
            >
              <div className="visual-topline"><span>NY / EN VIVO</span><span className="live-dot" /> <span>SONIDO QUE CONECTA</span></div>
              <video
                autoPlay
                controls
                loop
                muted
                playsInline
                preload="auto"
                aria-label="Video promocional de NatyLaVoz Comercial en reproducción continua"
              >
                <source src={mediaUrl('natylavoz-promocional.mp4')} type="video/mp4" />
                Tu navegador no puede reproducir este video.
              </video>
              <div className="visual-bottomline">
                <span className="visual-icon"><Mic size={17} /></span>
                <span><strong>Una voz para tu marca</strong><small>PUBLICIDAD CON PERSONALIDAD</small></span>
                <ArrowUpRight size={19} />
              </div>
            </div>
            <div className="floating-stamp">
              <Waves size={18} />
              <span>Hazte<br />escuchar</span>
            </div>
            <div className="visual-caption"><span className="caption-line" /> UNA VOZ, MUCHAS FORMAS DE LLEGAR</div>
          </div>
          <a className="hero-scroll" href="#servicios" aria-label="Desplazarse a servicios"><span /> BAJA PARA EXPLORAR</a>
        </section>

        <section className="intro-strip" data-reveal>
          <div className="section-shell strip-inner">
            <Sparkles size={18} />
            <p>Voces que conectan, <strong>mensajes que venden.</strong></p>
            <span className="strip-note">NATY PRODUCCIONES</span>
          </div>
        </section>

        <section className="services section-shell section-space" id="servicios">
          <div className="section-heading" data-reveal>
            <div>
              <div className="eyebrow"><span className="eyebrow-dot" /> LO QUE HACEMOS</div>
              <h2>Ideas que se oyen.<br /><span>Marcas que se recuerdan.</span></h2>
            </div>
            <p>Servicios que aparecen en las piezas promocionales de Naty Producciones, reunidos en un solo lugar.</p>
          </div>

          <div className="service-grid">
            {services.map(({ icon: Icon, title, text, number }) => (
              <article className="service-card" data-reveal key={number} style={{ '--delay': `${Number(number) * 55}ms` }}>
                <div className="service-top"><span className="service-icon"><Icon size={20} /></span><span className="service-number">{number}</span></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="service-rule" />
              </article>
            ))}
          </div>

          <div className="service-footnote" data-reveal>
            <Volume2 size={17} />
            <span>También se anuncian alquiler de cabina y micrófono inalámbrico, carro valla, bailarina, recreación, DJ y show infantil.</span>
          </div>
        </section>

        <section className="portfolio-section section-space" id="portafolio">
          <div className="section-shell">
            <div className="section-heading portfolio-heading" data-reveal>
              <div>
                <div className="eyebrow"><span className="eyebrow-dot" /> DETRÁS DE CADA MARCA, UNA HISTORIA</div>
                <h2>Un vistazo al <span>trabajo real.</span></h2>
              </div>
              <p>Videos, fotografías y piezas gráficas compartidas en las carpetas originales.</p>
            </div>

            <div className="portfolio-tools" data-reveal>
              <div className="portfolio-count"><Camera size={16} /> ARCHIVO DE PRODUCCIÓN <span>·</span> {filteredPortfolio.length} PIEZAS</div>
              <div className="filter-list" role="group" aria-label="Filtrar portafolio">
                {[
                  ['todo', 'Todo'],
                  ['video', 'Videos'],
                  ['foto', 'Fotografías'],
                  ['diseño', 'Piezas visuales'],
                ].map(([value, label]) => (
                  <button
                    className={filter === value ? 'filter-chip active' : 'filter-chip'}
                    key={value}
                    onClick={() => setFilter(value)}
                    type="button"
                    aria-pressed={filter === value}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="work-grid">
              {filteredPortfolio.map((item, index) => item.type === 'video'
                ? <VideoCard item={item} index={index} key={item.src} />
                : <PhotoCard item={item} index={index} key={item.src} />)}
            </div>
          </div>
        </section>

        <section className="audio-section section-shell section-space" id="audio">
          <div className="audio-card" data-reveal>
            <div className="audio-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> ESCUCHA UNA MUESTRA</div>
              <h2>Para la gente linda<br /><span>de Jamundí, Valle.</span></h2>
              <p>Una información que no te puedes perder.</p>
              <div className="audio-meta"><span><Music size={14} /> MP3</span><span className="meta-separator" /><span>{formatDuration(audioDuration)}</span><span className="meta-separator" /><span>Reproducción manual</span></div>
            </div>
            <div className="audio-player">
              <div className="audio-player-head">
                <span className="audio-art"><Mic size={22} /></span>
                <div><span className="work-kicker">ARCHIVO DE AUDIO</span><strong>Para la gente linda de Jamundí</strong><small>Una información que no te puedes perder</small></div>
                <span className="audio-wave-icon"><Waves size={19} /></span>
              </div>
              <div className={`waveform ${audioReady ? 'waveform-ready' : ''}`} aria-hidden="true">
                {Array.from({ length: 36 }, (_, index) => (
                  <span key={index} style={{ '--bar-height': `${18 + ((index * 37 + 13) % 76)}%`, '--bar-delay': `${(index % 9) * 45}ms` }} />
                ))}
              </div>
              <audio
                ref={audioRef}
                controls
                autoPlay={false}
                preload="metadata"
                onLoadedMetadata={(event) => setAudioDuration(event.currentTarget.duration)}
                onPlay={() => setAudioReady(true)}
                onPause={() => setAudioReady(false)}
                onEnded={() => setAudioReady(false)}
                aria-label="Reproducir información para la gente linda de Jamundí"
              >
                <source src={mediaUrl('jamundi-mp3.mp3')} type="audio/mpeg" />
                Tu navegador no puede reproducir este audio.
              </audio>
              <div className="audio-player-foot"><span><span className="status-dot" /> LISTO PARA REPRODUCIR</span><span>{audioDuration === null ? 'ARCHIVO MP3' : `${formatDuration(audioDuration)} TOTAL`}</span></div>
            </div>
          </div>
        </section>

        <section className="contact-section section-space" id="contacto">
          <div className="section-shell contact-layout">
            <div className="contact-copy" data-reveal>
              <div className="eyebrow"><span className="eyebrow-dot" /> ¿TIENES UNA IDEA?</div>
              <h2>Hagamos que<br /><span>se haga escuchar.</span></h2>
              <p>Escríbenos directamente y cuéntanos qué necesitas para tu marca, promoción o evento.</p>
              <a className="button button-primary contact-button" href="https://wa.me/573125181066?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Naty%20Producciones." target="_blank" rel="noreferrer">
                <MessageIcon /> Hablar por WhatsApp <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="contact-card" data-reveal>
              <div className="contact-card-heading"><span className="contact-mini-logo">NY</span><div><strong>Naty Producciones</strong><span>La voz que impulsa marcas</span></div></div>
              <a className="contact-row" href="tel:+573125181066"><span className="contact-icon"><Phone size={18} /></span><span><small>LLÁMANOS / WHATSAPP</small><strong>+57 312 518 1066</strong></span><ArrowUpRight size={17} /></a>
              <a className="contact-row" href="mailto:natylavozcomercial@gmail.com"><span className="contact-icon"><Mail size={18} /></span><span><small>ESCRÍBENOS</small><strong>natylavozcomercial@gmail.com</strong></span><ArrowUpRight size={17} /></a>
              <a className="contact-row" href="https://instagram.com/natylavozcomercial" target="_blank" rel="noreferrer"><span className="contact-icon"><Instagram size={18} /></span><span><small>INSTAGRAM</small><strong>@natylavozcomercial</strong></span><ArrowUpRight size={17} /></a>
              <div className="contact-location"><MapPin size={17} /><span>Cali, Colombia</span><span className="location-line" /></div>
              <p className="contact-source">Datos de contacto tomados de las piezas gráficas compartidas.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <a className="brand footer-brand" href="#inicio">
            <span className="brand-mark"><span>NY</span><i>♪</i></span>
            <span className="brand-copy"><strong>NATY <em>PRODUCCIONES</em></strong><small>LA VOZ QUE IMPULSA MARCAS</small></span>
          </a>
          <span className="footer-tagline">Haz que tu negocio suene, se vea y venda más.</span>
          <a className="back-top" href="#inicio">VOLVER ARRIBA <ArrowUpRight size={14} /></a>
          <span className="copyright">© {new Date().getFullYear()} Naty Producciones</span>
        </div>
      </footer>
    </>
  );
}

function MessageIcon() {
  return <MessageCircle size={18} aria-hidden="true" />;
}

export default App;

createRoot(document.getElementById('root')).render(<App />);
