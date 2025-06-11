import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BarraNavegacion from "../../componentes/Navbar";
import "./Login.css";

export const Login = () => {
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores
  const navigate = useNavigate();

  const manejarLogin = (e) => {
    e.preventDefault();

    // Intentamos iniciar sesión con las credenciales
    const usuario = iniciarSesion(email, contrasena);

    if (usuario) {
      setError(""); // Limpiamos el error si el login es exitoso
      if (usuario.tipo === "administrador") {
        navigate("/admin"); // Redirigimos al panel de administración
      } else {
        navigate("/reserva"); // Redirigimos a las reservas
      }
    } else {
      setError("Credenciales incorrectas"); // Mostramos el error si el login falla
    }
  };

  // Función para cerrar el mensaje de error
  const cerrarError = () => {
    setError(""); // Limpiamos el mensaje de error
  };

  return (
    <div>
      <BarraNavegacion />
      <div className="login-container">
        <div className="login-card">
          <header className="login-header">
            <img
              src="https://cem.epn.edu.ec/imagenes/logos_institucionales/big_png/EPN_logo_big.png"
              alt="Logo EPN"
              className="logo-img"
            />
            <h2 className="login-title">Inicia Sesión</h2>
          </header>
          {error && (
            <div className="error-alert">
              <span>{error}</span>
              <button className="close-btn" onClick={cerrarError}>
                ×
              </button>
            </div>
          )}
          <form onSubmit={manejarLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Contraseña"
                className="input-field"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-button-login">
              Iniciar sesión
            </button>
          </form>
          <div className="signup-link">
            <p>
              ¿No tienes cuenta?{" "}
              <Link to="/registro" className="signup-text">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
