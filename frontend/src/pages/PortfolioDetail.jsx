import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioAPI } from '../services/api';
import ShinyCta from '../components/ShinyCta';
import './PortfolioDetail.css';

const PortfolioDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);


  const projectTypes = {
    'desarrollo-web': { name: 'Desarrollo Web', icon: '🌐' },
    'desarrollo-movil': { name: 'Desarrollo Móvil', icon: '📱' },
    'diseno-uiux': { name: 'Diseño UI/UX', icon: '🎨' },
    'ciberseguridad': { name: 'Ciberseguridad', icon: '🔒' },
    'marketing': { name: 'Marketing', icon: '📈' },
    'consultoria': { name: 'Consultoría', icon: '💼' },
    'cloud-devops': { name: 'Cloud & DevOps', icon: '☁️' },
    'data-analytics': { name: 'Data Analytics', icon: '📊' }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await portfolioAPI.getBySlug(slug);
        setProject(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error cargando proyecto:', err);
        setError('No se pudo cargar el proyecto');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProject();
  }, [slug]);

  useEffect(() => {
    if (project) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [project]);

  if (loading) {
    return (
      <div className="portfolio-detail-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando proyecto...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="portfolio-detail-page">
        <div className="error-container">
          <span className="error-icon">🔍</span>
          <h2>Proyecto no encontrado</h2>
          <p>El proyecto que buscas no está disponible.</p>
          <ShinyCta href="/portafolio">Ver todos los proyectos</ShinyCta>
        </div>
      </div>
    );
  }

  const ptInfo = projectTypes[project.projectType] || { name: project.projectType, icon: '💼' };
  const allImages = [
    project.featuredImage,
    ...(project.gallery?.map(g => g.url) || [])
  ].filter(Boolean);

  return (
    <div className="portfolio-detail-page">
      <section className="pd-hero" style={{
        background: `linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(124,58,237,0.1) 100%)`
      }}>
        <div className="container">
          <Link to="/portafolio" className="back-link">← Volver al Portafolio</Link>
          <div className="pd-hero-content">
            <div className="pd-type">{ptInfo.icon} {ptInfo.name}</div>
            <h1>{project.title}</h1>
            <p className="pd-subtitle">{project.shortDescription}</p>
            <div className="pd-meta">
              {project.client && (
                <span className="pd-client">👤 {project.client}</span>
              )}
              {project.industry && (
                <span className="pd-industry">🏢 {project.industry}</span>
              )}
              {project.duration && (
                <span className="pd-duration">⏱️ {project.duration}</span>
              )}
            </div>
            {project.liveUrl && (
              <ShinyCta href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                🔗 Ver proyecto en vivo
              </ShinyCta>
            )}
          </div>
        </div>
      </section>

      {allImages.length > 0 && (
        <section className="pd-gallery">
          <div className="container">
            <div className="gallery-main">
              <img
                src={allImages[activeImage] || 'https://via.placeholder.com/1200x600/0a0a0a/00d4ff?text=Proyecto'}
                alt={project.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/1200x600/0a0a0a/00d4ff?text=Proyecto';
                }}
              />
            </div>
            {allImages.length > 1 && (
              <div className="gallery-thumbnails">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    className={`thumb-btn ${activeImage === i ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img
                      src={img}
                      alt={`${project.title} - ${i + 1}`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100/0a0a0a/00d4ff?text=IMG';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="pd-content">
        <div className="container">
          <div className="pd-grid">
            <div className="pd-main">
              <h2>Acerca del proyecto</h2>
              <div className="pd-description">
                {project.description || `Proyecto ${project.title} desarrollado para ${project.client || 'nuestro cliente'}. 
                Este proyecto representa nuestro compromiso con la excelencia y la innovación tecnológica.`}
              </div>

              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                  className="repo-link">
                  📂 Ver código fuente
                </a>
              )}

              {project.results && project.results.length > 0 && (
                <div className="pd-results">
                  <h3>📊 Resultados</h3>
                  <div className="results-grid">
                    {project.results.map((r, i) => (
                      <div key={i} className="result-card">
                        <span className="result-metric">{r.metric}</span>
                        <span className="result-value">{r.value}</span>
                        {r.description && (
                          <span className="result-desc">{r.description}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pd-sidebar">
              {project.technologies && project.technologies.length > 0 && (
                <div className="pd-card">
                  <h3>🔧 Tecnologías</h3>
                  <div className="tech-list">
                    {project.technologies.map((t, i) => (
                      <span key={i} className="tech-item">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {project.testimonial?.quote && (
                <div className="pd-card testimonial-card">
                  <h3>💬 Testimonio</h3>
                  <blockquote className="testimonial-quote">
                    "{project.testimonial.quote}"
                  </blockquote>
                  <div className="testimonial-author">
                    <strong>{project.testimonial.clientName}</strong>
                    {project.testimonial.clientPosition && (
                      <span>{project.testimonial.clientPosition}</span>
                    )}
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
      </section>

      <section className="pd-cta">
        <div className="container">
          <h2>¿Listo para crear algo increíble?</h2>
          <p>Cada proyecto es una oportunidad para superar expectativas</p>
          <div className="cta-buttons">
            <ShinyCta href="/nosotros">
              Contáctanos
            </ShinyCta>
            <ShinyCta href="/servicios">
              Ver servicios
            </ShinyCta>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetail;
