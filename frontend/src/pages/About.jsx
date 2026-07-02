import NeuralBackground from '../components/NeuralBackground';
import './About.css';

const About = () => {
  const valores = [
    { icon: '💡', nombre: 'Innovación', desc: 'Abrazamos la tecnología y la creatividad para crear soluciones únicas que marcan la diferencia.' },
    { icon: '🤝', nombre: 'Compromiso', desc: 'Nos entregamos a cada proyecto con la misma pasión y dedicación que si fuera nuestro.' },
    { icon: '📈', nombre: 'Mejora Continua', desc: 'Optimizamos cada proceso, aprendemos constantemente y nunca nos conformamos.' },
    { icon: '🛡️', nombre: 'Integridad', desc: 'Actuamos con honestidad, ética y transparencia en cada relación.' },
    { icon: '⭐', nombre: 'Excelencia', desc: 'Buscamos la calidad en cada detalle, superando expectativas.' },
    { icon: '👥', nombre: 'Trabajo en Equipo', desc: 'Creemos que los grandes resultados nacen de la colaboración y el respeto.' },
    { icon: '🏆', nombre: 'Éxito del Cliente', desc: 'El crecimiento de nuestros clientes es nuestro mayor logro.' },
    { icon: '🔍', nombre: 'Transparencia', desc: 'Comunicamos con claridad, sin sorpresas, construyendo confianza.' },
  ];

  return (
    <div className="about-page">
      <NeuralBackground
        color="#00d4ff"
        trailOpacity={0.06}
        particleCount={800}
        speed={0.9}
      />

      <section className="about-hero">
        <h1>
          Sobre <span className="gradient-text">Nosotros</span>
        </h1>
        <p className="about-hero-desc">
          Agility Process es una empresa de soluciones digitales impulsada por inteligencia artificial,
          dedicada a acompañar a negocios y organizaciones en su viaje hacia la transformación digital.
        </p>
        <p className="about-hero-desc">
          Combinamos <strong>creatividad, estrategia empresarial y tecnologías de vanguardia</strong> para desarrollar
          soluciones que mejoran la visibilidad, optimizan operaciones y generan resultados medibles.
        </p>
        <p className="about-hero-desc">
          Nuestro propósito es <strong>empoderar a empresas y marcas</strong> con herramientas digitales que
          fortalezcan su presencia en el mercado, mejoren su eficiencia y respalden un crecimiento sostenible,
          siempre con <strong>transparencia, profesionalismo y enfoque en el cliente.</strong>
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Misión</h2>
        <p>
          Empoderar a empresas, emprendedores y marcas a través de soluciones digitales innovadoras
          que integran inteligencia artificial, tecnología, estrategia y creatividad, impulsando su
          crecimiento con transparencia y resultados medibles.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Visión</h2>
        <p>
          Ser un aliado global de confianza en transformación digital, reconocido por el uso profesional
          de la inteligencia artificial aplicada a soluciones tecnológicas innovadoras, generando un
          crecimiento sostenible y resultados óptimos que transforman positivamente los negocios de
          nuestros clientes.
        </p>
      </section>

      <section className="about-section values-section">
        <h2 className="section-title">Nuestros Valores</h2>
        <div className="values-grid">
          {valores.map((v, i) => (
            <div key={i} className="value-card">
              <span className="value-icon">{v.icon}</span>
              <h3>{v.nombre}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section bio-section">
        <h2 className="section-title">Bio Profesional</h2>
        <p>
          En Agility Process creemos que la tecnología debe estar al servicio de las personas y los
          negocios. Por eso combinamos inteligencia artificial, estrategia y creatividad para ayudar a
          empresas y emprendedores a transformar su presencia digital y alcanzar su máximo potencial.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Nuestra Trayectoria</h2>
        <div className="timeline">
          <div className="timeline-item">
            <span className="timeline-year">2023</span>
            <span className="timeline-dot"></span>
            <div className="timeline-content">
              <p>Inicio del desarrollo y aprendizaje profundo en el mundo de la programación.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="timeline-year">2024</span>
            <span className="timeline-dot"></span>
            <div className="timeline-content">
              <p>Proyectos iniciales y consolidación técnica con clientes reales.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="timeline-year">2025</span>
            <span className="timeline-dot"></span>
            <div className="timeline-content">
              <p>Creación oficial de Agility Process como empresa de soluciones digitales.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="timeline-year">Futuro</span>
            <span className="timeline-dot"></span>
            <div className="timeline-content">
              <p>Expansión con especialistas y áreas tecnológicas para escalar impacto.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section ceo-section">
        <h2 className="section-title">Fundador &amp; CEO</h2>
        <div className="ceo-card">
          <div className="ceo-avatar">C</div>
          <div className="ceo-info">
            <h3>Cristhian Zambrano</h3>
            <span className="ceo-role">CEO &amp; Software Developer</span>
            <p>
              Programador con más de 3 años de experiencia, apasionado por los procesos digitales
              y con una visión clara de crecimiento para marcas y empresas que buscan destacar en
              el entorno digital. Persona transparente, respetuosa y comprometida con ideales
              grandes, enfocado en procesos ágiles especializados en inteligencia artificial,
              profesionalismo y una profunda pasión por la ciberseguridad y la programación.
            </p>
            <p>
              Lidera un equipo de trabajo sólido orientado a resultados, donde la innovación,
              la ética y la excelencia son pilares fundamentales para transformar ideas en
              soluciones digitales de alto impacto.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;