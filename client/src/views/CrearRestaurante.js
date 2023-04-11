import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CrearRestaurante() {
  const navigate = useNavigate();
  const params = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    foto: "",
  });

  useEffect(() => {
    if (params.id) {
      loadRestaurant(params.id);
      setIsEditing(true);
    }
  }, [params.id]);

  const loadRestaurant = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `http://localhost:8080/api/restaurantes/${id}`
      );
      const { results } = await response.json();
      setRestaurant({
        nombre: results[0].nombre,
        direccion: results[0].direccion,
        ciudad: results[0].ciudad,
        foto: results[0].foto,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createRestaurant = async (restaurant) => {
    try {
      const response = await fetch("http://localhost:8080/api/restaurantes", {
        method: "POST",
        body: JSON.stringify(restaurant),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRestaurant = async (restaurant) => {
    try {
      await fetch(`http://localhost:8080/api/restaurantes/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(restaurant),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (isEditing) {
      updateRestaurant(restaurant);
    } else {
      createRestaurant(restaurant);
    }

    setLoading(false);
    navigate("/");
  };

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  return (
    <div class="container">
      <Navbar />
      <div className="flex gap-3 items-center mb-4">
        <span class="uppercase font-bold text-sm">
          {isEditing ? "Restaurante existente" : "Nuevo restaurante"}
        </span>
        {loading && (
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-7 h-7 mr-2 text-gray-300 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <div class="mb-6">
              <label
                for="nombre"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Restaurante:
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="nombre"
                name="nombre"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre del restaurante"
                value={restaurant.nombre}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div class="mb-6">
                <label
                  for="direccion"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Dirección:
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="direccion"
                  name="direccion"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Dirección del restaurante"
                  value={restaurant.direccion}
                  required
                />
              </div>
              <div class="mb-6">
                <label
                  for="ciudad"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Ciudad:
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="ciudad"
                  name="ciudad"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Ciudad del restaurante"
                  value={restaurant.ciudad}
                  required
                />
              </div>
            </div>

            <div class="mb-6">
              <label
                for="url"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                URL:
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="foto"
                name="foto"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="URL del restaurante"
                value={restaurant.foto}
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                class="text-white w-1/2 mt-4 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 uppercase font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {isEditing ? "Editar restaurante" : "Registrar restaurante"}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              id="Layer_1"
              width="200"
              height="200"
              viewBox="0 0 64 64"
              enable-background="new 0 0 64 64"
            >
              <g>
                <path
                  fill="#808080"
                  d="M48,24h16V4c0-2.211-1.789-4-4-4H48V24z"
                />
                <rect x="24" fill="#808080" width="16" height="24" />
                <path
                  fill="#808080"
                  d="M16,24V0H4C1.789,0,0,1.789,0,4v20H16z"
                />
                <path
                  fill="#808080"
                  d="M4,32v28c0,2.211,1.789,4,4,4h16V44h16v20h16c2.211,0,4-1.789,4-4V32H4z"
                />
              </g>
            </svg>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CrearRestaurante;
