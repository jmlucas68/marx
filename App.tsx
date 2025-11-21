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
      className={`text-left px-4 py-2 w-full transition-colors duration-300 font-sans font-medium
        ${activeSection === id 
          ? 'bg-marx-red text-white border-l-4 border-marx-gold' 
          : 'text-gray-700 hover:bg-gray-100 hover:text-marx-red'
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-marx-paper text-marx-dark font-sans selection:bg-marx-red selection:text-white">
      {/* Navigation Bar (Mobile & Desktop Sticky) */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white shadow-md border-b-4 border-marx-red">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection(SectionId.HOME)}>
            <div className="w-8 h-8 bg-marx-red rounded-full flex items-center justify-center text-marx-gold font-bold font-serif">M</div>
            <h1 className="text-xl font-display font-bold text-marx-dark tracking-wider">KARL MARX</h1>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-marx-dark focus:outline-none" onClick={toggleMenu}>
            <MenuIcon className="w-6 h-6" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
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
                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-marx-red ${activeSection === id ? 'text-marx-red border-b-2 border-marx-red' : 'text-gray-500'}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg absolute w-full">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-marx-paper w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded shadow-2xl relative border-t-8 border-marx-red">
             <button 
               onClick={closeModal}
               className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-marx-red hover:text-white rounded-full transition-colors z-10"
             >
               <XIcon className="w-6 h-6" />
             </button>
             
             <div className="p-8 md:p-12">
               <div className="text-center mb-8">
                 <span className="text-marx-gold font-bold tracking-widest uppercase text-xs mb-2 block">Explicación Detallada</span>
                 <h2 className="text-3xl md:text-4xl font-display font-bold text-marx-dark mb-4 leading-tight">{activeModalData.title}</h2>
                 <div className="w-20 h-1 bg-marx-red mx-auto"></div>
               </div>
               
               <div className="prose prose-lg prose-stone mx-auto text-gray-700 font-serif leading-relaxed">
                  <p className="font-bold italic text-xl mb-8 text-center text-gray-800">{activeModalData.intro}</p>
                  
                  <div className="space-y-8">
                    {activeModalData.sections.map((section, idx) => (
                      <div key={idx} className="bg-white p-6 rounded border-l-4 border-marx-gold shadow-sm">
                         <h3 className="text-xl font-bold text-marx-red mb-2 font-sans uppercase">{section.heading}</h3>
                         <p>{section.text}</p>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="mt-8 text-center">
                 <button 
                   onClick={closeModal}
                   className="px-6 py-2 bg-marx-dark text-white font-bold hover:bg-gray-800 transition-colors rounded"
                 >
                   Cerrar
                 </button>
               </div>
             </div>
          </div>
        </div>
      )}

      <main className="pt-16">
        
        {/* HERO SECTION */}
        <section id={SectionId.HOME} className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-gray-900 to-marx-red text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/paper/1920/1080')] mix-blend-overlay"></div>
           <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center">
             <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left animate-fade-in-up">
                <span className="inline-block py-1 px-3 border border-marx-gold text-marx-gold text-xs tracking-[0.2em] uppercase mb-4">Filósofo • Economista • Revolucionario</span>
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                  Trabajadores del mundo, <span className="text-marx-gold italic">¡uníos!</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg font-serif leading-relaxed">
                  Explora la vida y el legado intelectual de uno de los pensadores más influyentes de la historia moderna.
                </p>
                <button 
                  onClick={() => scrollToSection(SectionId.BIOGRAPHY)}
                  className="bg-marx-gold text-marx-dark font-bold py-3 px-8 rounded-sm hover:bg-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                >
                  Comenzar Lectura
                </button>
             </div>
             <div className="md:w-1/2 flex justify-center">
                <div className="relative w-80 h-96 md:w-[500px] md:h-[600px] border-8 border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                   <img 
                    src="https://picsum.photos/seed/marxstatue/800/1000?grayscale" 
                    alt="Monumento abstracto representativo" 
                    className="w-full h-full object-cover filter contrast-125 sepia-[.3]"
                   />
                   <div className="absolute bottom-0 left-0 bg-marx-dark/80 text-white p-4 backdrop-blur-sm w-full">
                     <p className="font-display font-bold text-center">1818 — 1883</p>
                   </div>
                </div>
             </div>
           </div>
        </section>

        {/* QUOTE SEPARATOR */}
        <div className="bg-marx-dark py-12 text-center px-4">
          <blockquote className="font-serif text-xl md:text-2xl text-marx-paper max-w-3xl mx-auto italic leading-relaxed">
            "{QUOTES[0].text}"
            <footer className="text-marx-gold text-sm mt-4 not-italic font-sans uppercase tracking-widest">— {QUOTES[0].source}</footer>
          </blockquote>
        </div>

        {/* BIOGRAPHY SECTION */}
        <section id={SectionId.BIOGRAPHY} className="py-20 container mx-auto px-6 scroll-margin-top">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 sticky top-24">
               <h3 className="text-4xl font-display font-bold text-marx-red mb-6 border-l-8 border-marx-dark pl-4">Biografía</h3>
               <p className="text-gray-600 mb-6 font-serif italic">Del idealismo a la praxis revolucionaria.</p>
               <img src="https://picsum.photos/seed/trier/400/300?grayscale" alt="Ciudad natal" className="w-full rounded shadow-lg mb-4 opacity-80 hover:opacity-100 transition-opacity" />
               <span className="text-xs text-gray-500 uppercase tracking-wide block text-right">Tréveris, Prusia</span>
            </div>
            <div className="md:w-2/3 prose prose-lg prose-red text-gray-700">
              <p className="lead text-xl mb-6 font-serif">{BIOGRAPHY_SUMMARY}</p>
              <div className="border-l-2 border-marx-gold pl-6 space-y-8 mt-8">
                <div className="relative">
                  <span className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-marx-red border-2 border-white shadow"></span>
                  <h4 className="text-lg font-bold text-marx-dark">1818</h4>
                  <p>Nace en Tréveris en el seno de una familia judía convertida al protestantismo.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-marx-dark border-2 border-white shadow"></span>
                  <h4 className="text-lg font-bold text-marx-dark">1841</h4>
                  <p>Se doctora en Filosofía en la Universidad de Jena. Se vincula a los Jóvenes Hegelianos.</p>
                </div>
                <div className="relative">
                   <span className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-marx-dark border-2 border-white shadow"></span>
                   <h4 className="text-lg font-bold text-marx-dark">1844</h4>
                   <p>Conoce a <strong>Friedrich Engels</strong> en París, iniciando una colaboración intelectual de por vida.</p>
                </div>
                <div className="relative">
                   <span className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-marx-red border-2 border-white shadow"></span>
                   <h4 className="text-lg font-bold text-marx-dark">1848</h4>
                   <p>Publicación del <em>Manifiesto Comunista</em> en vísperas de las revoluciones europeas.</p>
                </div>
                <div className="relative">
                   <span className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-marx-dark border-2 border-white shadow"></span>
                   <h4 className="text-lg font-bold text-marx-dark">1867</h4>
                   <p>Publicación del primer volumen de <em>El Capital</em>.</p>
                </div>
                <div className="relative">
                   <span className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-marx-dark border-2 border-white shadow"></span>
                   <h4 className="text-lg font-bold text-marx-dark">1883</h4>
                   <p>Fallece en Londres. Es enterrado en el cementerio de Highgate.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THOUGHT SECTION */}
        <section id={SectionId.THOUGHT} className="py-20 bg-white scroll-margin-top">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-display font-bold text-marx-dark mb-4">Pensamiento Fundamental</h3>
              <div className="w-24 h-1 bg-marx-red mx-auto"></div>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Conceptos clave para entender la crítica marxista al sistema capitalista y su visión de la historia.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {KEY_CONCEPTS.map((concept, idx) => (
                <div key={idx} className="bg-marx-paper p-8 rounded-sm border-t-4 border-marx-dark hover:border-marx-red transition-colors duration-300 shadow-sm flex flex-col">
                  <h4 className="text-2xl font-display font-bold text-marx-red mb-4">{concept.title}</h4>
                  <p className="text-gray-700 leading-relaxed font-serif mb-6 flex-grow">{concept.shortDescription}</p>
                  <button 
                    onClick={() => setActiveModalData(concept.details)}
                    className="self-start text-xs font-bold uppercase tracking-widest border-b-2 border-marx-gold text-marx-dark hover:text-marx-red hover:border-marx-red transition-all pb-1"
                  >
                    Leer explicación detallada →
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {QUOTES.slice(1).map((quote, i) => (
                <div key={i} className="relative p-6 bg-marx-dark text-gray-300 rounded-lg">
                  <QuoteIcon className="w-8 h-8 text-marx-gold opacity-30 absolute top-4 left-4" />
                  <p className="font-serif italic text-lg relative z-10 pt-4 pl-4">"{quote.text}"</p>
                  <p className="text-right text-marx-gold text-sm mt-4 uppercase tracking-wider">— {quote.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INFLUENCES SECTION */}
        <section id={SectionId.INFLUENCES} className="py-20 bg-gray-100 scroll-margin-top">
           <div className="container mx-auto px-6">
             <h3 className="text-3xl font-display font-bold text-center mb-12 text-marx-dark">Contexto e Influencias</h3>
             
             <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-marx-red mb-6 border-b border-gray-300 pb-2 flex items-center">
                    <span className="mr-2">←</span> Recibidas
                  </h4>
                  <div className="space-y-4">
                    {INFLUENCES.filter(inf => inf.type === 'received').map((inf, i) => (
                      <div key={i} className="bg-white p-4 rounded shadow-sm border-l-4 border-gray-400">
                        <h5 className="font-bold text-lg">{inf.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">{inf.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                   <h4 className="text-xl font-bold text-marx-red mb-6 border-b border-gray-300 pb-2 flex items-center justify-end">
                    Ejercidas <span className="ml-2">→</span>
                  </h4>
                   <div className="space-y-4 text-right">
                    {INFLUENCES.filter(inf => inf.type === 'exerted').map((inf, i) => (
                      <div key={i} className="bg-white p-4 rounded shadow-sm border-r-4 border-marx-red">
                        <h5 className="font-bold text-lg">{inf.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">{inf.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
           </div>
        </section>

        {/* WORKS SECTION */}
        <section id={SectionId.WORKS} className="py-20 bg-marx-dark text-marx-paper scroll-margin-top">
          <div className="container mx-auto px-6">
             <div className="flex items-center justify-between mb-12">
               <h3 className="text-4xl font-display font-bold">Obras Principales</h3>
               <span className="hidden md:inline-block text-marx-gold text-sm font-mono border border-marx-gold px-2 py-1 rounded">BIBLIOTECA VIRTUAL</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {WORKS.map((work, idx) => (
                 <div key={idx} className="bg-neutral-800 group hover:bg-neutral-700 transition-all duration-300 p-6 rounded-sm border border-neutral-700 hover:border-marx-gold flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <BookIcon className="w-8 h-8 text-marx-red group-hover:text-marx-gold transition-colors" />
                      <span className="text-xs font-mono text-gray-400 bg-black/30 px-2 py-1 rounded">{work.year}</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-white group-hover:text-marx-gold transition-colors">{work.title}</h4>
                    <p className="text-gray-400 text-sm mb-6 flex-grow">{work.description}</p>
                    
                    <div className="flex space-x-2">
                      {work.hasSummary && work.summaryData && (
                        <button 
                          onClick={() => setActiveModalData(work.summaryData!)}
                          className="flex-1 py-2 bg-marx-gold text-marx-dark hover:bg-white font-bold uppercase text-sm rounded transition-colors"
                        >
                          Resumen
                        </button>
                      )}
                      <a 
                        href={work.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex-1 inline-flex items-center justify-center py-2 bg-marx-red/20 hover:bg-marx-red text-marx-red hover:text-white border border-marx-red rounded transition-all duration-300 text-sm font-bold uppercase tracking-wider ${!work.hasSummary ? 'w-full' : ''}`}
                      >
                        {work.isFree ? 'Ebook' : 'Ver'}
                        <ExternalLinkIcon className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                 </div>
               ))}
             </div>
             <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  Textos cortesía de <a href="https://www.marxists.org/espanol/" target="_blank" rel="noreferrer" className="text-marx-gold hover:underline">Marxists Internet Archive</a>
                </p>
             </div>
          </div>
        </section>

        {/* VIDEOS SECTION */}
        <section id={SectionId.VIDEOS} className="py-20 bg-white scroll-margin-top">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-display font-bold text-marx-dark mb-10 flex items-center">
              <VideoIcon className="w-8 h-8 mr-3 text-marx-red" />
              Material Audiovisual
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {VIDEOS.map((video, idx) => (
                <div key={idx} className="flex flex-col group cursor-pointer">
                   <div className="relative overflow-hidden rounded-lg shadow-lg aspect-video bg-gray-200 mb-4">
                      <iframe 
                        className="w-full h-full absolute inset-0"
                        src={video.url} 
                        title={video.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                   </div>
                   <h4 className="font-bold text-lg text-marx-dark group-hover:text-marx-red transition-colors">{video.title}</h4>
                   <p className="text-sm text-gray-500">{video.channel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REFERENCES SECTION */}
        <section id={SectionId.REFERENCES} className="py-16 bg-marx-paper border-t border-gray-300 scroll-margin-top">
           <div className="container mx-auto px-6">
              <h3 className="text-2xl font-display font-bold text-marx-dark mb-8">Fuentes y Enlaces Externos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REFERENCES.map((ref, idx) => (
                  <a 
                    key={idx} 
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-4 bg-white rounded border border-gray-200 hover:border-marx-red hover:shadow-md transition-all group"
                  >
                    <div className="mr-4 mt-1 bg-gray-100 p-2 rounded-full group-hover:bg-marx-red group-hover:text-white transition-colors">
                      <ExternalLinkIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-marx-dark group-hover:text-marx-red">{ref.name}</h5>
                      <p className="text-sm text-gray-600">{ref.description}</p>
                    </div>
                  </a>
                ))}
              </div>
           </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-marx-dark text-white py-8 border-t-4 border-marx-gold">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4 opacity-50">
             <div className="h-px bg-white w-16"></div>
             <span className="text-marx-gold font-serif text-2xl">☭</span>
             <div className="h-px bg-white w-16"></div>
          </div>
          <p className="text-gray-400 text-sm mb-2">Esta página es un proyecto educativo sin fines de lucro.</p>
          <p className="text-xs text-gray-600 font-mono">
            Generado con Inteligencia Artificial: <span className="text-gray-500">Google Gemini 2.5 Flash</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;