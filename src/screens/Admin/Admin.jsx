import React, { useState, useEffect } from "react";
import { canchas, usuarios, facultades, rolesSistema } from "../../datos/datos";
import { FaEdit } from "react-icons/fa"; // Icono de editar
import BarraNavegacion from "../../componentes/Navbar";
import "./Admin.css";

export const Admin = () => {
  // Estado para manejar la pestaña seleccionada
  const [selectedTab, setSelectedTab] = useState("canchas");

  // Estado para canchas
  const [canchasData, setCanchasData] = useState(canchas);
  const [editCanchaId, setEditCanchaId] = useState(null);
  const [canchaForm, setCanchaForm] = useState({
    nombre: "",
    ubicacion: "",
    estado: "disponible",
  });

  // Estado para usuarios
  const [usuariosData, setUsuariosData] = useState(usuarios);
  const [editUserId, setEditUserId] = useState(null);
  const [userForm, setUserForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    telefono: "",
    fechaNacimiento: "",
    Direccion: "",
    facultad: "",
    tipo: "usuario",
  });

  // Función para editar cancha
  const handleEditarCancha = (id) => {
    const cancha = canchasData.find((c) => c.id === id);
    setCanchaForm({
      nombre: cancha.nombre,
      ubicacion: cancha.ubicacion,
      estado: cancha.estado,
    });
    setEditCanchaId(id);
  };

  // Función para guardar los cambios de cancha
  const handleGuardarCanchaEditada = () => {
    const updatedCanchas = canchasData.map((cancha) =>
      cancha.id === editCanchaId
        ? { ...cancha, ...canchaForm } // Actualizar todos los campos de la cancha
        : cancha
    );
    setCanchasData(updatedCanchas);
    setEditCanchaId(null);
    setCanchaForm({
      nombre: "",
      ubicacion: "",
      estado: "disponible",
    });
  };

  // Función para manejar el cambio en los inputs de las canchas
  const handleChangeCancha = (e) => {
    const { name, value } = e.target;
    setCanchaForm({
      ...canchaForm,
      [name]: value,
    });
  };

  // Función para editar usuario
  const handleEditarUsuario = (id) => {
    const usuario = usuariosData.find((u) => u.id === id);
    setUserForm({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      contrasena: usuario.contrasena,
      telefono: usuario.telefono,
      fechaNacimiento: usuario.fechaNacimiento,
      Direccion: usuario.Direccion,
      facultad: usuario.facultad,
      tipo: usuario.tipo,
    });
    setEditUserId(id);
  };

  // Función para guardar los cambios de usuario
  const handleGuardarUsuarioEditado = () => {
    const updatedUsuarios = usuariosData.map((user) =>
      user.id === editUserId
        ? { ...user, ...userForm } // Actualizar todos los campos del usuario
        : user
    );
    setUsuariosData(updatedUsuarios);
    setEditUserId(null);
    setUserForm({
      nombre: "",
      apellido: "",
      correo: "",
      contrasena: "",
      telefono: "",
      fechaNacimiento: "",
      Direccion: "",
      facultad: "",
      tipo: "usuario",
    });
  };

  // Función para manejar el cambio en los inputs de los usuarios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  return (
    <div className="admin-container">
      <BarraNavegacion />
      <main className="admin-content">
        <div className="tabs-container">
          {["canchas", "usuarios"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`tab-button ${
                selectedTab === tab ? "active-tab" : ""
              }`}
            >
              {tab === "canchas" ? "Gestión de Canchas" : "Gestión de Usuarios"}
            </button>
          ))}
        </div>

        {selectedTab === "canchas" && (
          <section className="section-card">
            <h2>Gestión de Canchas</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    {["Nombre", "Ubicación", "Estado", "Acciones"].map(
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
                            <input
                              type="text"
                              name="nombre"
                              value={canchaForm.nombre}
                              onChange={handleChangeCancha}
                            />
                            <input
                              type="text"
                              name="ubicacion"
                              value={canchaForm.ubicacion}
                              onChange={handleChangeCancha}
                            />
                            <select
                              name="estado"
                              value={canchaForm.estado}
                              onChange={handleChangeCancha}
                            >
                              <option value="disponible">Disponible</option>
                              <option value="mantenimiento">
                                Mantenimiento
                              </option>
                            </select>
                            <button onClick={handleGuardarCanchaEditada}>
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
                          <button
                            onClick={() => handleEditarCancha(cancha.id)}
                            className="edit-button"
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
                      "Facultad",
                      "Tipo",
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
                            name="contrasena"
                            value={userForm.contrasena}
                            onChange={handleChange}
                          />
                        ) : (
                          usuario.contrasena
                        )}
                      </td>
                      <td className="table-cell">
                        {editUserId === usuario.id ? (
                          <select
                            name="facultad"
                            value={userForm.facultad}
                            onChange={handleChange}
                          >
                            {facultades.map((facultad, index) => (
                              <option key={index} value={facultad.nombre}>
                                {facultad.nombre}
                              </option>
                            ))}
                          </select>
                        ) : (
                          usuario.facultad
                        )}
                      </td>
                      <td className="table-cell">
                        {editUserId === usuario.id ? (
                          <select
                            name="tipo"
                            value={userForm.tipo}
                            onChange={handleChange}
                          >
                            {rolesSistema.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        ) : (
                          usuario.tipo
                        )}
                      </td>
                      <td className="table-cell text-right">
                        {editUserId === usuario.id ? (
                          <>
                            <button
                              onClick={handleGuardarUsuarioEditado}
                              className="action-button"
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
                            onClick={() => handleEditarUsuario(usuario.id)}
                            className="edit-button"
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
      </main>
    </div>
  );
};

export default Admin;
