import React from "react";
import { useNavigate } from "react-router-dom";

function TablaRestaurantes({ setRestaurants, restaurants = [] }) {
  const navigate = useNavigate();

  const deleteRestaurant = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/restaurantes/${id}`, {
        method: "DELETE",
      });
      setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full table-auto text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">
              Restaurante
            </th>
            <th scope="col" class="px-6 py-3">
              Dirección
            </th>
            <th scope="col" class="px-6 py-3">
              Ciudad
            </th>
            <th scope="col" class="px-6 py-3">
              Imagen URL
            </th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurante) => (
            <tr className="even:bg-gray-50 odd:bg-white border-b">
              <th
                scope="row"
                class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
              >
                {restaurante.nombre}
              </th>
              <td class="capitalize px-6 py-3">{restaurante.direccion}</td>
              <td class="capitalize px-6 py-3">{restaurante.ciudad}</td>
              <td class="px-6 py-3 flex gap-5 justify-between items-center">
                <span>{restaurante.foto}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/restaurantes/${restaurante._id}`)}
                    class="inline-flex items-center px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteRestaurant(restaurante._id)}
                    class="inline-flex items-center px-2 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaRestaurantes;
