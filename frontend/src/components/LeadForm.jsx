/**
 * Componente LeadForm - Captura de leads sin login
 * 
 * Este formulario aparece en las páginas de detalle para que los visitantes
 * puedan dejar su información de contacto sin necesidad de registrarse.
 * Ideal para capturar clientes potenciales sin fricción.
 */

import { useState } from 'react';
import { contactAPI } from '../services/api';
import './LeadForm.css';

const LeadForm = ({ serviceName, serviceType, onClose, inline = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: `Quiero información sobre: ${serviceName || 'servicios'}`,
    serviceType: serviceType || 'otro',
    message: '',
    budgetRange: 'no-seguro'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await contactAPI.send(formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      setError(err.error || 'Error al enviar. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className={inline ? 'lead-modal lead-modal-inline' : 'lead-modal'} onClick={(e) => e.stopPropagation()}>
      {!inline && <button className="lead-close" onClick={onClose}>✕</button>}

      {!success ? (
        <>
          <div className="lead-header">
            <div className="lead-icon">📩</div>
            <h2>Quiero más información</h2>
            <p>Completa tus datos y te contactaremos en menos de 24 horas</p>
          </div>

          {error && <div className="lead-alert lead-error">{error}</div>}

          <form onSubmit={handleSubmit} className="lead-form">
            <div className="lead-row">
              <div className="lead-group">
                <label>Nombre *</label>
                <input type="text" name="name" value={formData.name}
                  onChange={handleChange} placeholder="Tu nombre completo" required />
              </div>
              <div className="lead-group">
                <label>Email *</label>
                <input type="email" name="email" value={formData.email}
                  onChange={handleChange} placeholder="tu@email.com" required />
              </div>
            </div>

            <div className="lead-row">
              <div className="lead-group">
                <label>Teléfono *</label>
                <input type="tel" name="phone" value={formData.phone}
                  onChange={handleChange} placeholder="+57 300 123 4567" required />
              </div>
              <div className="lead-group">
                <label>Empresa</label>
                <input type="text" name="company" value={formData.company}
                  onChange={handleChange} placeholder="Nombre de tu empresa" />
              </div>
            </div>

            <div className="lead-group">
              <label>Presupuesto estimado</label>
              <select name="budgetRange" value={formData.budgetRange}
                onChange={handleChange}>
                <option value="no-seguro">No estoy seguro</option>
                <option value="menos-1000">Menos de $1.000.000</option>
                <option value="1000-5000">$1.000.000 - $5.000.000</option>
                <option value="5000-10000">$5.000.000 - $10.000.000</option>
                <option value="10000-25000">$10.000.000 - $25.000.000</option>
                <option value="25000-50000">$25.000.000 - $50.000.000</option>
                <option value="mas-50000">Más de $50.000.000</option>
              </select>
            </div>

            <div className="lead-group">
              <label>Cuéntanos sobre tu proyecto</label>
              <textarea name="message" value={formData.message}
                onChange={handleChange}
                placeholder="Describe brevemente lo que necesitas..." rows="3" />
            </div>

            <button type="submit" className="btn btn-primary btn-large lead-submit"
              disabled={loading}>
              {loading ? (
                <span className="lead-loading">
                  <span className="lead-spinner"></span>
                  Enviando...
                </span>
              ) : 'Enviar y recibir información'}
            </button>

            <p className="lead-note">🔒 Tus datos están seguros. No compartiremos tu información con terceros.</p>
          </form>
        </>
      ) : (
        <div className="lead-success">
          <div className="success-icon">✅</div>
          <h2>¡Mensaje enviado!</h2>
          <p>Gracias por tu interés. Te contactaremos pronto para hablar sobre tu proyecto.</p>
          <p className="success-time">Te esperamos en menos de 24 horas</p>
        </div>
      )}
    </div>
  );

  return inline ? content : <div className="lead-overlay" onClick={onClose}>{content}</div>;
};

export default LeadForm;