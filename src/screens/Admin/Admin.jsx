import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { canchas, reservas, usuarios } from "../../datos/datos";
import { useAuth } from "../../context/AuthContext";
import BarraNavegacion from "../../componentes/Navbar";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa"; // Importación de los iconos
import "./Admin.css";

export const Admin = () => {
  const { usuarioLogueado } = useAuth();
  const [selectedTab, setSelectedTab] = useState("canchas");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [canchasData, setCanchasData] = useState(canchas);
  const [usuariosData, setUsuariosData] = useState(usuarios);
  const [reservasData, setReservasData] = useState(reservas);
  const [editCanchaId, setEditCanchaId] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioLogueado || usuarioLogueado.tipo !== "administrador") {
      navigate("/login");
    }
  }, [usuarioLogueado, navigate]);

  const handleEliminarCancha = (id) => {
    const updatedCanchas = canchasData.filter((cancha) => cancha.id !== id);
    setCanchasData(updatedCanchas);
    setModalMessage("Cancha eliminada correctamente.");
    setShowModal(true);
  };

  const handleEditarCancha = (id) => setEditCanchaId(id);

  const handleGuardarCanchaEditada = (id, nombre, ubicacion, estado) => {
    const updatedCanchas = canchasData.map((cancha) =>
      cancha.id === id ? { ...cancha, nombre, ubicacion, estado } : cancha
    );
    setCanchasData(updatedCanchas);
    setEditCanchaId(null);
  };

  const handleEditarUsuario = (id) => setEditUserId(id);

  const handleGuardarUsuarioEditado = (
    id,
    nombre,
    apellido,
    correo,
    contrasena
  ) => {
    const updatedUsuarios = usuariosData.map((user) =>
      user.id === id ? { ...user, nombre, apellido, correo, contrasena } : user
    );
    setUsuariosData(updatedUsuarios);
    setEditUserId(null);
  };

  const reservasPorCancha = (canchaId) => {
    return reservasData.filter((reserva) => reserva.canchaId === canchaId);
  };

  return (
    <div className="admin-container">
      <BarraNavegacion />
      <main className="admin-content">
        <div className="tabs-container">
          {["canchas", "usuarios", "reservas"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`tab-button ${
                selectedTab === tab ? "active-tab" : ""
              }`}
            >
              {tab === "canchas"
                ? "Gestión de Canchas"
                : tab === "reservas"
                ? "Reservas"
                : "Usuarios"}
            </button>
          ))}
        </div>

        {selectedTab === "canchas" && (
          <section className="section-card">
            <div className="section-header">
              <h2 className="section-title">Gestión de Canchas</h2>
              <button className="add-cancha-button">
                <FaPlusCircle /> Agregar Cancha
              </button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    {["Nombre", "Edificio", "Estado", "Acciones"].map(
                      (header) => (
                        <th key={header} className="table-header">
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {canchasData.map((cancha) => (
                    <tr key={cancha.id}>
                      <td className="table-cell">{cancha.nombre}</td>
                      <td className="table-cell">{cancha.ubicacion}</td>
                      <td className="table-cell">{cancha.estado}</td>
                      <td className="table-cell text-right">
                        {editCanchaId === cancha.id ? (
                          <>
                            <button
                              className="action-button"
                              onClick={() =>
                                handleGuardarCanchaEditada(
                                  cancha.id,
                                  cancha.nombre,
                                  cancha.ubicacion,
                                  cancha.estado
                                )
                              }
                            >
                              <FaEdit /> Guardar
                            </button>
                            <button
                              onClick={() => setEditCanchaId(null)}
                              className="cancel-button"
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="delete-button"
                              onClick={() => handleEliminarCancha(cancha.id)}
                            >
                              <FaTrashAlt /> Eliminar
                            </button>
                            <button
                              onClick={() => handleEditarCancha(cancha.id)}
                              className="edit-button"
                            >
                              <FaEdit /> Editar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {selectedTab === "usuarios" && (
          <section className="section-card">
            <h2>Gestión de Usuarios</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    {[
                      "Nombre",
                      "Apellido",
                      "Correo",
                      "Contraseña",
                      "Acciones",
                    ].map((header) => (
                      <th key={header} className="table-header">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {usuariosData.map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="table-cell">{usuario.nombre}</td>
                      <td className="table-cell">{usuario.apellido}</td>
                      <td className="table-cell">{usuario.correo}</td>
                      <td className="table-cell">
                        {editUserId === usuario.id ? (
                          <input
                            type="password"
                            defaultValue={usuario.contrasena}
                            onBlur={(e) =>
                              handleGuardarUsuarioEditado(
                                usuario.id,
                                usuario.nombre,
                                usuario.apellido,
                                usuario.correo,
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          usuario.contrasena
                        )}
                      </td>
                      <td className="table-cell text-right">
                        {editUserId === usuario.id ? (
                          <>
                            <button
                              className="action-button"
                              onClick={() =>
                                handleGuardarUsuarioEditado(
                                  usuario.id,
                                  usuario.nombre,
                                  usuario.apellido,
                                  usuario.correo,
                                  usuario.contrasena
                                )
                              }
                            >
                              <FaEdit /> Guardar
                            </button>
                            <button
                              onClick={() => setEditUserId(null)}
                              className="cancel-button"
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <button
                            className="edit-button"
                            onClick={() => handleEditarUsuario(usuario.id)}
                          >
                            <FaEdit /> Editar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {selectedTab === "reservas" && (
          <section className="section-card">
            <h3>Reservas por Cancha</h3>
            {canchasData.map((cancha) => (
              <div key={cancha.id} className="reservas-container">
                <h4 className="cancha-title">{cancha.nombre}</h4>
                <table className="data-table">
                  <thead>
                    <tr>
                      {["Fecha", "Hora", "Usuario"].map((header) => (
                        <th key={header} className="table-header">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reservasPorCancha(cancha.id).map((reserva) => {
                      const usuario = usuarios.find(
                        (u) => u.id === reserva.usuarioId
                      );
                      return (
                        <tr key={reserva.id}>
                          <td className="table-cell">{reserva.fecha}</td>
                          <td className="table-cell">{reserva.hora}</td>
                          <td className="table-cell">
                            {usuario ? usuario.nombre : "No Disponible"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </section>
        )}
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Confirmación</h3>
            <p>{modalMessage}</p>
            <button
              className="modal-close-button"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
