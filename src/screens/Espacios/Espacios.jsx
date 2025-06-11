// src/screens/Espacios.jsx
import React, { useEffect, useState } from "react";
import { espacios, canchas } from "../../datos/datos"; // Traemos los datos de los espacios y canchas
import BarraNavegacion from "../../componentes/Navbar";
import EspacioCard from "../../componentes/EspacioCard"; // Importamos el nuevo componente de tarjeta
import { useAuth } from "../../context/AuthContext"; // Importamos el contexto para saber si el usuario está logueado
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario a la página de reservas
import "./Espacios.css"; // Importamos los estilos

// Componente principal de la vista de espacios
export const Espacios = () => {
  const { usuarioLogueado } = useAuth(); // Usamos el hook de autenticación para verificar el usuario logueado
  const [userName, setUserName] = useState(""); // Para almacenar el nombre del usuario logueado
  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioLogueado) {
      setUserName(`${usuarioLogueado.nombre} ${usuarioLogueado.apellido}`);
    }
  }, [usuarioLogueado]);

  // Función para manejar la reserva de espacios
  const handleReservaClick = (canchaId) => {
    if (!usuarioLogueado) {
      navigate("/login"); // Redirige al login si el usuario no está logueado
    } else {
      navigate(`/reserva/${canchaId}`); // Redirige a la página de reserva para la cancha seleccionada
    }
  };

  return (
    <div className="espacios-container">
      {/* Barra de navegación */}
      <BarraNavegacion />

      {/* Lista de espacios */}
      <div className="container">
        {espacios.map((espacio) => {
          const cancha = canchas.find((c) => c.id === espacio.id);
          return (
            <div key={espacio.id}>
              {/* Componente que muestra el espacio */}
              <EspacioCard
                espacio={espacio}
                estado={cancha.estado}
                onReservaClick={() => handleReservaClick(espacio.id)} // Pasa la función de reserva
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Espacios;
