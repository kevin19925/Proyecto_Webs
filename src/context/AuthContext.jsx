// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";
import { usuarios } from "../datos/datos"; // Asegúrate de que esta línea esté importando los usuarios correctamente

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(
    JSON.parse(localStorage.getItem("usuarioLogueado")) || null
  );

  // Función para iniciar sesión
  const iniciarSesion = (email, contrasena) => {
    const usuario = usuarios.find(
      (u) => u.correo === email && u.contrasena === contrasena
    );
    if (usuario) {
      setUsuarioLogueado(usuario); // Guardamos el usuario logueado en el estado
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario)); // Guardamos en localStorage
      return usuario; // Retornamos el objeto usuario para determinar el tipo
    }
    return null; // Si las credenciales son incorrectas, retornamos null
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    setUsuarioLogueado(null);
    localStorage.removeItem("usuarioLogueado");
  };

  return (
    <AuthContext.Provider
      value={{ usuarioLogueado, iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
