import React from "react";
import "./ReservationSteps.css"; // Importamos el archivo CSS para los estilos del componente.

const PasosReserva = () => {
  // Array que contiene los pasos de la reserva: cada paso tiene un ícono, título y descripción.
  const pasosReserva = [
    {
      icono: "https://www.svgrepo.com/show/490536/ball-basketball.svg", // URL del ícono del primer paso.
      titulo: "Escoge tu espacio", // Título del primer paso.
      descripcion: "Entre todos los espacios disponibles para reserva", // Descripción del primer paso.
    },
    {
      icono: "https://cdn-icons-png.flaticon.com/512/992/992700.png", // URL del ícono del segundo paso.
      titulo: "Escoge el horario en el que usaras el espacio", // Título del segundo paso.
      descripcion:
        "Puedes escoger el dia y la hora en la que haras uso del espacio", // Descripción del segundo paso.
    },
    {
      icono: "https://www.svgrepo.com/show/488853/check-square.svg", // URL del ícono del tercer paso.
      titulo: "Realiza tu reservacion", // Título del tercer paso.
      descripcion:
        "Completa los datos de la reservacion y disfruta de tu espacio", // Descripción del tercer paso.
    },
  ];

  return (
    <section className="pasos-reserva-container">
      <h2>
        Cómo reservar un <span className="pasos-reserva-espacio">espacio</span>:
      </h2>
      <div className="pasos-reserva-steps">
        {/* Mapeamos los pasos para mostrarlos en pantalla */}
        {pasosReserva.map((paso, idx) => (
          <div key={idx} className="pasos-reserva-step">
            {/* Contenedor de cada paso */}
            <img
              src={paso.icono} // La URL del ícono de cada paso.
              alt={paso.titulo} // Texto alternativo para la imagen del ícono.
              className="pasos-reserva-icono" // Clase para los íconos
            />
            <h5 className="pasos-reserva-titulo-paso">{paso.titulo}</h5>
            <p className="pasos-reserva-descripcion">{paso.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Botón de "Reserva ahora" */}
      <div className="reserva-ahora-container">
        <button className="reserva-ahora-button">Reserva ahora</button>
      </div>
    </section>
  );
};

export default PasosReserva;
