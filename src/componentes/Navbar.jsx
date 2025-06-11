// src/componentes/BarraNavegacion.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Hook para obtener el estado de autenticación
import { FaUserAlt } from "react-icons/fa"; // Importamos el ícono de usuario de react-icons
import "./Navbar.css"; // Importa los estilos personalizados para la barra de navegación

const BarraNavegacion = () => {
  const { usuarioLogueado, cerrarSesion } = useAuth(); // Accede al estado de autenticación y la función de cerrar sesión

  const nombreUsuario = usuarioLogueado
    ? `${usuarioLogueado.nombre} ${usuarioLogueado.apellido}`
    : ""; // Si no está logueado, dejamos el nombre vacío.

  return (
    <header className="barra-navegacion">
      <div className="logo-usuario-container">
        <Link to="/">
          <img
            src="https://cem.epn.edu.ec/imagenes/logos_institucionales/big_png/EPN_logo_big.png" // Asegúrate de que la ruta sea correcta
            alt="Logo EPN"
            className="logo-img"
          />
        </Link>

        {/* Información del usuario, a la izquierda del logo */}
        {usuarioLogueado && (
          <div className="usuario-info">
            <FaUserAlt className="usuario-icon" /> {/* Icono de usuario */}
            <span className="usuario-nombre">{nombreUsuario}</span>
          </div>
        )}
      </div>

      <nav className="nav-links">
        {!usuarioLogueado ? (
          <>
            <Link to="/" className="nav-link text-light">
              Inicio
            </Link>
            <Link to="/espacios" className="nav-link text-light">
              Espacios
            </Link>
            <Link to="/contactos" className="nav-link text-light">
              Contactos
            </Link>
            <Link to="/login" className="nav-link text-light">
              Iniciar sesión
            </Link>
            <Link to="/registro" className="btn-register">
              Registro
            </Link>
          </>
        ) : usuarioLogueado.tipo === "usuario" ? (
          <>
            <Link to="/reserva" className="nav-link text-light">
              Reservas
            </Link>
            <Link to="/mis-reservas" className="nav-link text-light">
              Mis Reservas
            </Link>
            <Link to="/" className="btn-register" onClick={cerrarSesion}>
              Cerrar sesión
            </Link>
          </>
        ) : usuarioLogueado.tipo === "administrador" ? (
          <>
            <Link to="/admin" className="nav-link text-light">
              Administrar
            </Link>

            <Link to="/" className="btn-register" onClick={cerrarSesion}>
              Cerrar sesión
            </Link>
          </>
        ) : null}
      </nav>
    </header>
  );
};

export default BarraNavegacion;
