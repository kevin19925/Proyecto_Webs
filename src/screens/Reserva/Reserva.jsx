import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  canchas,
  horarios,
  usuarios,
  reservas as reservasGlobal,
} from "../../datos/datos"; // Traemos los datos
import { useAuth } from "../../context/AuthContext";
import CanchaSelector from "../../componentes/CanchaSelector";
import ReservaFechaHoraSelector from "../../componentes/ReservaFechaHoraSelector";
import BarraNavegacion from "../../componentes/Navbar";
import "./Reserva.css";

export const Reserva = () => {
  const { usuarioLogueado } = useAuth(); // Obtiene la autenticación del usuario
  const [nombreUsuario, setNombreUsuario] = useState(""); // Estado para el nombre del usuario logueado
  const [espacioSeleccionado, setEspacioSeleccionado] = useState(""); // Estado para el tipo de cancha seleccionado
  const [nombreTipoCancha, setNombreTipoCancha] = useState(""); // Estado para almacenar el tipo de cancha
  const [pasoActual, setPasoActual] = useState(1); // Paso actual del flujo de reserva
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split("T")[0]
  ); // Fecha seleccionada por defecto
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(""); // Hora seleccionada para la reserva
  const [reservas, setReservas] = useState([]); // Estado para las reservas del usuario
  const [error, setError] = useState(""); // Estado para manejar errores
  const [showModal, setShowModal] = useState(false); // Modal de confirmación
  const [modalMessage, setModalMessage] = useState(""); // Mensaje que muestra el modal
  const navigate = useNavigate(); // Hook para redirigir al usuario

  const horariosDisponibles = horarios; // Horarios disponibles para la reserva

  // Verifica si el usuario está logueado
  useEffect(() => {
    if (!usuarioLogueado) {
      navigate("/login"); // Si no está logueado, redirige al login
    } else {
      const usuario = usuarios.find((u) => u.id === usuarioLogueado.id);
      setNombreUsuario(usuario ? `${usuario.nombre} ${usuario.apellido}` : ""); // Establece el nombre del usuario logueado
    }

    // Cargar las reservas desde el localStorage cuando el componente se monta
    const reservasDelUsuario =
      JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(
      reservasDelUsuario.filter(
        (reserva) => reserva.usuarioId === usuarioLogueado.id
      )
    );
  }, [usuarioLogueado, navigate]);

  // Avanzar al paso 2
  const handleContinuarClick = () => {
    if (espacioSeleccionado) {
      setPasoActual(2); // Si se ha seleccionado una cancha, continúa al paso 2
    } else {
      setError("Por favor, selecciona un tipo de cancha para continuar.");
    }
  };

  // Guardar la reserva en el estado global (reservas) y mostrar el modal de confirmación
  const handleGuardarReserva = (nuevaReserva) => {
    // Agregar la nueva reserva al estado de reservas
    const nuevaLista = [...reservas, nuevaReserva];
    setReservas(nuevaLista); // Actualiza el estado de las reservas
    localStorage.setItem("reservas", JSON.stringify(nuevaLista)); // Guarda en el localStorage

    setModalMessage("¡Reserva guardada con éxito!");
    setShowModal(true);
  };

  return (
    <div className="reserva-container">
      <BarraNavegacion />
      <main className="main-container">
        <div className="header">
          <h1>Agenda tu Reservación</h1>
        </div>

        {/* Paso 1: Selección de cancha */}
        {pasoActual === 1 && (
          <CanchaSelector
            espacioSeleccionado={espacioSeleccionado}
            setEspacioSeleccionado={setEspacioSeleccionado}
            setNombreTipoCancha={setNombreTipoCancha}
          />
        )}

        {/* Paso 2: Selección de fecha y hora */}
        {pasoActual === 2 && (
          <ReservaFechaHoraSelector
            espacioSeleccionado={espacioSeleccionado} // Pasa el tipo de cancha seleccionado
            fechaSeleccionada={fechaSeleccionada}
            setFechaSeleccionada={setFechaSeleccionada}
            horariosDisponibles={horariosDisponibles}
            setHorarioSeleccionado={setHorarioSeleccionado}
            horarioSeleccionado={horarioSeleccionado}
            reservas={reservas} // Lista global de reservas
            setReservaConfirmada={handleGuardarReserva}
            setPasoActual={setPasoActual} // Permite volver al paso 1
            nombreTipoCancha={nombreTipoCancha} // Nombre del tipo de cancha para filtrar
            usuarioLogueado={usuarioLogueado} // Pasamos el usuario logueado para el id de la reserva
          />
        )}

        {/* Botón para continuar al siguiente paso */}
        {pasoActual === 1 && (
          <button className="btn-continuar" onClick={handleContinuarClick}>
            Continuar
          </button>
        )}
      </main>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal-overlay">
          <div className={`modal ${showModal ? "show" : ""}`}>
            <div className="modal-header">
              <h2>{error ? "Error" : "¡Reserva Confirmada!"}</h2>
              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              />
            </div>
            <div className="modal-body">{modalMessage}</div>
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

export default Reserva;
