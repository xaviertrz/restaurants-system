import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Reservacion() {
  const params = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    mesas: "",
    foto: "",
  });

  const [reservacion, setReservacion] = useState({
    mesa: "",
    fecha: "",
    restaurante: params.id,
  });

  const loadRestaurant = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/restaurantes/${id}`
      );
      const { results } = await response.json();
      setRestaurant({
        nombre: results[0].nombre,
        direccion: results[0].direccion,
        ciudad: results[0].ciudad,
        mesas: results[0].mesas,
        foto: results[0].foto,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const reservar = async (reservacion) => {
    try {
      const response = await fetch("http://localhost:8080/api/reservas", {
        method: "POST",
        body: JSON.stringify(reservacion),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { msg, errors } = await response.json();
      console.log(msg);

      if (msg) navigate("/reservas");
      console.log(errors);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reservar(reservacion);
  };

  useEffect(() => {
    loadRestaurant(params.id);
  }, [params.id]);

  const handleChange = (e) => {
    setReservacion({
      ...reservacion,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div class="container">
      <Navbar />
      <span class="uppercase font-bold text-sm">Reservación</span>
      <div className="w-1/3 m-auto mt-4">
        <div className="text-center text-sm">
          <p class="uppercase font-bold text-base">{restaurant.nombre}</p>
          <p className="-mt-4">{restaurant.direccion}</p>
          <p className="-mt-4">{restaurant.ciudad}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="gap-4">
            <div className="mt-4">
              <label
                for="nombre"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha:
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="fecha"
                name="fecha"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="dd/mm/yyyy"
                required
              />
              <button
                type="submit"
                class="text-white mt-3 w-full bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-blue-300 uppercase font-medium rounded-lg text-sm h-10 text-center"
              >
                Reservar una mesa
              </button>
            </div>
          </div>
        </form>
        <div className="flex items-center mt-4 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            id="Layer_1"
            width="100"
            height="100"
            viewBox="0 0 64 64"
            enable-background="new 0 0 64 64"
          >
            <path
              fill="#808080"
              d="M62.823,6.826c1.145-1.145,1.488-2.863,0.867-4.359c-0.617-1.496-2.077-2.469-3.694-2.469H4.001  c-1.617,0-3.078,0.973-3.695,2.469c-0.621,1.496-0.277,3.214,0.867,4.359l26.826,26.826v22.35h-8C17.789,56.001,16,57.79,16,60  c0,2.203,1.789,4,3.999,4h23.998c2.211,0,4-1.797,4-4c0-2.21-1.789-3.999-4-3.999h-7.999v-22.35L62.823,6.826z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Reservacion;
