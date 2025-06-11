import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Asegúrate de importar Link correctamente
import { useAuth } from "../../context/AuthContext"; // Usamos el hook para autenticación
import BarraNavegacion from "../../componentes/Navbar";
import "./Login.css";

export const Login = () => {
  const { iniciarSesion } = useAuth(); // Usamos la función de iniciar sesión del contexto
  const [email, setEmail] = useState(""); // Estado para el correo
  const [contrasena, setContrasena] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(""); // Estado para manejar errores (si el login falla)
  const navigate = useNavigate(); // Usamos el hook de navegación

  const manejarLogin = (e) => {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario

    // Intentamos iniciar sesión con las credenciales
    const usuario = iniciarSesion(email, contrasena);

    if (usuario) {
      setError(""); // Limpiamos el error si el login es exitoso

      // Comprobamos el tipo de usuario y redirigimos
      if (usuario.tipo === "administrador") {
        navigate("/admin"); // Si es administrador, lo redirigimos a /admin
      } else {
        navigate("/reserva"); // Si es usuario, lo redirigimos a /reserva
      }
    } else {
      setError("Credenciales incorrectas"); // Mostramos error si el login falla
    }
  };

  return (
    <div>
      <BarraNavegacion /> {/* Barra de navegación dentro de la tarjeta */}
      <div className="login-container">
        {/* Barra de navegación dentro de la tarjeta de login */}
        <div className="login-card">
          <header className="login-header">
            <img
              src="https://cem.epn.edu.ec/imagenes/logos_institucionales/big_png/EPN_logo_big.png" // Asegúrate de que la ruta sea correcta
              alt="Logo EPN"
              className="logo-img"
            />
            <h2 className="login-title">Inicia Sesión</h2>
          </header>
          {error && <div className="error-alert">{error}</div>}
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
