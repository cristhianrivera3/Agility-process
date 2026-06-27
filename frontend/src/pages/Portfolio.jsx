/* =========================
   PROYECTOS (PUEDEN SER DEMOS)
========================= */
const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    desc: 'Plataforma moderna de comercio electrónico escalable.',
    tech: ['React', 'Node', 'Stripe'],
  },
  {
    id: 2,
    title: 'Dashboard SaaS',
    desc: 'Panel administrativo con analítica en tiempo real.',
    tech: ['React', 'Charts', 'API'],
  },
  {
    id: 3,
    title: 'App Mobile UI',
    desc: 'Interfaz móvil enfocada en experiencia de usuario.',
    tech: ['Figma', 'UX', 'Mobile'],
  }
];

/* =========================
   CEOS DIGITALES (PLACEHOLDER)
========================= */
const specialists = [
  {
    name: 'CEO Desarrollo Web',
    role: 'Frontend & Backend',
    bio: 'Especialista en desarrollo de plataformas web escalables.',
  },
  {
    name: 'CEO Ciberseguridad',
    role: 'Security Expert',
    bio: 'Protección de sistemas y análisis de vulnerabilidades.',
  },
  {
    name: 'CEO Marketing',
    role: 'Growth & SEO',
    bio: 'Estrategias digitales orientadas a crecimiento.',
  },
  {
    name: 'CEO IA',
    role: 'Machine Learning',
    bio: 'Automatización inteligente y análisis de datos.',
  },
  {
    name: 'CEO Cloud',
    role: 'Cloud & DevOps',
    bio: 'Infraestructura escalable y sistemas distribuidos.',
  }
];

const Portfolio = () => {

  return (
    <div className="portfolio-page">

      {/* ================= HERO ================= */}
      <section className="portfolio-hero">
        <h1>
          Nuestro <span className="gradient-text">Portafolio</span>
        </h1>
        <p>
          Proyectos que reflejan nuestro estándar de calidad,
          innovación y visión tecnológica.
        </p>
      </section>

      {/* ================= PROYECTOS ================= */}
      <section className="projects-section">
        <h2>Proyectos Destacados</h2>

        <div className="projects-grid">

          {projects.map(p => (
            <div className="project-card-pro" key={p.id}>

              <h3>{p.title}</h3>
              <p>{p.desc}</p>

              <div className="project-tech">
                {p.tech.map((t,i) => (
                  <span key={i}>{t}</span>
                ))}
              </div>

              <span className="project-link">
                Ver proyecto →
              </span>

            </div>
          ))}

        </div>
      </section>

      {/* ================= EQUIPO ================= */}
      <section className="team-section-pro">

        <h2>Conoce a nuestros especialistas</h2>

        <p className="team-subtitle">
          Un equipo en crecimiento compuesto por expertos en cada área tecnológica.
          Cada especialista lidera su campo para ofrecer soluciones de alto nivel.
        </p>

        <div className="team-grid-pro">

          {specialists.map((s, i) => (
            <div className="team-card-pro" key={i}>

              <div className="team-avatar-pro">
                {s.name.charAt(4)}
              </div>

              <h3>{s.name}</h3>

              <span className="team-role-pro">
                {s.role}
              </span>

              <p>{s.bio}</p>

            </div>
          ))}

        </div>

        {/* MENSAJE PRO FUTURO */}
        <div className="team-coming">
          Próximamente podrás conocer a cada especialista y su portafolio individual
        </div>

      </section>

    </div>
  );
};

export default Portfolio;
