import Particles from "../components/Particles";
import GooeyText from "../components/GooeyText";
import ShinyCta from "../components/ShinyCta";
import "./Home.css";

const Contact = () => {
  return (
    <div className="home">

      <div className="particles-layer">
        <Particles count={60} color="#00d4ff" />
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
            Soluciones tecnológicas que aceleran tu crecimiento.
          </p>

          <div className="hero-actions">
            <ShinyCta href="/contacto">
              Agendar Consulta
            </ShinyCta>

            <ShinyCta href="/portafolio">
              Ver Proyectos
            </ShinyCta>
          </div>

          <div className="hero-stats">
            <div>50+ Proyectos</div>
            <div>30+ Ideas</div>
            <div>5 Áreas tech</div>
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
            <GooeyText texts={["Innovación","Tecnología","Futuro"]}/>
          </div>

        </div>

      </section>

      <section className="cta-section">
        <h2>
          ¿Listo para llevar tu proyecto al siguiente nivel?
        </h2>
        <ShinyCta href="/contacto">
          Empezar ahora
        </ShinyCta>
      </section>

    </div>
  );
};

export default Contact;
