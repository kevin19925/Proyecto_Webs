import React, { useState, useEffect } from "react";
import { canchas, horarios, reservas } from "../datos/datos"; // Traemos los datos de las canchas y horarios
import "./ReservaFechaHoraSelector.css";

const ReservaFechaHoraSelector = ({
  espacioSeleccionado,
  fechaSeleccionada,
  setFechaSeleccionada,
  setHorarioSeleccionado,
  horarioSeleccionado,
  reservasUsuario,
  setReservaConfirmada,
  setPasoActual,
  nombreTipoCancha,
  usuarioLogueado,
}) => {
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(""); // Estado para la cancha seleccionada
  const [imagenCancha, setImagenCancha] = useState(""); // Estado para la imagen de la cancha seleccionada
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal

  // Filtramos las canchas por el tipo seleccionado solo si `nombreTipoCancha` tiene valor
  const canchasDisponiblesPorTipo = canchas.filter(
    (cancha) =>
      cancha.tipo === nombreTipoCancha && cancha.estado === "disponible"
  );

  // Filtramos las horas ocupadas por el usuario según la fecha seleccionada y la cancha seleccionada
  const horasOcupadas = reservasUsuario
    ? reservasUsuario
        .filter(
          (reserva) =>
            reserva.fecha === fechaSeleccionada &&
            canchas.find((cancha) => cancha.id === reserva.canchaId).tipo ===
              nombreTipoCancha &&
            canchas.find((cancha) => cancha.id === reserva.canchaId).id !==
              canchaSeleccionada // Excluye la misma cancha seleccionada
        )
        .map((reserva) => reserva.hora)
    : [];

  useEffect(() => {
    if (canchaSeleccionada) {
      const canchaSeleccionadaObj = canchas.find(
        (cancha) => cancha.id === parseInt(canchaSeleccionada)
      );
      setImagenCancha(canchaSeleccionadaObj?.img); // Establece la imagen de la cancha seleccionada
    }
  }, [canchaSeleccionada]);

  const handleGuardarReserva = () => {
    if (!canchaSeleccionada || !horarioSeleccionado) {
      setModalMessage(
        "Por favor, selecciona una cancha y una hora para completar la reserva."
      );
      setShowModal(true);
      return;
    }

    const nuevaReserva = {
      id: reservas.length + 1,
      usuarioId: usuarioLogueado.id,
      canchaId: canchaSeleccionada,
      fecha: fechaSeleccionada,
      hora: horarioSeleccionado,
      duracion: "1h",
      estado: "reservada",
      tipoCancha: nombreTipoCancha,
    };
    console.log("ffffff", nuevaReserva);
    setReservaConfirmada(nuevaReserva);
    setModalMessage("¡Reserva guardada con éxito!");
    setShowModal(true);
  };

  return (
    <div className="selector-container">
      <div className="form-container">
        {/* Sección para la selección de cancha */}
        <div className="mb-3">
          <label className="form-label">Selecciona una Cancha</label>
          <div className="cancha-grid">
            {canchasDisponiblesPorTipo.map((cancha) => (
              <button
                key={cancha.id}
                className={`cancha-btn ${
                  canchaSeleccionada === cancha.id ? "selected" : ""
                }`}
                onClick={() => setCanchaSeleccionada(cancha.id)}
              >
                {cancha.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Sección para la selección de hora */}
        <div className="mb-3">
          <label className="form-label">Selecciona una Hora</label>
          <div className="hora-grid">
            {horarios
              .filter((hora) => !horasOcupadas.includes(hora))
              .map((hora, idx) => (
                <button
                  key={idx}
                  className={`hora-btn ${
                    horarioSeleccionado === hora ? "selected" : ""
                  }`}
                  onClick={() => setHorarioSeleccionado(hora)}
                >
                  {hora}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Imagen de la cancha seleccionada */}
      {imagenCancha && (
        <div className="image-container">
          <img
            src={imagenCancha}
            alt="Cancha seleccionada"
            className="selected-cancha-img"
          />
        </div>
      )}

      {/* Botones para confirmar la reserva o regresar */}
      <div className="form-actions">
        <button
          className="btn btn-secondary w-100 mt-4"
          onClick={() => setPasoActual(1)}
        >
          Regresar
        </button>
        <button
          className="btn btn-primary w-100 mt-4"
          onClick={handleGuardarReserva}
        >
          Guardar Reserva
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className={`modal ${showModal ? "show" : ""}`}>
            <div className="modal-header">
              <h2>
                {modalMessage.includes("¡Reserva guardada")
                  ? "¡Reserva Confirmada!"
                  : "Advertencia"}
              </h2>
              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button className="btn-close" onClick={() => setShowModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservaFechaHoraSelector;
