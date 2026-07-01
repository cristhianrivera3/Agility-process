/**
 * AdminDashboard - Panel de Administración Profesional
 * 
 * Dashboard completo para gestionar:
 * - Servicios (CRUD)
 * - Portafolio (CRUD) 
 * - Estadísticas
 * - Usuarios trabajadores
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { servicesAPI, portfolioAPI } from '../services/api';
import './AdminDashboard.css';

// ================================
// SECTIONS CONFIG
// ================================
const SECTIONS = {
  DASHBOARD: 'dashboard',
  SERVICES: 'services',
  PORTFOLIO: 'portfolio',
  ANALYTICS: 'analytics'
};

// ================================
// MAIN COMPONENT
// ================================
const AdminDashboard = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(SECTIONS.DASHBOARD);
  
  // Data states
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin');
    }
  }, [loading, isAuthenticated, navigate]);

  // Load dashboard data
  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const loadDashboardData = async () => {
    setIsLoadingData(true);
    try {
      const [servicesRes, projectsRes] = await Promise.all([
        servicesAPI.getAll({ limit: 100, all: true }).catch(() => ({ data: { data: [] } })),
        portfolioAPI.getAll({ limit: 100, all: true }).catch(() => ({ data: { data: [] } })),
      ]);

      setServices(servicesRes.data.data || []);
      setProjects(projectsRes.data.data || []);
      setStats(null);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // === CRUD Handlers ===
  const handleDeleteService = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este servicio?')) return;
    try {
      await servicesAPI.delete(id);
      setServices(prev => prev.filter(s => s._id !== id));
    } catch (error) {
      alert('Error al eliminar servicio');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este proyecto?')) return;
    try {
      await portfolioAPI.delete(id);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      alert('Error al eliminar proyecto');
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Cargando panel...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Tech Agency Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="admin-dashboard">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-brand">
            <span className="logo-text">Tech</span>
            <span className="logo-accent">Admin</span>
          </div>

          <div className="sidebar-user">
            <div className="user-avatar">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'Admin'}</span>
              <span className="user-role">Administrador</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`nav-btn ${activeSection === SECTIONS.DASHBOARD ? 'active' : ''}`}
              onClick={() => setActiveSection(SECTIONS.DASHBOARD)}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-btn ${activeSection === SECTIONS.SERVICES ? 'active' : ''}`}
              onClick={() => setActiveSection(SECTIONS.SERVICES)}
            >
              📋 Servicios
              <span className="nav-badge">{services.length}</span>
            </button>
            <button
              className={`nav-btn ${activeSection === SECTIONS.PORTFOLIO ? 'active' : ''}`}
              onClick={() => setActiveSection(SECTIONS.PORTFOLIO)}
            >
              📁 Portafolio
              <span className="nav-badge">{projects.length}</span>
            </button>
            <button
              className={`nav-btn ${activeSection === SECTIONS.ANALYTICS ? 'active' : ''}`}
              onClick={() => setActiveSection(SECTIONS.ANALYTICS)}
            >
              📈 Estadísticas
            </button>
          </nav>

          <div className="sidebar-footer">
            <a href="/" className="sidebar-link" target="_blank">🌐 Ver sitio</a>
            <button className="sidebar-link logout-btn" onClick={logout}>🚪 Cerrar sesión</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <header className="admin-header">
            <h1>{getSectionTitle(activeSection)}</h1>
            <p>{getSectionDescription(activeSection)}</p>
          </header>

          <div className="admin-content">
            {isLoadingData ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Cargando datos...</p>
              </div>
            ) : (
              <>
                {activeSection === SECTIONS.DASHBOARD && (
                  <DashboardOverview services={services} projects={projects} />
                )}
                {activeSection === SECTIONS.SERVICES && (
                  <ServicesManager 
                    services={services} 
                    onDelete={handleDeleteService}
                    onRefresh={loadDashboardData}
                  />
                )}
                {activeSection === SECTIONS.PORTFOLIO && (
                  <PortfolioManager 
                    projects={projects} 
                    onDelete={handleDeleteProject}
                    onRefresh={loadDashboardData}
                  />
                )}
                {activeSection === SECTIONS.ANALYTICS && (
                  <AnalyticsView services={services} projects={projects} />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

// ================================
// SECTION HELPERS
// ================================
const getSectionTitle = (section) => {
  const titles = {
    [SECTIONS.DASHBOARD]: 'Dashboard',
    [SECTIONS.SERVICES]: 'Gestión de Servicios',
    [SECTIONS.PORTFOLIO]: 'Gestión de Portafolio',
    [SECTIONS.ANALYTICS]: 'Estadísticas del Sitio'
  };
  return titles[section] || 'Dashboard';
};

const getSectionDescription = (section) => {
  const descs = {
    [SECTIONS.DASHBOARD]: 'Resumen general de tu sitio web',
    [SECTIONS.SERVICES]: 'Administra los servicios que ofreces a tus clientes',
    [SECTIONS.PORTFOLIO]: 'Gestiona los proyectos realizados por la agencia',
    [SECTIONS.ANALYTICS]: 'Métricas y estadísticas de rendimiento'
  };
  return descs[section] || '';
};

// ================================
// DASHBOARD OVERVIEW
// ================================
const DashboardOverview = ({ services, projects }) => {
  const featuredServices = services.filter(s => s.featured).length;
  const featuredProjects = projects.filter(p => p.featured).length;

  const cards = [
    { icon: '📋', label: 'Servicios', value: services.length, color: '#00d4ff', sub: `${featuredServices} destacados` },
    { icon: '📁', label: 'Proyectos', value: projects.length, color: '#7c3aed', sub: `${featuredProjects} destacados` },
  ];

  return (
    <div className="dashboard-overview">
      <div className="stats-grid">
        {cards.map((card, i) => (
          <div key={i} className="stat-card" style={{ borderTopColor: card.color }}>
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-info">
              <span className="stat-number">{card.value}</span>
              <span className="stat-label">{card.label}</span>
              <span className="stat-sub">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ================================
// SERVICES MANAGER
// ================================
const ServicesManager = ({ services, onDelete, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  return (
    <div className="manager-section">
      <div className="manager-header">
        <p className="manager-count">{services.length} servicios registrados</p>
        <button className="btn btn-primary" onClick={() => { setEditingService(null); setShowForm(true); }}>
          + Nuevo Servicio
        </button>
      </div>

      {showForm && (
        <ServiceForm 
          service={editingService} 
          onClose={() => setShowForm(false)} 
          onSaved={() => { setShowForm(false); onRefresh(); }}
        />
      )}

      {services.length === 0 ? (
        <div className="empty-state">
          <p>No hay servicios creados aún</p>
        </div>
      ) : (
        <div className="data-table">
          <div className="table-header">
            <span>Nombre</span>
            <span>Categoría</span>
            <span>Precio</span>
            <span>Estado</span>
            <span>Acciones</span>
          </div>
          {services.map(service => (
            <div key={service._id} className="table-row">
              <span className="row-name">{service.name}</span>
              <span className="row-category">{service.category}</span>
              <span className="row-price">
                {service.price ? `$${(service.price/1000).toFixed(0)}k` : 'Personalizado'}
              </span>
              <span className={`row-status ${service.available ? 'active' : 'inactive'}`}>
                {service.available ? 'Activo' : 'Inactivo'}
              </span>
              <span className="row-actions">
                <button className="action-btn edit" title="Editar">✏️</button>
                <button className="action-btn delete" onClick={() => onDelete(service._id)} title="Eliminar">🗑️</button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ================================
// SERVICE FORM
// ================================
const ServiceForm = ({ service, onClose, onSaved }) => {
  const [formData, setFormData] = useState(service || {
    name: '', shortDescription: '', description: '', category: 'desarrollo-web',
    price: '', priceType: 'custom', features: '', technologies: '',
    duration: '', available: true, featured: false
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        price: formData.price ? Number(formData.price) : undefined,
      };
      
      if (service?._id) {
        await servicesAPI.update(service._id, data);
      } else {
        await servicesAPI.create(data);
      }
      onSaved();
    } catch (error) {
      alert('Error al guardar servicio');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{service ? 'Editar Servicio' : 'Nuevo Servicio'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nombre *</label>
              <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Categoría</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="desarrollo-web">Desarrollo Web</option>
                <option value="ciberseguridad">Ciberseguridad</option>
                <option value="marketing-digital">Marketing Digital</option>
                <option value="diseno-uiux">Diseño UI/UX</option>
                <option value="consultoria-ti">Consultoría TI</option>
                <option value="desarrollo-movil">Desarrollo Móvil</option>
                <option value="cloud-devops">Cloud & DevOps</option>
                <option value="data-analytics">Data Analytics</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Descripción corta</label>
            <input value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Descripción detallada</label>
            <textarea rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Precio</label>
              <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Tipo de precio</label>
              <select value={formData.priceType} onChange={e => setFormData({...formData, priceType: e.target.value})}>
                <option value="fixed">Fijo</option>
                <option value="hourly">Por hora</option>
                <option value="monthly">Mensual</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Características (separadas por coma)</label>
            <input value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} placeholder="React, Node.js, MongoDB, AWS" />
          </div>
          <div className="form-group">
            <label>Tecnologías (separadas por coma)</label>
            <input value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} placeholder="SEO, Redes Sociales, Analytics" />
          </div>
          <div className="form-group">
            <label>Duración estimada</label>
            <input value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="2-3 meses" />
          </div>
          <div className="form-row checkboxes">
            <label>
              <input type="checkbox" checked={formData.available} onChange={e => setFormData({...formData, available: e.target.checked})} />
              Disponible
            </label>
            <label>
              <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
              Destacado
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Guardando...' : service ? 'Actualizar Servicio' : 'Crear Servicio'}
            </button>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ================================
// PORTFOLIO MANAGER
// ================================
const PortfolioManager = ({ projects, onDelete, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  return (
    <div className="manager-section">
      <div className="manager-header">
        <p className="manager-count">{projects.length} proyectos registrados</p>
        <button className="btn btn-primary" onClick={() => { setEditingProject(null); setShowForm(true); }}>
          + Nuevo Proyecto
        </button>
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); onRefresh(); }}
        />
      )}

      {projects.length === 0 ? (
        <div className="empty-state"><p>No hay proyectos creados aún</p></div>
      ) : (
        <div className="data-table">
          <div className="table-header">
            <span>Título</span>
            <span>Tipo</span>
            <span>Cliente</span>
            <span>Estado</span>
            <span>Acciones</span>
          </div>
          {projects.map(project => (
            <div key={project._id} className="table-row">
              <span className="row-name">{project.title}</span>
              <span className="row-category">{project.projectType}</span>
              <span>{project.client || '—'}</span>
              <span className={`row-status ${project.published ? 'active' : 'inactive'}`}>
                {project.published ? 'Publicado' : 'Borrador'}
              </span>
              <span className="row-actions">
                <button className="action-btn edit" title="Editar">✏️</button>
                <button className="action-btn delete" onClick={() => onDelete(project._id)} title="Eliminar">🗑️</button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ================================
// PROJECT FORM
// ================================
const ProjectForm = ({ project, onClose, onSaved }) => {
  const [formData, setFormData] = useState(project || {
    title: '', shortDescription: '', description: '', client: '',
    industry: 'tecnologia', projectType: 'desarrollo-web',
    technologies: '', liveUrl: '', duration: '',
    featured: false, published: true
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      };
      if (project?._id) {
        await portfolioAPI.update(project._id, data);
      } else {
        await portfolioAPI.create(data);
      }
      onSaved();
    } catch (error) {
      alert('Error al guardar proyecto');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{project ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Título *</label>
            <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Tipo</label>
              <select value={formData.projectType} onChange={e => setFormData({...formData, projectType: e.target.value})}>
                <option value="desarrollo-web">Desarrollo Web</option>
                <option value="desarrollo-movil">Desarrollo Móvil</option>
                <option value="diseno-uiux">Diseño UI/UX</option>
                <option value="ciberseguridad">Ciberseguridad</option>
                <option value="marketing">Marketing</option>
                <option value="consultoria">Consultoría</option>
                <option value="cloud-devops">Cloud & DevOps</option>
                <option value="data-analytics">Data Analytics</option>
              </select>
            </div>
            <div className="form-group">
              <label>Industria</label>
              <select value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})}>
                <option value="tecnologia">Tecnología</option>
                <option value="ecommerce">E-commerce</option>
                <option value="salud">Salud</option>
                <option value="educacion">Educación</option>
                <option value="finanzas">Finanzas</option>
                <option value="entretenimiento">Entretenimiento</option>
                <option value="startup">Startup</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Cliente</label>
              <input value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Duración</label>
              <input value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
            </div>
          </div>
          <div className="form-group">
            <label>Descripción corta</label>
            <input value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Descripción detallada</label>
            <textarea rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Tecnologías (separadas por coma)</label>
            <input value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} placeholder="React, Node.js, MongoDB" />
          </div>
          <div className="form-group">
            <label>URL del proyecto</label>
            <input value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} placeholder="https://..." />
          </div>
          <div className="form-row checkboxes">
            <label>
              <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
              Destacado
            </label>
            <label>
              <input type="checkbox" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} />
              Publicado
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Guardando...' : project ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            </button>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ================================
// ANALYTICS VIEW
// ================================
const AnalyticsView = ({ services, projects }) => {
  const totalViews = services.reduce((sum, s) => sum + (s.stats?.views || 0), 0) +
    projects.reduce((sum, p) => sum + (p.stats?.views || 0), 0);

  const analyticsCards = [
    { icon: '👁️', label: 'Vistas totales', value: totalViews.toLocaleString('es-CO') },
  ];

  return (
    <div className="analytics-section">
      <div className="analytics-grid">
        {analyticsCards.map((card, i) => (
          <div key={i} className="analytics-card">
            <span className="analytics-icon">{card.icon}</span>
            <span className="analytics-value">{card.value}</span>
            <span className="analytics-label">{card.label}</span>
          </div>
        ))}
      </div>

      <div className="analytics-details">
        <div className="analytics-block">
          <h3>🚀 Acciones Rápidas</h3>
          <div className="quick-actions">
            <div className="quick-action">
              <span>➕</span>
              <div>
                <strong>Nuevo servicio</strong>
                <p>Agrega un servicio al catálogo</p>
              </div>
            </div>
            <div className="quick-action">
              <span>📸</span>
              <div>
                <strong>Subir imagen</strong>
                <p>Añade imágenes a proyectos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;