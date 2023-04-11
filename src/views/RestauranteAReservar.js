import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function RestauranteAReservar() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  const loadRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/restaurantes/");
      const { restaurantes } = await response.json();
      setRestaurants(restaurantes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <div className="container">
      <Navbar />
      {restaurants.length ? (
        <>
          <span class="uppercase font-bold text-sm mb-5">Restaurantes</span>

          <div className="grid grid-cols-2 mt-5 mb-5 w-full gap-5">
            {restaurants.map((restaurante) => (
              <div class="p-6 bg-white justify-start border border-gray-200 rounded-lg shadow">
                <h5 class="mb-4 text-2xl font-bold tracking-tight text-gray-900">
                  {restaurante.nombre}
                </h5>
                <div class="mb-2 font-normal text-gray-500">
                  <div className="flex gap-3 mb-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.0"
                      id="Layer_1"
                      width="20"
                      height="20"
                      viewBox="0 0 64 64"
                      enable-background="new 0 0 64 64"
                    >
                      <path
                        fill="#808080"
                        d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24  C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24  C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
                      />
                    </svg>
                    <span>{restaurante.direccion}</span>
                  </div>
                  <div className="flex gap-3 mb-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.0"
                      id="Layer_1"
                      width="20"
                      height="20"
                      viewBox="0 0 64 64"
                      enable-background="new 0 0 64 64"
                    >
                      <path
                        fill="#808080"
                        d="M32,0C14.328,0,0,14.328,0,32s14.328,32,32,32s32-14.328,32-32S49.672,0,32,0z M52.812,20.078  c-2.293,1.973-4.105,3.762-7.457,3.887c-2.562,0.094-4.445,0.105-6.359-1.598c-2.727-2.477-0.859-5.777-0.758-9.504  C38.273,11.43,38.512,10.18,38.824,9C44.789,10.766,49.773,14.789,52.812,20.078z M9.867,41.289c2.09-2.031,5.508-3.109,7.949-5.816  c2.492-2.785,2.41-7.836,6.129-7.375c3.039,0.422,2.5,4.23,4.906,6.125c2.836,2.266,6.328,0.824,8.59,3.676  c2.969,3.77,2.277,8.066,0,12.293c-1.676,3.055-3.836,4.137-6.723,5.742C21.316,55.438,13.34,49.555,9.867,41.289z"
                      />
                    </svg>
                    <span>{restaurante.ciudad}</span>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/reservar-mesa/${restaurante._id}`)
                    }
                    class="inline-flex mt-3 items-center px-3 py-2 text-sm w-full justify-center font-medium text-center text-white bg-amber-800 rounded-lg hover:bg-amber-900 no-underline"
                  >
                    Reservar una mesa
                    <svg
                      aria-hidden="true"
                      class="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <span class="uppercase font-bold text-sm">
          No hay restaurantes para reservar
        </span>
      )}
    </div>
  );
}

export default RestauranteAReservar;
