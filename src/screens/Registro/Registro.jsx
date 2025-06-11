import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarios, facultades } from "../../datos/datos";
import BarraNavegacion from "../../componentes/Navbar";
import "./Registro.css";

const Registro = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    repetirContrasena: "",
    telefono: "",
    direccion: "",
    facultad: "Escuela de Formación de Tecnólogos",
    tipoUsuario: "usuario",
    fechaNacimiento: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const validarNombre = (nombre) =>
    /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/.test(nombre);
  const validarApellido = (apellido) =>
    /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/.test(apellido);
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarContrasena = (contrasena) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(contrasena);
  const validarTelefono = (telefono) =>
    /^\d{10}$/.test(telefono.replace(/[^0-9]/g, ""));

  const validarDireccion = (direccion) =>
    /^[A-Za-z0-9\s.,#-]{5,100}$/.test(direccion);

  const validarFechaNacimiento = (fecha) => {
    if (!fecha) return false;
    const birthDate = new Date(fecha);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18 && age <= 100;
  };

  const contrasenasIguales =
    formulario.contrasena === formulario.repetirContrasena &&
    validarContrasena(formulario.contrasena);
  const camposValidos =
    validarNombre(formulario.nombre) &&
    validarApellido(formulario.apellido) &&
    validarEmail(formulario.email) &&
    validarTelefono(formulario.telefono) &&
    validarDireccion(formulario.direccion) &&
    validarFechaNacimiento(formulario.fechaNacimiento);

  const manejarRegistro = (e) => {
    e.preventDefault();
    const usuarioExistente = usuarios.find(
      (user) => user.correo === formulario.email
    );
    if (usuarioExistente) {
      setError("El correo ya está registrado.");
      return;
    }
    if (!camposValidos || !contrasenasIguales) {
      setError("Por favor, corrige los errores en los campos.");
      return;
    }
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      correo: formulario.email,
      contrasena: formulario.contrasena,
    };
    usuarios.push(nuevoUsuario);
    setTimeout(() => navigate("/login"), 3000);
  };

  return (
    <div>
      <BarraNavegacion usuarioLogueado={false} />
      <div className="registro-container">
        <div className="registro-card">
          <h2 className="titulo-form">Crear Cuenta Usuario</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={manejarRegistro} className="formulario-registro">
            <div className="input-group">
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                className={`input-field ${
                  !validarNombre(formulario.nombre) && formulario.nombre
                    ? "input-error"
                    : ""
                }`}
                required
              />
              <label className="floating-label">Nombre</label>
              {!validarNombre(formulario.nombre) && formulario.nombre && (
                <span className="error-text">
                  Nombre inválido (2-50 letras)
                </span>
              )}
            </div>
            <div className="input-group">
              <input
                type="text"
                name="apellido"
                value={formulario.apellido}
                onChange={manejarCambio}
                className={`input-field ${
                  !validarApellido(formulario.apellido) && formulario.apellido
                    ? "input-error"
                    : ""
                }`}
                required
              />
              <label className="floating-label">Apellido</label>
              {!validarApellido(formulario.apellido) && formulario.apellido && (
                <span className="error-text">
                  Apellido inválido (2-50 letras)
                </span>
              )}
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formulario.email}
                onChange={manejarCambio}
                className={`input-field ${
                  !validarEmail(formulario.email) && formulario.email
                    ? "input-error"
                    : ""
                }`}
                required
              />
              <label className="floating-label">Correo</label>
              {!validarEmail(formulario.email) && formulario.email && (
                <span className="error-text">Correo inválido</span>
              )}
            </div>
            <div className="input-group">
              <input
                type="password"
                name="contrasena"
                value={formulario.contrasena}
                onChange={manejarCambio}
                className={`input-field ${
                  !validarContrasena(formulario.contrasena) &&
                  formulario.contrasena
                    ? "input-error"
                    : ""
                }`}
                required
              />
              <label className="floating-label">Contraseña</label>
              {!validarContrasena(formulario.contrasena) &&
                formulario.contrasena && (
                  <span className="error-text">
                    Mínimo 8 caracteres, letra y número
                  </span>
                )}
            </div>
            <div className="input-group">
              <input
                type="password"
                name="repetirContrasena"
                value={formulario.repetirContrasena}
                onChange={manejarCambio}
                className={`input-field ${
                  !contrasenasIguales && formulario.repetirContrasena
                    ? "input-error"
                    : ""
                }`}
                required
              />
              <label className="floating-label">Repetir Contraseña</label>
              {!contrasenasIguales && formulario.repetirContrasena && (
                <span className="error-text">Las contraseñas no coinciden</span>
              )}
            </div>
          </form>
        </div>
        <div className="registro-card">
          <form onSubmit={manejarRegistro} className="formulario-registro">
            <div className="input-group">
              <input
                type="tel"
                name="telefono"
                value={formulario.telefono}
                onChange={manejarCambio}
                className={`input-field ${
                  !validarTelefono(formulario.telefono) && formulario.telefono
                    ? "input-error"
                    : ""
                }`}
                style={{ width: "80%", display: "inline-block" }}
                required
              />
              <label className="floating-label">Teléfono</label>
              {!validarTelefono(formulario.telefono) && formulario.telefono && (
                <span className="error-text">
                  Teléfono inválido (10 dígitos)
                </span>
              )}
            </div>
            <div className="input-group">
              <input
                type="text"
                name="direccion"
                value={formulario.direccion}
                onChange={manejarCambio}
                className={`input-field ${
                  !validarDireccion(formulario.direccion) &&
                  formulario.direccion
                    ? "input-error"
                    : ""
                }`}
                required
              />
              <label className="floating-label">Dirección</label>
              {!validarDireccion(formulario.direccion) &&
                formulario.direccion && (
                  <span className="error-text">
                    Dirección inválida (5-100 caracteres)
                  </span>
                )}
            </div>
            <div className="floating">
              <label className="">Facultad</label>
              <select
                name="Facultad"
                value={formulario.facultad}
                onChange={manejarCambio}
                className="input-field extended-select"
                required
              >
                <option value="">Selecciona una facultad</option>
                {facultades.map((facultad, index) => (
                  <option key={index}>{facultad.nombre}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <input
                type="date"
                name="fechaNacimiento"
                value={formulario.fechaNacimiento}
                onChange={manejarCambio}
                className={`input-field date-field ${
                  !validarFechaNacimiento(formulario.fechaNacimiento) &&
                  formulario.fechaNacimiento
                    ? "input-error"
                    : ""
                }`}
                required
              />
              <label className="floating-label">Fecha de Nacimiento</label>
              {!validarFechaNacimiento(formulario.fechaNacimiento) &&
                formulario.fechaNacimiento && (
                  <span className="error-text">Debe ser mayor de 18 años</span>
                )}
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={!contrasenasIguales || !camposValidos}
            >
              Crear Usuario
            </button>
          </form>
          <div className="footer">
            <p>
              Al continuar, acepto los <a href="#">Términos y condiciones</a>,
              la <a href="#">Política de privacidad</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
