import React from "react";
import "./HeroCarousel.css";

// Componente del Carrusel de Imágenes
const CarruselHeroe = () => {
  // Array de imágenes para el carrusel
  const imagenesCarrusel = [
    "../../src/img/icono_reserv_futsala.jpg", // Ruta pública
    "../../src/img/icono_reserv_voley.jpg",
    "../../src/img/icono_reservacio_basquet.jpg",
    "",
  ];

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {/* Mapeamos las imágenes para mostrarlas en el carrusel */}
        {imagenesCarrusel.map((url, idx) => (
          <div key={idx} className="carousel-item">
            <img
              className="carousel-image"
              src={url}
              alt={`Imagen del carrusel ${idx + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarruselHeroe;
