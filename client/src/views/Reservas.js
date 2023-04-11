import React from "react";
import Navbar from "../components/Navbar";

import { useState, useEffect } from "react";
import TablaReservas from "../components/TablaReservas";

function Reservas() {
  const [reservas, setReservas] = useState([]);

  const loadReservas = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/reservas/");
      const { reservas } = await response.json();
      setReservas(reservas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadReservas();
  }, []);

  return (
    <div className="container">
      <Navbar />
      {reservas.length ? (
        <TablaReservas reservas={reservas} />
      ) : (
        <span class="uppercase font-bold text-sm">
          No se encontraron reservas
        </span>
      )}
    </div>
  );
}

export default Reservas;
