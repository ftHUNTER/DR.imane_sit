import React, { useState } from 'react'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsSidebarOpen(false)
  }

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="brand">Positive Impact Initiatives</div>
          <nav className="nav">
            <a href="#home" onClick={() => scrollToSection('home')}>Accueil</a>
            <a href="#about" onClick={() => scrollToSection('about')}>À propos</a>
            <a href="#formations" onClick={() => scrollToSection('formations')}>Formations</a>
            <a href="#distinctions" onClick={() => scrollToSection('distinctions')}>Distinctions</a>
            <a href="#initiatives" onClick={() => scrollToSection('initiatives')}>Initiatives</a>
            <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
          </nav>
          <button className="hamburger" aria-label="Open menu" onClick={() => setIsSidebarOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
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
          <a href="#home" onClick={() => scrollToSection('home')}>Accueil</a>
          <a href="#about" onClick={() => scrollToSection('about')}>À propos</a>
          <a href="#formations" onClick={() => scrollToSection('formations')}>Formations</a>
          <a href="#distinctions" onClick={() => scrollToSection('distinctions')}>Distinctions</a>
          <a href="#initiatives" onClick={() => scrollToSection('initiatives')}>Initiatives</a>
          <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
        </nav>
      </aside>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Positive Impact Initiatives</h1>
            <p className="hero-subtitle">La plateforme d'impact nouvelle génération</p>
            <p className="hero-quote">
              « Parce que nous croyons que chacun peut devenir un catalyseur de changement, 
              et que l'action concrète est la clé d'effets significatifs, durables et 
              mesurables, nous construisons, avec vous, un monde meilleur. »
              <br/><br/>
              <strong>Dr. Imane Belmaati – Présidente et membre fondatrice</strong>
            </p>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('initiatives')}>
                Découvrir nos initiatives
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
                Nous rejoindre
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://matinees.industries.ma/wp-content/uploads/2024/03/belmaati.jpg" alt="Dr. Imane Belmaati" />
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
                <h3>17+</h3>
                <p>Années d'expérience</p>
              </div>
              <div className="stat">
                <h3>80+</h3>
                <p>Pays WAPES</p>
              </div>
              <div className="stat">
                <h3>57+</h3>
                <p>Pays PESNET-OCI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations Section */}
      <section id="formations" className="formations">
        <div className="container">
          <h2>Formations</h2>
          <div className="formations-grid">
            <div className="formation-card">
              <h3>Doctorat en Management et en Stratégie</h3>
              <p>ISCAE</p>
            </div>
            <div className="formation-card">
              <h3>Executive MBA</h3>
              <p>Double diplomation - École des Ponts Business School (France) et École Hassania des Travaux Publics (Maroc)</p>
            </div>
            <div className="formation-card">
              <h3>Master en Sciences et Techniques de Finance</h3>
              <p>Université d'Orléans</p>
            </div>
            <div className="formation-card">
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
              <div className="distinction-item">Challenge Magazine</div>
              <div className="distinction-item">Industrie du Maroc Magazine</div>
              <div className="distinction-item">Women Growth Forum</div>
              <div className="distinction-item">SkilledSphere Women Impact</div>
              <div className="distinction-item">Les Elles du Maroc</div>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section id="initiatives" className="initiatives">
        <div className="container">
          <h2>Nos Initiatives</h2>
            <div className="initiatives-grid">
              <div className="initiative-card">
                <div className="card-icon" aria-hidden="true"></div>
              <h3>Autonomisation des Femmes</h3>
              <p>
                Programmes de formation et d'accompagnement pour l'entrepreneuriat féminin 
                et le leadership dans les secteurs clés de l'économie.
              </p>
              <button className="card-btn">En savoir plus</button>
            </div>
            <div className="initiative-card">
                <div className="card-icon" aria-hidden="true"></div>
              <h3>Développement Durable</h3>
              <p>
                Initiatives environnementales et projets de durabilité pour un avenir 
                plus vert et responsable dans nos communautés.
              </p>
              <button className="card-btn">En savoir plus</button>
            </div>
            <div className="initiative-card">
                <div className="card-icon" aria-hidden="true"></div>
              <h3>Éducation & Formation</h3>
              <p>
                Programmes éducatifs innovants et formations professionnelles pour 
                développer les compétences et créer des opportunités.
              </p>
              <button className="card-btn">En savoir plus</button>
            </div>
            <div className="initiative-card">
                <div className="card-icon" aria-hidden="true"></div>
              <h3>Inclusion Sociale</h3>
              <p>
                Projets d'inclusion et d'intégration pour créer des communautés 
                plus équitables et solidaires.
              </p>
              <button className="card-btn">En savoir plus</button>
            </div>
            <div className="initiative-card">
                <div className="card-icon" aria-hidden="true"></div>
              <h3>Innovation Sociale</h3>
              <p>
                Développement de solutions innovantes pour répondre aux défis 
                sociaux et économiques de notre époque.
              </p>
              <button className="card-btn">En savoir plus</button>
            </div>
            <div className="initiative-card">
                <div className="card-icon" aria-hidden="true"></div>
              <h3>Impact Communautaire</h3>
              <p>
                Projets communautaires visant à renforcer la cohésion sociale 
                et améliorer la qualité de vie des populations.
              </p>
              <button className="card-btn">En savoir plus</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Contact</h2>
          <div className="contact-content">
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
          <div className="footer-bottom">
            <p>&copy; 2024 Positive Impact Initiatives. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
