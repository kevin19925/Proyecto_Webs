import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BarraNavegacion from "../../componentes/Navbar";
import CarruselHeroe from "../../componentes/HeroCarousel";
import PasosReserva from "../../componentes/ReservationSteps";
import { useAuth } from "../../context/AuthContext";
import "./Inicio.css";

export const Inicio = () => {
  const { usuarioLogueado } = useAuth();
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioLogueado) {
      setUserRole(usuarioLogueado.tipo);
    }
  }, [usuarioLogueado]);

  const handleReservaClick = () => {
    if (!usuarioLogueado) {
      navigate("/login");
    } else {
      if (userRole === "administrador") {
        navigate("/admin");
      } else {
        navigate("/reserva");
      }
    }
  };

  return (
    <div className="inicio-container">
      {/* Barra de navegación */}
      <BarraNavegacion usuarioLogueado={usuarioLogueado} />

      <div className="container">
        {/* Hero principal con Carousel */}
        <section className="hero-section">
          <div className="hero-text">
            <h1 className="hero-main-title">
              <span>Reserva Espacios</span>
              <span>Recreativos en la EPN</span>
            </h1>
            <div className="divider"></div>
            <p className="hero-description">
              Usa los espacios de recreación en la universidad sin
              restricciones, solo reserva el día y la hora en la que vas a
              utilizarlos, y disfruta junto a tus amigos.
            </p>
            <button onClick={handleReservaClick} className="btn-reserva">
              Reserva Ya!
            </button>
          </div>
          <CarruselHeroe />
        </section>

        {/* Sección de pasos para reservar */}
        <PasosReserva />
      </div>
    </div>
  );
};

export default Inicio;
