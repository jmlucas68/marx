import React, { useState, useEffect } from 'react';
import { 
  BIOGRAPHY_SUMMARY, 
  KEY_CONCEPTS, 
  QUOTES, 
  INFLUENCES, 
  WORKS, 
  VIDEOS, 
  REFERENCES
} from './constants';
import { SectionId, DetailedSummary } from './types';
import { QuoteIcon, BookIcon, ExternalLinkIcon, VideoIcon, MenuIcon, XIcon } from './components/Icons';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HOME);
  
  // Generic Modal State
  const [activeModalData, setActiveModalData] = useState<DetailedSummary | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeModal = () => setActiveModalData(null);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(SectionId);
      const scrollPosition = window.scrollY + 150; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeModalData]);

  const NavLink: React.FC<{ id: SectionId; label: string }> = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`nav-link-mobile ${activeSection === id ? 'active' : ''}`}
    >
      {label}
    </button>
  );

  return (
    <div className="app-root">
      {/* Navigation Bar */}
      <header className="main-header">
        <div className="container header-content">
          <div className="logo-area" onClick={() => scrollToSection(SectionId.HOME)}>
            <div className="logo-icon">M</div>
            <h1 className="logo-text">KARL MARX</h1>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <MenuIcon className="icon-md" />
          </button>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {Object.entries({
              [SectionId.BIOGRAPHY]: 'Biografía',
              [SectionId.THOUGHT]: 'Pensamiento',
              [SectionId.WORKS]: 'Obras',
              [SectionId.VIDEOS]: 'Videos',
              [SectionId.REFERENCES]: 'Fuentes'
            }).map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id as SectionId)}
                className={activeSection === id ? 'active' : ''}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="mobile-dropdown">
             {Object.entries({
              [SectionId.HOME]: 'Inicio',
              [SectionId.BIOGRAPHY]: 'Biografía',
              [SectionId.THOUGHT]: 'Pensamiento',
              [SectionId.INFLUENCES]: 'Influencias',
              [SectionId.WORKS]: 'Obras Principales',
              [SectionId.VIDEOS]: 'Multimedia',
              [SectionId.REFERENCES]: 'Referencias'
            }).map(([id, label]) => (
              <NavLink key={id} id={id as SectionId} label={label} />
            ))}
          </div>
        )}
      </header>

      {/* GENERIC DETAILED SUMMARY MODAL */}
      {activeModalData && (
        <div className="modal-backdrop">
          <div className="modal-content">
             <button 
               onClick={closeModal}
               className="modal-close-btn"
             >
               <XIcon className="icon-md" />
             </button>
             
             <div className="modal-body">
               <div className="modal-header">
                 <span className="modal-tag">Explicación Detallada</span>
                 <h2 className="modal-title">{activeModalData.title}</h2>
                 <div className="modal-divider"></div>
               </div>
               
               <div>
                  <p className="modal-intro">{activeModalData.intro}</p>
                  
                  <div>
                    {activeModalData.sections.map((section, idx) => (
                      <div key={idx} className="modal-section">
                         <h3 className="modal-section-title">{section.heading}</h3>
                         <p className="modal-text">{section.text}</p>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="modal-footer">
                 <button 
                   onClick={closeModal}
                   className="btn-modal-close"
                 >
                   Cerrar
                 </button>
               </div>
             </div>
          </div>
        </div>
      )}

      <main>
        
        {/* HERO SECTION */}
        <section id={SectionId.HOME} className="hero-section">
           <div className="hero-bg-overlay"></div>
           <div className="container hero-content">
             <div className="hero-text">
                <span className="hero-tag">Filósofo • Economista • Revolucionario</span>
                <h2 className="hero-title">
                  Trabajadores del mundo, <span className="highlight-gold">¡uníos!</span>
                </h2>
                <p className="hero-description">
                  Explora la vida y el legado intelectual de uno de los pensadores más influyentes de la historia moderna.
                </p>
                <button 
                  onClick={() => scrollToSection(SectionId.BIOGRAPHY)}
                  className="btn-hero"
                >
                  Comenzar Lectura
                </button>
             </div>
             <div className="hero-image-container">
                <div className="hero-card">
                   <img 
                    src="https://picsum.photos/seed/marxstatue/800/1000?grayscale" 
                    alt="Monumento abstracto representativo" 
                    className="hero-img"
                   />
                   <div className="hero-card-footer">
                     <p>1818 — 1883</p>
                   </div>
                </div>
             </div>
           </div>
        </section>

        {/* QUOTE SEPARATOR */}
        <div className="quote-separator">
          <blockquote className="main-quote">
            "{QUOTES[0].text}"
            <footer className="quote-author">— {QUOTES[0].source}</footer>
          </blockquote>
        </div>

        {/* BIOGRAPHY SECTION */}
        <section id={SectionId.BIOGRAPHY} className="container bio-section scroll-margin-top">
          <div className="bio-grid">
            <div className="bio-sidebar">
               <h3 className="bio-title">Biografía</h3>
               <p className="bio-subtitle">Del idealismo a la praxis revolucionaria.</p>
               <img src="https://picsum.photos/seed/trier/400/300?grayscale" alt="Ciudad natal" className="bio-img" />
               <span className="bio-caption">Tréveris, Prusia</span>
            </div>
            <div className="bio-content">
              <p className="bio-lead">{BIOGRAPHY_SUMMARY}</p>
              <div className="timeline">
                <div className="timeline-item">
                  <span className="timeline-dot red"></span>
                  <h4 className="timeline-year">1818</h4>
                  <p>Nace en Tréveris en el seno de una familia judía convertida al protestantismo.</p>
                </div>
                <div className="timeline-item">
                  <span className="timeline-dot"></span>
                  <h4 className="timeline-year">1841</h4>
                  <p>Se doctora en Filosofía en la Universidad de Jena. Se vincula a los Jóvenes Hegelianos.</p>
                </div>
                <div className="timeline-item">
                   <span className="timeline-dot"></span>
                   <h4 className="timeline-year">1844</h4>
                   <p>Conoce a <strong>Friedrich Engels</strong> en París, iniciando una colaboración intelectual de por vida.</p>
                </div>
                <div className="timeline-item">
                   <span className="timeline-dot red"></span>
                   <h4 className="timeline-year">1848</h4>
                   <p>Publicación del <em>Manifiesto Comunista</em> en vísperas de las revoluciones europeas.</p>
                </div>
                <div className="timeline-item">
                   <span className="timeline-dot"></span>
                   <h4 className="timeline-year">1867</h4>
                   <p>Publicación del primer volumen de <em>El Capital</em>.</p>
                </div>
                <div className="timeline-item">
                   <span className="timeline-dot"></span>
                   <h4 className="timeline-year">1883</h4>
                   <p>Fallece en Londres. Es enterrado en el cementerio de Highgate.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THOUGHT SECTION */}
        <section id={SectionId.THOUGHT} className="thought-section scroll-margin-top">
          <div className="container">
            <div className="thought-header">
              <h3 className="section-title">Pensamiento Fundamental</h3>
              <div className="divider-red"></div>
              <p style={{color: '#4b5563', maxWidth: '42rem', margin: '1rem auto'}}>Conceptos clave para entender la crítica marxista al sistema capitalista y su visión de la historia.</p>
            </div>
            
            <div className="concepts-grid">
              {KEY_CONCEPTS.map((concept, idx) => (
                <div key={idx} className="concept-card">
                  <h4 className="concept-title">{concept.title}</h4>
                  <p className="concept-desc">{concept.shortDescription}</p>
                  <button 
                    onClick={() => setActiveModalData(concept.details)}
                    className="btn-link"
                  >
                    Leer explicación detallada →
                  </button>
                </div>
              ))}
            </div>

            <div className="quotes-grid">
              {QUOTES.slice(1).map((quote, i) => (
                <div key={i} className="quote-card">
                  <QuoteIcon className="quote-icon-bg" />
                  <p className="quote-text-card">"{quote.text}"</p>
                  <p className="quote-source-card">— {quote.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INFLUENCES SECTION */}
        <section id={SectionId.INFLUENCES} className="influences-section scroll-margin-top">
           <div className="container">
             <h3 className="section-title" style={{textAlign: 'center', marginBottom: '3rem'}}>Contexto e Influencias</h3>
             
             <div className="influences-container">
                <div className="influence-col">
                  <h4 className="inf-header">
                    <span style={{marginRight: '0.5rem'}}>←</span> Recibidas
                  </h4>
                  <div className="inf-list">
                    {INFLUENCES.filter(inf => inf.type === 'received').map((inf, i) => (
                      <div key={i} className="inf-card received">
                        <h5 className="inf-name">{inf.name}</h5>
                        <p className="inf-desc">{inf.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="influence-col">
                   <h4 className="inf-header right">
                    Ejercidas <span style={{marginLeft: '0.5rem'}}>→</span>
                  </h4>
                   <div className="inf-list">
                    {INFLUENCES.filter(inf => inf.type === 'exerted').map((inf, i) => (
                      <div key={i} className="inf-card exerted">
                        <h5 className="inf-name">{inf.name}</h5>
                        <p className="inf-desc">{inf.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
           </div>
        </section>

        {/* WORKS SECTION */}
        <section id={SectionId.WORKS} className="works-section scroll-margin-top">
          <div className="container">
             <div className="works-header">
               <h3 className="section-title" style={{color: 'white', marginBottom: 0}}>Obras Principales</h3>
               <span className="works-tag">BIBLIOTECA VIRTUAL</span>
             </div>
             
             <div className="works-grid">
               {WORKS.map((work, idx) => (
                 <div key={idx} className="work-card">
                    <div className="work-card-top">
                      <BookIcon className="book-icon" />
                      <span className="year-badge">{work.year}</span>
                    </div>
                    <h4 className="work-title">{work.title}</h4>
                    <p className="work-desc">{work.description}</p>
                    
                    <div className="work-actions">
                      {work.hasSummary && work.summaryData && (
                        <button 
                          onClick={() => setActiveModalData(work.summaryData!)}
                          className="btn-summary"
                        >
                          Resumen
                        </button>
                      )}
                      <a 
                        href={work.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`btn-ebook ${!work.hasSummary ? 'full-width' : ''}`}
                      >
                        {work.isFree ? 'Ebook' : 'Ver'}
                        <ExternalLinkIcon style={{width: '1rem', height: '1rem', marginLeft: '0.5rem'}} />
                      </a>
                    </div>
                 </div>
               ))}
             </div>
             <div style={{marginTop: '2rem', textAlign: 'center'}}>
                <p style={{color: '#6b7280', fontSize: '0.875rem'}}>
                  Textos cortesía de <a href="https://www.marxists.org/espanol/" target="_blank" rel="noreferrer" style={{color: 'var(--marx-gold)'}}>Marxists Internet Archive</a>
                </p>
             </div>
          </div>
        </section>

        {/* VIDEOS SECTION */}
        <section id={SectionId.VIDEOS} className="videos-section scroll-margin-top">
          <div className="container">
            <h3 className="section-title" style={{display: 'flex', alignItems: 'center'}}>
              <VideoIcon style={{width: '2rem', height: '2rem', marginRight: '0.75rem', color: 'var(--marx-red)'}} />
              Material Audiovisual
            </h3>
            <div className="video-grid">
              {VIDEOS.map((video, idx) => (
                <div key={idx} className="video-card">
                   <div className="video-frame-container">
                      <iframe 
                        className="video-iframe"
                        src={video.url} 
                        title={video.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                   </div>
                   <h4 className="video-title">{video.title}</h4>
                   <p className="video-channel">{video.channel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REFERENCES SECTION */}
        <section id={SectionId.REFERENCES} className="ref-section scroll-margin-top">
           <div className="container">
              <h3 className="section-title" style={{fontSize: '1.5rem'}}>Fuentes y Enlaces Externos</h3>
              <div className="ref-grid">
                {REFERENCES.map((ref, idx) => (
                  <a 
                    key={idx} 
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ref-card"
                  >
                    <div className="ref-icon-box">
                      <ExternalLinkIcon style={{width: '1rem', height: '1rem'}} />
                    </div>
                    <div>
                      <h5 className="ref-name">{ref.name}</h5>
                      <p className="ref-desc">{ref.description}</p>
                    </div>
                  </a>
                ))}
              </div>
           </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-decoration">
             <div className="footer-line"></div>
             <span className="footer-symbol">☭</span>
             <div className="footer-line"></div>
          </div>
          <p className="footer-text">Esta página es un proyecto educativo sin fines de lucro.</p>
          <p className="footer-small">
            Generado con Inteligencia Artificial: <span style={{color: 'var(--gray-500)'}}>Google Gemini 2.5 Flash</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;