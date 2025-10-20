import React, { useState, useEffect, useRef } from 'react'
import './App.css'
function App() {


const pastEvents = [
  {
    title: "Switcmed II",
    description: "Participation  à la remise des prix « Switcmed II » organisée par le réseau des CTPE - Fondation Mohamed V pour la solidarité.",
    image: "pic1.jpeg",
  },
  {
    title: "forum de  la #CGEM Tanger Tetouan Al Hoceima",
    description: "Participation au forum de  la #CGEM Tanger Tetouan Al Hoceima, sous la thématique: «Entrepreneuriat des jeunes, levier de développement socio-économique».",
    image: "pic2.jpeg",
  } ,
   {
    title: "SALON DU LIVRE",
    description: "dynamiques de réflexion à l’occasion Participation au  salon du livre et réflexion contemporaine sur les défis à relever pour tendre vers un  modèle de croissance économique intensif en capital et  générateur de plus d’emplois au Maroc.",
    image: "dynamic.jpeg",
  },
     {
    title: "YOUTH DAY Economic Integration Forum",
    description: "Participation au YOUTH Economic Integration Forum organisé en marge des « annual meetings of International Monetary Fund  and The World Bank ».",
    image: "youthday.jpeg",
  }
];


  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollAnimRef = useRef(null)
  const headerRef = useRef(null)

  const smoothScrollTo = (targetY, duration = 700) => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scrollingElement = document.scrollingElement || document.documentElement || document.body
    if (prefersReduced) {
      scrollingElement.scrollTo(0, targetY)
      return
    }

    // cancel previous
    if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current)

    const startY = scrollingElement.scrollTop || window.pageYOffset
    const distance = targetY - startY
    const maxDuration = 1200
    const minDuration = 480
    const durationAdaptive = Math.min(maxDuration, Math.max(minDuration, Math.abs(distance) * 0.5))
    let startTime = null

    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    // temporarily disable CSS smooth scroll to avoid conflicting behaviors
    const html = document.documentElement
    const prevScrollBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / durationAdaptive, 1)
      const eased = easeInOutCubic(progress)
      const next = Math.round(startY + distance * eased)
      scrollingElement.scrollTo(0, next)
      if (elapsed < durationAdaptive) {
        scrollAnimRef.current = requestAnimationFrame(step)
      } else {
        // restore
        html.style.scrollBehavior = prevScrollBehavior || ''
        scrollAnimRef.current = null
      }
    }

    scrollAnimRef.current = requestAnimationFrame(step)
  }

const scrollToSection = (sectionId, e) => {
  e?.preventDefault();
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  setIsSidebarOpen(false);
};


  // reveal-on-scroll: add .is-visible to elements with .reveal
  useEffect(() => {
    if (typeof window === 'undefined') return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' })

    const els = document.querySelectorAll('.reveal')
    els.forEach((el, i) => {
      // small stagger
      el.style.transitionDelay = `${i * 70}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // shrink header on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset
      setIsScrolled(y > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
  <header className={`header ${isScrolled ? 'shrink' : ''}`} ref={headerRef}>
        <div className="header-container">
          <div className="brand">Dr. Imane Belmaati</div>
          <nav className="nav">
            <a href="#home" onClick={(e) => scrollToSection('home', e)}>Accueil</a>
            <a href="#about" onClick={(e) => scrollToSection('about', e)}>À propos</a>
            <a href="#formations" onClick={(e) => scrollToSection('formations', e)}>Formations</a>
            <a href="#distinctions" onClick={(e) => scrollToSection('distinctions', e)}>Distinctions</a>
            <a href="#initiatives" onClick={(e) => scrollToSection('initiatives', e)}>Initiatives</a>
            <a href="#contact" className="cta" onClick={(e) => scrollToSection('contact', e)}>Contact</a>
          </nav>
          <button
            className={`hamburger ${isSidebarOpen ? 'open' : ''}`}
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsSidebarOpen((s) => !s)}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="22" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`backdrop ${isSidebarOpen ? 'show' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <aside className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation">
        <div className="sidebar-header">
          <div className="brand">Menu</div>
          <button className="close-btn" aria-label="Close menu" onClick={() => setIsSidebarOpen(false)}>×</button>
        </div>
        <nav className="sidebar-nav">
          <a href="#home" onClick={(e) => scrollToSection('home', e)}>Accueil</a>
          <a href="#about" onClick={(e) => scrollToSection('about', e)}>À propos</a>
          <a href="#formations" onClick={(e) => scrollToSection('formations', e)}>Formations</a>
          <a href="#distinctions" onClick={(e) => scrollToSection('distinctions', e)}>Distinctions</a>
          <a href="#initiatives" onClick={(e) => scrollToSection('initiatives', e)}>Initiatives</a>
          <a href="#contact" onClick={(e) => scrollToSection('contact', e)}>Contact</a>
        </nav>
      </aside>

      {/* Hero Section */}
  <section id="home" className="hero reveal">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Dr. Imane Belmaati</h1>
            {/* <p className="hero-subtitle">La plateforme d'impact nouvelle génération</p> */}
            <p className="hero-quote">
              « PhD| Executive MBA| Master Finance| Expériences: DG SPE| Présidente Assoc.Mondiale SPE| Experte PNUD & Enjeux socio-économiques Emploi Entrepreneuriat Impact Transformation| Keynote Speaker Auteure & Essayiste engagée  »
              <br/><br/>
              <strong>Dr. Imane Belmaati – Présidente et membre fondatrice</strong>
            </p>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={(e) => scrollToSection('initiatives', e)}>
                Découvrir nos initiatives
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src="profil.jpeg" alt="Dr. Imane Belmaati" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>Dr. Imane Belmaati</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Dr. Imane BELMAATI est une intellectuelle marocaine engagée et experte en stratégies de 
                transformation et d'impact. Son parcours professionnel s'est construit à la croisée du 
                secteur public, du secteur privé, et des organisations internationales.
              </p>
              <p>
                Après avoir mené une carrière de près de 17 ans dans le secteur financier au niveau 
                national et international, Dr. BELMAATI a intégré le Programme des Nations Unies pour 
                le Développement en tant qu'experte, puis a occupé plusieurs hautes responsabilités dans 
                le secteur public en tant que Directrice Centrale puis en tant que Directrice Générale 
                de l'Agence Nationale de Promotion de l'Emploi et des Compétences.
              </p>
              <p>
                Dr. BELMAATI a également exercé plusieurs fonctions à portée internationale en tant que 
                présidente de l'Association Mondiale des Services Publics d'Emploi (WAPES) qui regroupe 
                plus de 80 pays, ainsi que le réseau PESNET-OCI qui regroupe plus de 57 pays membres 
                de l'Organisation de la Coopération Islamique.
              </p>
              <p>
                Aujourd'hui, elle pilote la création et l'animation d'écosystèmes de partenariats à impact 
                au sein d'un grand groupe financier, et continue à porter son engagement intellectuel et 
                social en présidant une plateforme d'initiatives à fort impact au niveau africain qui agit 
                en faveur de 3 thématiques : l'inclusion économique des jeunes en situation de vulnérabilité, 
                l'inclusion socio-économique des femmes et la promotion du leadership féminin, ainsi que 
                la promotion du développement durable.
              </p>
            </div>
              <div className="about-stats">
              <div className="stat">
                <h3 className="reveal">17+</h3>
                <p>Années d'expérience</p>
              </div>
              <div className="stat">
                <h3 className="reveal">80+</h3>
                <p>Pays WAPES</p>
              </div>
              <div className="stat">
                <h3 className="reveal">57+</h3>
                <p>Pays PESNET-OCI</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/******************start*********************************************** */}


<section className="my-16 bg-gray-900 text-white py-12 px-6 md:px-10">
  <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center text-[#632DE9]" style={{padding: "20px"}}>
    Past Events 
  </h2>

  <div className="flex flex-col gap-20 w-full">
    {pastEvents.map((event, index) => (
      <div
        key={index}
        className={`flex flex-col md:flex-row items-center gap-10 ${
          index % 2 !== 0 ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Image */}
        <div
          className={`w-full md:w-1/2 relative flex justify-center md:${
            index % 2 === 0 ? "justify-start md:pl-10" : "justify-end md:pr-10"
          }`}
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full md:w-[90%] h-56 sm:h-64 md:h-80 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl"></div>
        </div>

        {/* Text */}
        <div
          className={`w-full md:w-1/2 flex flex-col items-center text-center md:${
            index % 2 === 0
              ? "items-start text-left md:pl-12"
              : "items-end text-right md:pr-12"
          }`}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#632DE9] mb-2 sm:mb-3">
            {event.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed max-w-md px-2 sm:px-0">
            {event.description}
          </p>

        </div>
      </div>
    ))}
  </div>
</section>









{/******************end*********************************************** */}


      {/* Formations Section */}
      <section id="formations" className="formations">
        <div className="container">
          <h2>Formations</h2>
          <div className="formations-grid">
            <div className="formation-card reveal">
              <h3>Doctorat en Management et en Stratégie</h3>
              <p>ISCAE</p>
            </div>
            <div className="formation-card reveal">
              <h3>Executive MBA</h3>
              <p>Double diplomation - École des Ponts Business School (France) et École Hassania des Travaux Publics (Maroc)</p>
            </div>
            <div className="formation-card reveal">
              <h3>Master en Sciences et Techniques de Finance</h3>
              <p>Université d'Orléans</p>
            </div>
            <div className="formation-card reveal">
              <h3>Diplôme d'Administrateur Indépendant</h3>
              <p>En cours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Distinctions Section */}
      <section id="distinctions" className="distinctions">
        <div className="container">
          <h2>Distinctions</h2>
          <div className="distinctions-content">
            <p>
              Dr. Imane BELMAATI est guest speaker et conférencière internationale. Elle a représenté 
              le Maroc auprès de différentes instances internationales comme l'Organisation Internationale 
              du Travail (OIT), l'Organisation for Economic Co-operation and Development (OECD), le 
              World Economic Forum (WEF), l'Arab SME's Summit, et a intervenu à l'occasion de plusieurs 
              forums internationaux tel que la Global Growth Conférence, le Growth Women Summit...
            </p>
            <div className="distinctions-list">
              <div className="distinction-item reveal">Challenge Magazine</div>
              <div className="distinction-item reveal">Industrie du Maroc Magazine</div>
              <div className="distinction-item reveal">Women Growth Forum</div>
              <div className="distinction-item reveal">SkilledSphere Women Impact</div>
              <div className="distinction-item reveal">Les Elles du Maroc</div>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section id="initiatives" className="initiatives">
        <div className="container">
          <h2>Nos Initiatives</h2>
          <div className="initiatives-grid">
            {(() => {
              const initiatives = [
                { id: 'women', title: 'Autonomisation des Femmes', desc: "Programmes de formation et d'accompagnement pour l'entrepreneuriat féminin et le leadership dans les secteurs clés de l'économie." },
                { id: 'sustain', title: 'Développement Durable', desc: "Initiatives environnementales et projets de durabilité pour un avenir plus vert et responsable dans nos communautés." },
                { id: 'education', title: 'Éducation & Formation', desc: "Programmes éducatifs innovants et formations professionnelles pour développer les compétences et créer des opportunités." },
                { id: 'inclusion', title: 'Inclusion Sociale', desc: "Projets d'inclusion et d'intégration pour créer des communautés plus équitables et solidaires." },
                { id: 'innovation', title: 'Innovation Sociale', desc: "Développement de solutions innovantes pour répondre aux défis sociaux et économiques de notre époque." },
                { id: 'community', title: 'Impact Communautaire', desc: "Projets communautaires visant à renforcer la cohésion sociale et améliorer la qualité de vie des populations." }
              ]

              const getIcon = (key) => {
                switch (key) {
                  case 'Autonomisation des Femmes':
                    return (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" fill="currentColor" />
                      </svg>
                    )
                  case 'Développement Durable':
                    return (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M12 2L15 8l6 1-4.5 4 1 6L12 17l-7.5 4 1-6L1 9l6-1 3-6z" fill="currentColor" />
                      </svg>
                    )
                  case 'Éducation & Formation':
                    return (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M12 3L1 9l11 6 9-4.9V17h2V9L12 3z" fill="currentColor" />
                      </svg>
                    )
                  case 'Inclusion Sociale':
                    return (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-3.31 0-6 2-6 4v2h12v-2c0-2-2.69-4-6-4z" fill="currentColor" />
                      </svg>
                    )
                  case 'Innovation Sociale':
                    return (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M11 2v2H7l4 6-1.5 1L5 4v6H3V2h8zM13 22v-2h4l-4-6 1.5-1L19 20v-6h2v8h-8z" fill="currentColor" />
                      </svg>
                    )
                  case 'Impact Communautaire':
                    return (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z" fill="currentColor" />
                      </svg>
                    )
                  default:
                    return (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M12 2C9.243 2 7 4.243 7 7c0 4.418 5 9 5 9s5-4.582 5-9c0-2.757-2.243-5-5-5z" fill="currentColor" />
                      </svg>
                    )
                }
              }

              return initiatives.map((it) => (
                <div className="initiative-card" key={it.id}>
                  <div className="card-icon" aria-hidden="true">{getIcon(it.title)}</div>
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                  <button className="card-btn">En savoir plus</button>
                </div>
              ))
            })()}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Contact</h2>
          <div className="contact-content reveal">
            <div className="contact-info">
              <h3>Dr. Imane Belmaati</h3>
              <div className="contact-item">
                <span className="contact-icon">Email</span>
                <span>iby6000@hotmail.fr</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">Téléphone</span>
                <span>+212 6 47 47 35 50</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">Localisation</span>
                <span>Maroc - France</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Positive Impact Initiatives</h3>
              <p>Transformons la recherche en solutions concrètes pour un monde meilleur.</p>
            </div>
            <div className="footer-section">
              <h4>Liens rapides</h4>
              <ul>
                <li><a href="#about">À propos</a></li>
                <li><a href="#initiatives">Initiatives</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Suivez-nous</h4>
              <div className="social-links">
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Facebook</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom reveal">
            <p>&copy; 2024 Positive Impact Initiatives. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
