import React from "react";

function TablaReservas({ reservas = [] }) {
  return (
    <div class="relative overflow-x-auto shadow-md mb-20 sm:rounded-lg">
      <table class="w-full table-auto text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">
              Restaurante
            </th>
            <th scope="col" class="px-6 py-3">
              Fecha
            </th>
            <th scope="col" class="px-6 py-3">
              Mesa
            </th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr className="even:bg-gray-50 odd:bg-white border-b">
              <th
                scope="row"
                class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
              >
                {reserva.restaurante.nombre}
              </th>
              <td class="capitalize px-6 py-3">{reserva.fecha}</td>
              <td class="capitalize px-6 py-3">{reserva.mesa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaReservas;
