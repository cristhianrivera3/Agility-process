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
    </div>
  );
};

export default About;