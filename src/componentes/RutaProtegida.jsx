import React from "react"; // Importa React para poder usar JSX.
import { Navigate } from "react-router-dom"; // Importa el componente `Navigate` de `react-router-dom` para redirigir a otras rutas.
import { useAuth } from "../context/AuthContext"; // Importa el hook `useAuth` que proporciona el estado de autenticación del usuario.

const RutaProtegida = ({ children }) => {
  // Componente que recibe `children` (el contenido de la ruta protegida).
  const { usuarioLogueado } = useAuth(); // Usamos `useAuth` para acceder al estado de si el usuario está logueado o no.

  // Si el usuario no está logueado, redirigimos a la página de inicio (login).
  if (!usuarioLogueado) {
    return <Navigate to="/" />; // Redirige a la página principal (login) si el usuario no está logueado.
  }

  return children; // Si el usuario está logueado, mostramos el contenido de la ruta protegida.
};

export default RutaProtegida; // Exportamos el componente para poder usarlo en otras partes de la aplicación.
