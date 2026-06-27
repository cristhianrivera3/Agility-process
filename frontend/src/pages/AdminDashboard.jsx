/**
 * AdminDashboard - Panel de Administración Profesional
 * 
 * Dashboard completo para gestionar:
 * - Servicios (CRUD)
 * - Portafolio (CRUD) 
 * - Contactos (leer, gestionar)
 * - Estadísticas
 * - Usuarios trabajadores
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { servicesAPI, portfolioAPI, contactAPI } from '../services/api';
import './AdminDashboard.css';

// ================================
// SECTIONS CONFIG
// ================================
const SECTIONS = {
  DASHBOARD: 'dashboard',
  SERVICES: 'services',
  PORTFOLIO: 'portfolio',
  CONTACTS: 'contacts',
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
  const [contacts, setContacts] = useState([]);
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
      const [servicesRes, projectsRes, contactsRes] = await Promise.all([
        servicesAPI.getAll({ limit: 100, all: true }).catch(() => ({ data: { data: [] } })),
        portfolioAPI.getAll({ limit: 100, all: true }).catch(() => ({ data: { data: [] } })),
        contactAPI.getAll({ limit: 100 }).catch(() => ({ data: { data: [] } })),
      ]);

      setServices(servicesRes.data.data || []);
      setProjects(projectsRes.data.data || []);
      setContacts(contactsRes.data.data || []);
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

  const handleDeleteContact = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este mensaje?')) return;
    try {
      await contactAPI.delete(id);
      setContacts(prev => prev.filter(c => c._id !== id));
    } catch (error) {
      alert('Error al eliminar mensaje');
    }
  };

  const handleUpdateContactStatus = async (id, status) => {
    try {
      await contactAPI.update(id, { status });
      setContacts(prev => prev.map(c => 
        c._id === id ? { ...c, status } : c
      ));
    } catch (error) {
      alert('Error al actualizar estado');
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
              className={`nav-btn ${activeSection === SECTIONS.CONTACTS ? 'active' : ''}`}
              onClick={() => setActiveSection(SECTIONS.CONTACTS)}
            >
              📧 Contactos
              <span className="nav-badge contact-badge">{contacts.length}</span>
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
                  <DashboardOverview services={services} projects={projects} contacts={contacts} />
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
                {activeSection === SECTIONS.CONTACTS && (
                  <ContactsManager 
                    contacts={contacts} 
                    onDelete={handleDeleteContact}
                    onUpdateStatus={handleUpdateContactStatus}
                  />
                )}
                {activeSection === SECTIONS.ANALYTICS && (
                  <AnalyticsView services={services} projects={projects} contacts={contacts} />
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
    [SECTIONS.CONTACTS]: 'Mensajes de Contacto',
    [SECTIONS.ANALYTICS]: 'Estadísticas del Sitio'
  };
  return titles[section] || 'Dashboard';
};

const getSectionDescription = (section) => {
  const descs = {
    [SECTIONS.DASHBOARD]: 'Resumen general de tu sitio web',
    [SECTIONS.SERVICES]: 'Administra los servicios que ofreces a tus clientes',
    [SECTIONS.PORTFOLIO]: 'Gestiona los proyectos realizados por la agencia',
    [SECTIONS.CONTACTS]: 'Revisa y gestiona los mensajes de tus clientes potenciales',
    [SECTIONS.ANALYTICS]: 'Métricas y estadísticas de rendimiento'
  };
  return descs[section] || '';
};

// ================================
// DASHBOARD OVERVIEW
// ================================
const DashboardOverview = ({ services, projects, contacts }) => {
  const newContacts = contacts.filter(c => c.status === 'nuevo').length;
  const urgentContacts = contacts.filter(c => c.priority === 'urgente').length;
  const featuredServices = services.filter(s => s.featured).length;
  const featuredProjects = projects.filter(p => p.featured).length;

  const cards = [
    { icon: '📋', label: 'Servicios', value: services.length, color: '#00d4ff', sub: `${featuredServices} destacados` },
    { icon: '📁', label: 'Proyectos', value: projects.length, color: '#7c3aed', sub: `${featuredProjects} destacados` },
    { icon: '📧', label: 'Contactos', value: contacts.length, color: '#22c55e', sub: `${newContacts} nuevos` },
    { icon: '🚨', label: 'Urgentes', value: urgentContacts, color: '#ef4444', sub: 'requieren atención' },
  ];

  const recentContacts = contacts.slice(0, 5);

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

      <div className="recent-section">
        <h3>Mensajes Recientes</h3>
        {recentContacts.length === 0 ? (
          <p className="empty-state">No hay mensajes recientes</p>
        ) : (
          <div className="recent-list">
            {recentContacts.map(contact => (
              <div key={contact._id} className="recent-item">
                <div className="recent-avatar">
                  {contact.name?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="recent-content">
                  <strong>{contact.name}</strong>
                  <span className="recent-subject">{contact.subject}</span>
                </div>
                <span className={`status-badge status-${contact.status}`}>
                  {contact.status}
                </span>
              </div>
            ))}
          </div>
        )}
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
// CONTACTS MANAGER
// ================================
const ContactsManager = ({ contacts, onDelete, onUpdateStatus }) => {
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filteredContacts = filter === 'all'
    ? contacts
    : contacts.filter(c => c.status === filter);

  const statusCounts = {
    all: contacts.length,
    nuevo: contacts.filter(c => c.status === 'nuevo').length,
    'en-proceso': contacts.filter(c => c.status === 'en-proceso').length,
    respondido: contacts.filter(c => c.status === 'respondido').length,
  };

  return (
    <div className="contacts-section">
      <div className="contacts-filters">
        {[
          { id: 'all', label: 'Todos', count: statusCounts.all },
          { id: 'nuevo', label: 'Nuevos', count: statusCounts.nuevo },
          { id: 'en-proceso', label: 'En Proceso', count: statusCounts['en-proceso'] },
          { id: 'respondido', label: 'Respondidos', count: statusCounts.respondido },
        ].map(f => (
          <button
            key={f.id}
            className={`contact-filter-btn ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label} <span className="filter-count">{f.count}</span>
          </button>
        ))}
      </div>

      {filteredContacts.length === 0 ? (
        <div className="empty-state"><p>No hay mensajes</p></div>
      ) : (
        <div className="contacts-list">
          {filteredContacts.map(contact => (
            <div key={contact._id} className={`contact-card ${contact.priority === 'urgente' ? 'urgent' : ''}`}>
              <div className="contact-header" onClick={() => setExpandedId(expandedId === contact._id ? null : contact._id)}>
                <div className="contact-avatar">
                  {contact.name?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="contact-summary">
                  <strong>{contact.name}</strong>
                  <span className="contact-email">{contact.email}</span>
                  <span className="contact-subject">{contact.subject}</span>
                </div>
                <div className="contact-meta">
                  <span className={`status-badge status-${contact.status}`}>{contact.status}</span>
                  <span className="contact-date">
                    {new Date(contact.createdAt).toLocaleDateString('es-CO')}
                  </span>
                </div>
              </div>

              {expandedId === contact._id && (
                <div className="contact-details">
                  <div className="details-grid">
                    <div><strong>Teléfono:</strong> {contact.phone || '—'}</div>
                    <div><strong>Empresa:</strong> {contact.company || '—'}</div>
                    <div><strong>Servicio:</strong> {contact.serviceType || '—'}</div>
                    <div><strong>Presupuesto:</strong> {contact.budgetRange || '—'}</div>
                  </div>
                  <div className="details-message">
                    <strong>Mensaje:</strong>
                    <p>{contact.message}</p>
                  </div>
                  <div className="details-actions">
                    <select
                      value={contact.status}
                      onChange={(e) => onUpdateStatus(contact._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="nuevo">📌 Nuevo</option>
                      <option value="en-proceso">🔄 En Proceso</option>
                      <option value="respondido">✅ Respondido</option>
                      <option value="cerrado">🔒 Cerrado</option>
                      <option value="spam">🚫 Spam</option>
                    </select>
                    <button className="btn btn-outline btn-small" onClick={() => onDelete(contact._id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ================================
// ANALYTICS VIEW
// ================================
const AnalyticsView = ({ services, projects, contacts }) => {
  const totalViews = services.reduce((sum, s) => sum + (s.stats?.views || 0), 0) +
    projects.reduce((sum, p) => sum + (p.stats?.views || 0), 0);
  const totalLeads = contacts.filter(c => c.status !== 'spam').length;
  const conversionRate = totalViews > 0 ? ((totalLeads / totalViews) * 100).toFixed(1) : '0';

  // Contacts by service type
  const contactsByService = {};
  contacts.forEach(c => {
    const type = c.serviceType || 'otro';
    contactsByService[type] = (contactsByService[type] || 0) + 1;
  });

  const analyticsCards = [
    { icon: '👁️', label: 'Vistas totales', value: totalViews.toLocaleString('es-CO') },
    { icon: '📝', label: 'Leads generados', value: totalLeads },
    { icon: '📊', label: 'Tasa de conversión', value: `${conversionRate}%` },
    { icon: '✅', label: 'Contactos respondidos', value: contacts.filter(c => c.status === 'respondido').length },
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
          <h3>📋 Por Servicio</h3>
          <div className="services-breakdown">
            {Object.entries(contactsByService).map(([type, count]) => (
              <div key={type} className="breakdown-item">
                <span className="breakdown-name">{type}</span>
                <div className="breakdown-bar">
                  <div className="breakdown-fill" style={{
                    width: `${(count / totalLeads) * 100}%`
                  }}></div>
                </div>
                <span className="breakdown-count">{count}</span>
              </div>
            ))}
            {Object.keys(contactsByService).length === 0 && (
              <p className="empty-state">No hay datos suficientes</p>
            )}
          </div>
        </div>

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
            <div className="quick-action">
              <span>📧</span>
              <div>
                <strong>Revisar contactos</strong>
                <p>{contacts.filter(c => c.status === 'nuevo').length} pendientes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;