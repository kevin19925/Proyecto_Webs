import React, { useState } from "react";
import BarraNavegacion from "../../componentes/Navbar"; // Barra de navegación
import "./Contactos.css";

export const Contactos = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [error, setError] = useState("");

  // Manejar el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validar el formulario antes de enviarlo
  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, correo, mensaje } = formData;

    if (!nombre || !correo || !mensaje) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Simulación de envío de mensaje
    setMensajeEnviado(true);
    setError(""); // Limpiar error
    setFormData({ nombre: "", correo: "", mensaje: "" }); // Limpiar formulario
  };

  return (
    <div className="contactos-container">
      {/* Barra de navegación */}
      <BarraNavegacion />

      {/* Contenedor de información y formulario */}
      <div className="contactos-grid">
        <div className="title-container">
          <h1 className="title">Contáctanos</h1>
          <p className="subtitle">
            ¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para
            ayudarte. Usa la información o el formulario a continuación.
          </p>
        </div>

        {/* Información de contacto */}
        <div className="contact-info">
          <div>
            <h5 className="info-title">Dirección</h5>
            <p className="info-text">
              Ladrón de Guevara E11-253 y Av. 12 de Octubre, Quito - Ecuador
            </p>
          </div>
          <div>
            <h5 className="info-title">Correo electrónico</h5>
            <p className="info-text">soporte.reservas@epn.edu.ec</p>
          </div>
          <div>
            <h5 className="info-title">Teléfono</h5>
            <p className="info-text">+593 2 2976 300</p>
          </div>
        </div>

        {/* Formulario de contacto */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-input"
              placeholder="Tu nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-input"
              placeholder="tunombre@ejemplo.com"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Mensaje</label>
            <textarea
              rows="4"
              className="form-input"
              placeholder="Escribe tu mensaje aquí..."
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Mostrar error o mensaje de éxito */}
          {error && <div className="error-message">{error}</div>}
          {mensajeEnviado && (
            <div className="success-message">
              ¡Tu mensaje ha sido enviado correctamente! Nos pondremos en
              contacto contigo pronto.
            </div>
          )}

          {/* Botón de enviar */}
          <button type="submit" className="submit-button">
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contactos;
