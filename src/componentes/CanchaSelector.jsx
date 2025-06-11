// src/componentes/CanchaSelector.jsx
import React, { useState, useEffect } from "react";
import { espacios } from "../datos/datos"; // Datos de las canchas
import "./CanchaSelector.css"; // Estilos

const CanchaSelector = ({
  espacioSeleccionado, // El tipo de cancha seleccionado
  setEspacioSeleccionado, // Función para actualizar el tipo de cancha seleccionado
  setNombreTipoCancha, // Función para establecer el tipo de cancha seleccionado
}) => {
  const [imagenCancha, setImagenCancha] = useState(""); // Estado para la imagen de la cancha seleccionada

  // Establece el tipo de cancha seleccionado por defecto
  useEffect(() => {
    if (!espacioSeleccionado) {
      // Si no hay cancha seleccionada, por defecto seleccionamos la primera cancha
      setEspacioSeleccionado(espacios[0].id);
      setNombreTipoCancha(espacios[0].tipo); // Establece el tipo de cancha por defecto
    }
  }, [espacioSeleccionado, setEspacioSeleccionado, setNombreTipoCancha]);

  // Cambia la imagen de la cancha seleccionada
  useEffect(() => {
    if (espacioSeleccionado) {
      const canchaSeleccionada = espacios.find(
        (espacio) => espacio.id === espacioSeleccionado
      );
      setImagenCancha(canchaSeleccionada?.img); // Actualiza la imagen de la cancha
    }
  }, [espacioSeleccionado]);

  return (
    <div className="cancha-selector-container">
      <div className="cancha-selector-left">
        <h4 className="heading">Selecciona el tipo de cancha:</h4>
        <div className="cancha-cards">
          {espacios.map((espacio) => (
            <div
              key={espacio.id}
              className={`cancha-card ${
                espacioSeleccionado === espacio.id ? "selected" : ""
              }`}
              onClick={() => {
                setEspacioSeleccionado(espacio.id); // Selecciona el tipo de cancha
                setNombreTipoCancha(espacio.tipo); // Establece el tipo de cancha
              }}
            >
              <div className="cancha-img-container">
                <img
                  src={espacio.img}
                  alt={espacio.nombre}
                  className="cancha-img"
                />
              </div>
              <div className="card-body">
                <h5
                  className={`cancha-title ${
                    espacioSeleccionado === espacio.id ? "selected-title" : ""
                  }`}
                >
                  {espacio.nombre}
                </h5>
                <p className="cancha-description">{espacio.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cancha-selector-right">
        {imagenCancha && (
          <img
            src={imagenCancha}
            alt="Imagen de cancha"
            className="selected-cancha-img"
          />
        )}
      </div>
    </div>
  );
};

export default CanchaSelector;
