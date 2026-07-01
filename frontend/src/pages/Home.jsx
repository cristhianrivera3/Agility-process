import Particles from "../components/Particles";
import GooeyText from "../components/GooeyText";
import ShinyCta from "../components/ShinyCta";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">

      <div className="particles-layer">
        <Particles count={40} color="#00d4ff" />
      </div>

      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-badge">
            Agility Process — Soluciones Tecnológicas
          </p>

          <h1 className="hero-title">
            Transformamos <br />
            <span className="gradient-text">Negocios en</span><br />
            <span className="gradient-text">Experiencias Digitales</span>
          </h1>

          <p className="hero-desc">
            Soluciones tecnológicas que impulsan tu crecimiento.
          </p>

          <div className="hero-actions">
            <ShinyCta href="/nosotros">
              Agendar Consulta
            </ShinyCta>

            <ShinyCta href="/portafolio">
              Ver Proyectos
            </ShinyCta>
          </div>

          <div className="hero-stats">
            <p>50+ Proyectos</p>
            <p>30+ Ideas</p>
            <p>5 Áreas tech</p>
          </div>

        </div>

        <div className="hero-visual">

          <div className="floating-words">
            <span className="float w1">Rápido</span>
            <span className="float w2">Seguro</span>
            <span className="float w3">Preciso</span>
            <span className="float w4">Responsive</span>
          </div>

          <div className="gooey-container">
            <GooeyText texts={["Innovación","Tecnología","Futuro"]} />
          </div>

        </div>

      </section>

      <section className="cta-section">
        <h2>¿Listo para llevar tu proyecto al siguiente nivel?</h2>
        <ShinyCta href="/nosotros">
          Empezar ahora
        </ShinyCta>
      </section>

      <section className="team-section">
        <h2>Nuestro equipo</h2>

        <div className="team-grid">
          {["Web","Seguridad","Marketing","UI/UX","Cloud","Data"].map((area,i)=>(
            <div key={i} className="team-card">
              <div className="team-avatar">{area[0]}</div>
              <h3>CEO {area}</h3>
              <p>Especialista en {area}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
