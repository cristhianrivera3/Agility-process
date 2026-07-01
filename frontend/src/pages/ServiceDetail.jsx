import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesAPI } from '../services/api';
import ShinyCta from '../components/ShinyCta';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const categories = {
    'desarrollo-web': { name: 'Desarrollo Web', icon: '🌐' },
    'ciberseguridad': { name: 'Ciberseguridad', icon: '🔒' },
    'marketing-digital': { name: 'Marketing Digital', icon: '📈' },
    'diseno-uiux': { name: 'Diseño UI/UX', icon: '🎨' },
    'automatizaciones': { name: 'Automatizaciones', icon: '🤖' },
    'consultoria-ti': { name: 'Consultoría TI', icon: '💼' },
    'cloud-devops': { name: 'Cloud y DevOps', icon: '☁️' }
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await servicesAPI.getBySlug(slug);
        setService(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error cargando servicio:', err);
        setError('No se pudo cargar el servicio');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchService();
  }, [slug]);

  const formatPrice = (price, type) => {
    if (!price) return 'Consultar';
    const formatted = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
    const labels = { hourly: '/hora', fixed: '', monthly: '/mes', custom: '(Personalizado)' };
    return `${formatted}${labels[type] || ''}`;
  };

  if (loading) {
    return (
      <div className="service-detail-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando servicio...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="service-detail-page">
        <div className="error-container">
          <span className="error-icon">⚠️</span>
          <h2>Servicio no encontrado</h2>
          <p>El servicio que buscas no está disponible o ha sido removido.</p>
          <ShinyCta href="/servicios">Ver todos los servicios</ShinyCta>
        </div>
      </div>
    );
  }

  const catInfo = categories[service.category] || { name: service.category, icon: '💼' };

  return (
    <div className="service-detail-page">
      <section className="detail-hero" style={{
        background: `linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(124,58,237,0.15) 100%)`
      }}>
        <div className="container">
          <Link to="/servicios" className="back-link">← Volver a Servicios</Link>
          <div className="detail-hero-content">
            <div className="detail-icon">{catInfo.icon}</div>
            <div className="detail-category">{catInfo.name}</div>
            <h1>{service.name}</h1>
            <p className="detail-subtitle">{service.shortDescription}</p>
            <div className="detail-price">
              {service.price ? (
                <span className="price-amount">{formatPrice(service.price, service.priceType)}</span>
              ) : (
                <span className="price-custom">Precio Personalizado</span>
              )}
            </div>
            <div className="detail-actions">
              <ShinyCta href="/nosotros">
                Consultar más
              </ShinyCta>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-description">
        <div className="container">
          <div className="description-grid">
            <div className="description-main">
              <h2>¿En qué consiste este servicio?</h2>
              <div className="description-text">
                {service.description || `Nuestro servicio de ${service.name} está diseñado para 
                proporcionar soluciones de alta calidad que impulsen tu negocio. 
                Trabajamos con metodologías ágiles y las mejores prácticas del mercado 
                para garantizar resultados excepcionales.`}
              </div>

              {service.duration && (
                <div className="info-block">
                  <span className="info-label">⏱️ Duración estimada:</span>
                  <span>{service.duration}</span>
                </div>
              )}

              {service.stats && (
                <div className="stats-row">
                  <div className="stat-item">
                    <span className="stat-value">{service.stats.views || 0}</span>
                    <span className="stat-label">Vistas</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{service.stats.inquiries || 0}</span>
                    <span className="stat-label">Consultas</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{service.stats.conversions || 0}%</span>
                    <span className="stat-label">Conversión</span>
                  </div>
                </div>
              )}
            </div>

            <div className="description-sidebar">
              {service.features && service.features.length > 0 && (
                <div className="sidebar-card">
                  <h3>✅ Características</h3>
                  <ul className="feature-list">
                    {service.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {service.technologies && service.technologies.length > 0 && (
                <div className="sidebar-card">
                  <h3>🔧 Tecnologías</h3>
                  <div className="tech-tags">
                    {service.technologies.map((t, i) => (
                      <span key={i} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
      </section>

      <section className="detail-cta">
        <div className="container">
          <h2>¿Listo para transformar tu negocio?</h2>
          <p>Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos</p>
          <div className="cta-buttons">
            <ShinyCta href="/nosotros">
              Contáctanos
            </ShinyCta>
            <ShinyCta href="/portafolio">
              Ver proyectos
            </ShinyCta>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
