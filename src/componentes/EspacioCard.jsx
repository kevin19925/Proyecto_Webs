import React from "react";
import "./EspacioCard.css";

const EspacioCard = ({ espacio }) => {
  // El componente recibe la prop `espacio` que contiene la información de un único espacio.
  return (
    <div
      key={espacio.id} // Cada tarjeta de espacio tiene una clave única basada en el id del espacio.
      className="espacio-card" // Clase principal para la tarjeta del espacio.
    >
      <img
        src={espacio.img} // La imagen del espacio se toma del campo `imagen` del objeto `espacio`.
        alt={espacio.nombre} // El texto alternativo de la imagen es el nombre del espacio.
        className="espacio-card-img" // Clase para la imagen de la tarjeta.
      />
      <div className="espacio-card-details">
        {/* Contenedor para los detalles del espacio (nombre, edificio, descripción). */}
        <h4 className="espacio-card-title">{espacio.nombre}</h4>{" "}
        {/* El nombre del espacio, en negrita. */}
        <p className="espacio-card-building">{espacio.edificio}</p>{" "}
        <p className="espacio-card-building">
          {" "}
          Capacidad : {espacio.capacidad}
        </p>{" "}
        {/* El nombre del edificio al que pertenece el espacio. */}
        <p className="espacio-card-description">{espacio.descripcion}</p>{" "}
        {/* Descripción del espacio. */}
        <div className="espacio-card-rating">
          {/* Contenedor para la calificación del espacio. */}
          <span className="espacio-card-stars">★★★★★</span>{" "}
          {/* Estrellas para mostrar la calificación. */}
        </div>
      </div>
    </div>
  );
};

export default EspacioCard; // Exportamos el componente para que pueda ser usado en otros lugares.
