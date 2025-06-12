import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { canchas, usuarios } from "../../datos/datos"; // Traemos los datos
import { useAuth } from "../../context/AuthContext"; // Usamos el contexto para verificar si el usuario está logueado
import BarraNavegacion from "../../componentes/Navbar"; // Importamos la barra de navegación
import "./MisReservas.css";

export const MisReservas = () => {
  const { usuarioLogueado } = useAuth(); // Obtiene el estado de autenticación
  const [reservasUsuario, setReservasUsuario] = useState([]); // Estado para las reservas del usuario
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null); // Estado para el usuario autenticado
  const [estadoFiltro, setEstadoFiltro] = useState(""); // Filtro por estado de reserva
  const [fechaFiltro, setFechaFiltro] = useState(""); // Filtro por fecha
  const [mensajeError, setMensajeError] = useState(""); // Mensaje de error o advertencia
  const [mensajeExito, setMensajeExito] = useState(""); // Mensaje de éxito
  const [showNotification, setShowNotification] = useState(false); // Estado para mostrar la notificación
  const navigate = useNavigate(); // Hook para redirigir al login

  // Cargar las reservas desde el localStorage cuando el componente se monta
  useEffect(() => {
    if (!usuarioLogueado) {
      navigate("/login"); // Si el usuario no está logueado, lo redirigimos al login
    } else {
      const usuario = usuarios.find((u) => u.id === usuarioLogueado.id);
      setUsuarioAutenticado(usuario); // Establecemos el usuario autenticado
    }
  }, [usuarioLogueado, navigate]);

  useEffect(() => {
    if (usuarioAutenticado) {
      const reservasDelUsuario =
        JSON.parse(localStorage.getItem("reservas")) || [];
      const reservasFiltradas = reservasDelUsuario.filter(
        (reserva) => reserva.usuarioId === usuarioAutenticado.id
      );

      // Ordenar las reservas por la fecha de la más reciente a la más antigua
      reservasFiltradas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar por fecha descendente (última reserva primero)

      setReservasUsuario(reservasFiltradas); // Establecemos las reservas del usuario en el estado
    }
  }, [usuarioAutenticado]);

  // Filtrar por estado
  const reservasFiltradas = reservasUsuario.filter((reserva) =>
    estadoFiltro ? reserva.estado === estadoFiltro : true
  );

  // Filtrar por fecha
  const reservasFiltradasPorFecha = reservasFiltradas.filter((reserva) => {
    if (fechaFiltro) {
      return reserva.fecha === fechaFiltro;
    }
    return true;
  });

  // Contar las reservas por estado
  const contarReservasPorEstado = () => {
    const estados = { confirmadas: 0, canceladas: 0 };
    reservasUsuario.forEach((reserva) => {
      if (reserva.estado === "Reservada") estados.confirmadas++;
      if (reserva.estado === "Cancelada") estados.canceladas++;
    });
    return estados;
  };

  const estadisticas = contarReservasPorEstado();

  // Guardar las reservas en el localStorage después de cada cambio
  const guardarReservasEnLocalStorage = (reservas) => {
    localStorage.setItem("reservas", JSON.stringify(reservas));
  };

  // Cancelar reserva
  const handleCancelarReserva = (reserva) => {
    const fechaHoy = new Date().toISOString().split("T")[0];
    if (reserva.fecha < fechaHoy) {
      setMensajeError(
        "No puedes cancelar reservas de fechas anteriores a hoy."
      );
      setMensajeExito(""); // Limpiar éxitos
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setMensajeError("");
      }, 5000);
    } else {
      const nuevaLista = reservasUsuario.map((reservaItem) => {
        if (reservaItem.id === reserva.id) {
          return { ...reservaItem, estado: "Cancelada" };
        }
        return reservaItem;
      });
      setReservasUsuario(nuevaLista);
      guardarReservasEnLocalStorage(nuevaLista); // Guardar en localStorage
      setMensajeExito("Reserva cancelada exitosamente.");
      setMensajeError(""); // Limpiar errores
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setMensajeExito("");
      }, 5000);
    }
  };

  // Función para agregar una nueva reserva
  const handleAgregarReserva = (nuevaReserva) => {
    const nuevaLista = [...reservasUsuario, nuevaReserva];
    setReservasUsuario(nuevaLista); // Actualiza el estado de reservas
    guardarReservasEnLocalStorage(nuevaLista); // Guarda las reservas en localStorage
    setMensajeExito("Reserva realizada con éxito.");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setMensajeExito("");
    }, 5000);
  };

  return (
    <div>
      <BarraNavegacion />
      <div className="mis-reservas-container">
        {/* Notificaciones de error o éxito */}
        {showNotification && mensajeError && (
          <div className="notification error">
            <p>{mensajeError}</p>
          </div>
        )}
        {showNotification && mensajeExito && (
          <div className="notification success">
            <p>{mensajeExito}</p>
          </div>
        )}

        <div className="content-container">
          {/* Estadísticas de reservas */}
          <div className="estadisticas">
            <div className="estadisticas-item">
              <h3>Total Reservas</h3>
              <p>{reservasUsuario.length}</p>
            </div>
            <div className="estadisticas-item">
              <h3>Reservadas</h3>
              <p>{estadisticas.confirmadas}</p>
            </div>
            <div className="estadisticas-item">
              <h3>Canceladas</h3>
              <p>{estadisticas.canceladas}</p>
            </div>
          </div>

          <div className="filters-and-table">
            {/* Filtro por estado y fecha */}
            <div className="filters">
              <div className="filtro">
                <label htmlFor="estadoFiltro">Filtrar por estado:</label>
                <select
                  id="estadoFiltro"
                  value={estadoFiltro}
                  onChange={(e) => setEstadoFiltro(e.target.value)}
                  className="filtro-select"
                >
                  <option value="">Todos</option>
                  <option value="Reservada">Reservada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>

              <div className="filtro">
                <label htmlFor="fechaFiltro">Filtrar por fecha:</label>
                <input
                  type="date"
                  id="fechaFiltro"
                  value={fechaFiltro}
                  onChange={(e) => setFechaFiltro(e.target.value)}
                  className="filtro-select"
                />
              </div>
            </div>

            {/* Tabla de reservas */}
            <div className="table-container">
              {reservasFiltradasPorFecha.length === 0 ? (
                <div className="alert-info">
                  <p>No tienes reservas aún.</p>
                  <Link to="/reserva" className="btn-new-reserva">
                    Hacer una nueva reserva
                  </Link>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Fecha</th>
                      <th scope="col">Hora</th>
                      <th scope="col">Lugar</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservasFiltradasPorFecha.map((reserva) => {
                      const canchaReservada = canchas.find(
                        (cancha) => cancha.id === reserva.canchaId
                      );
                      return (
                        <tr key={reserva.id}>
                          <td>{reserva.fecha}</td>
                          <td>{reserva.hora}</td>
                          <td>
                            {canchaReservada
                              ? canchaReservada.nombre
                              : "No Disponible"}
                          </td>
                          <td className={`estado ${reserva.estado}`}>
                            {reserva.estado}
                          </td>
                          <td>
                            <button
                              className="btn-cancelar"
                              onClick={() => handleCancelarReserva(reserva)}
                            >
                              Cancelar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisReservas;
