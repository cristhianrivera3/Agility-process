import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NeuralBackground from '../components/NeuralBackground';
import TextScramble from '../components/TextScramble';
import './Services.css';

const FALLBACK_SERVICES = [
  {
    _id: '2',
    name: 'Ciberseguridad',
    slug: 'ciberseguridad',
    desc: 'Protegemos tu infraestructura digital contra riesgos y amenazas.',
    icon: '🔒'
  },
  {
    _id: '3',
    name: 'Marketing Digital',
    slug: 'marketing-digital',
    desc: 'Estrategias digitales que impulsan tu crecimiento.',
    icon: '📈'
  },
  {
    _id: '1',
    name: 'Desarrollo Web',
    slug: 'desarrollo-web',
    desc: 'Creamos sitios web modernos y escalables enfocados en conversión.',
    icon: '🌐'
  },
  {
    _id: '4',
    name: 'Diseño UI/UX',
    slug: 'diseno-uiux',
    desc: 'Experiencias visuales modernas y centradas en el usuario.',
    icon: '🎨'
  },
  {
    _id: '5',
    name: 'Consultoría TI',
    slug: 'consultoria-ti',
    desc: 'Optimiza tus procesos y toma mejores decisiones tecnológicas.',
    icon: '💼'
  },
  {
    _id: '6',
    name: 'Cloud & DevOps',
    slug: 'cloud-devops',
    desc: 'Infraestructura escalable y automatización de procesos.',
    icon: '☁️'
  }
];

const Services = () => {
  const [services] = useState(FALLBACK_SERVICES);

  return (
    <div className="services-page">
      <NeuralBackground
        color="#00d4ff"
        trailOpacity={0.06}
        particleCount={800}
        speed={0.9}
      />

      {/* HERO */}
      <motion.section
        className="services-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1>
          Nuestras <span className="gradient-text">Soluciones</span>
        </h1>
        <p>
          Servicios diseñados para impulsar tu crecimiento digital
          con tecnología de alto nivel.
        </p>
      </motion.section>

      {/* GRID */}
      <section className="services-grid-section">
        <div className="services-grid">
          {services.map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link
                to={`/servicios/${service.slug}`}
                className="service-card-pro"
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
                <TextScramble
                  text="Ver más →"
                  as="span"
                  className="service-cta"
                  duration={1}
                  inView
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
