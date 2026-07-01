import NeuralBackground from '../components/NeuralBackground';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <NeuralBackground
        color="#00d4ff"
        trailOpacity={0.06}
        particleCount={800}
        speed={0.9}
      />

      {/* HERO */}
      <section className="about-hero">
        <h1>
          Construyendo una empresa basada en
          <span className="gradient-text"> innovación, estructura y visión</span>
        </h1>

        <p>
          Agility Process no es solo tecnología. Es estrategia, crecimiento y futuro.
        </p>
      </section>

      {/* CEO */}
      <section className="about-section ceo-section">

        <h2>Fundador & CEO</h2>

        <div className="ceo-card">

          <div className="ceo-avatar">C</div>

          <div>
            <h3>Cristhian Zambrano</h3>
            <span className="ceo-role">CEO & Software Developer</span>

            <p>
              Programador con más de 4 años de experiencia en desarrollo de software,
              actualmente enfocado en especializarse en ciberseguridad y marketing digital.
            </p>

            <p>
              Su visión es construir una empresa de soluciones tecnológicas completas,
              donde cada área sea liderada por especialistas y cada proyecto sea trabajado
              bajo estándares profesionales.
            </p>
          </div>

        </div>

      </section>

      {/* HISTORIA */}
      <section className="about-section">

        <h2>Nuestra historia</h2>

        <p>
          Agility Process nace del crecimiento constante dentro del mundo del desarrollo.
          Lo que comenzó como aprendizaje individual, se transformó en una visión empresarial:
          crear soluciones digitales con calidad profesional.
        </p>

        <p>
          Hoy, este proyecto evoluciona hacia una estructura escalable,
          donde múltiples áreas tecnológicas convergen en un solo ecosistema.
        </p>

      </section>

      {/* VISIÓN */}
      <section className="about-section">

        <h2>Visión</h2>

        <p>
          Construir una empresa líder en soluciones tecnológicas integrales,
          donde cada área esté dirigida por especialistas
          y cada proyecto genere impacto real medible.
        </p>

      </section>

      {/* VALORES */}
      <section className="about-section values-section">

        <h2>Nuestros valores</h2>

        <div className="values-grid">

          <div className="value-card">⚡ Agilidad</div>
          <div className="value-card">🎯 Precisión</div>
          <div className="value-card">🔒 Seguridad</div>
          <div className="value-card">🚀 Innovación</div>
          <div className="value-card">📊 Resultados</div>
          <div className="value-card">💼 Profesionalismo</div>

        </div>

      </section>

      {/* FILOSOFÍA */}
      <section className="about-section">

        <h2>Nuestra filosofía</h2>

        <p>
          No construimos solo páginas web.
          Construimos sistemas digitales pensados para escalar,
          optimizar procesos y generar crecimiento real.
        </p>

        <p>
          Cada proyecto se basa en estructura, análisis y ejecución,
          no en improvisación.
        </p>

      </section>

      {/* ROADMAP */}
      <section className="about-section">

        <h2>Roadmap</h2>

        <div className="roadmap">

          <div className="roadmap-item">
            <span>2023</span>
            Inicio del desarrollo y aprendizaje profundo
          </div>

          <div className="roadmap-item">
            <span>2024</span>
            Proyectos iniciales y consolidación técnica
          </div>

          <div className="roadmap-item">
            <span>2025</span>
            Creación de Agility Process
          </div>

          <div className="roadmap-item">
            <span>Futuro</span>
            Expansión con especialistas y áreas tecnológicas
          </div>

        </div>

      </section>

    </div>
  );
};

export default About;