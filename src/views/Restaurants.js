import React from "react";
import Navbar from "../components/Navbar";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TablaRestaurantes from "../components/TablaRestaurantes";

function Restaurants() {
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

  const sendSearch = async (search) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/restaurantes/${search}`
      );
      const { results } = await response.json();
      setRestaurants(results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.value) {
      sendSearch(e.target.value);
    } else {
      loadRestaurants();
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <span class="uppercase font-bold text-sm">Restaurantes</span>
      <div class="pb-4 bg-white mt-4 flex justify-between">
        <div class="relative mt-1">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            onChange={handleChange}
            type="text"
            id="table-search"
            class="block py-2 pl-10 text-sm text-gray-900 focus:ring-blue-400 focus:border-blue-400 border border-gray-300 rounded-lg w-96 bg-gray-50 "
            placeholder="Buscar restaurante"
          />
        </div>
        <button
          onClick={() => navigate("/restaurantes")}
          class="inline-flex uppercase items-center px-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            class="w-5 h-5"
          >
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="Edit / Add_Plus">
                {" "}
                <path
                  id="Vector"
                  d="M6 12H12M12 12H18M12 12V18M12 12V6"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
              </g>{" "}
            </g>
          </svg>
          Restaurante
        </button>
      </div>
      {restaurants.length ? (
        <TablaRestaurantes
          setRestaurants={setRestaurants}
          restaurants={restaurants}
        />
      ) : (
        <div className="flex justify-center mt-4">
          <span className="font-semibold italic">No se encontraron restaurantes</span>
        </div>
      )}
    </div>
  );
}

export default Restaurants;
