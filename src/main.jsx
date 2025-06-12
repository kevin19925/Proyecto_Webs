import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Importa el AuthProvider
import { Inicio } from "./screens/Inicio/Inicio";
import { Espacios } from "./screens/Espacios/Espacios";
import { Reserva } from "./screens/Reserva/Reserva";
import { Contactos } from "./screens/Contactos/Contactos";
import { Login } from "./screens/Login/Login";
import Registro from "./screens/Registro/Registro.jsx";
import { MisReservas } from "./screens/MisReservas/MisReservas";
import { Admin } from "./screens/Admin/Admin";
import RutaProtegida from "./componentes/RutaProtegida";
import "./main.css"; // Importa el archivo CSS aquí

// Crear el contenedor de la aplicación
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Envuelve toda la aplicación con el Router */}
    <Router>
      {/* Envuelve con AuthProvider para compartir el estado de autenticación */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/espacios" element={<Espacios />} />
          <Route
            path="/reserva"
            element={
              <RutaProtegida>
                <Reserva />
              </RutaProtegida>
            }
          />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/mis-reservas"
            element={
              <RutaProtegida>
                <MisReservas />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin"
            element={
              <RutaProtegida>
                <Admin />
              </RutaProtegida>
            }
          />

          {/* Ruta comodín para redirigir cuando la ruta no existe */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  </StrictMode>
);
