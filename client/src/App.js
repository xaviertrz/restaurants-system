import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Restaurants from "./views/Restaurants";
import CrearRestaurante from "./views/CrearRestaurante";
import Reservacion from "./views/Reservacion";
import Reservas from "./views/Reservas";

import "./App.css";
import RestauranteAReservar from "./views/RestauranteAReservar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Restaurants />}></Route>
          <Route path="/restaurantes/" element={<CrearRestaurante />}></Route>
          <Route
            path="/restaurantes/:id"
            element={<CrearRestaurante />}
          ></Route>
          <Route path="/reservar-mesa/:id" element={<Reservacion />}></Route>
          <Route path="/reservas" element={<Reservas />}></Route>
          <Route
            path="/elegir-restaurante"
            element={<RestauranteAReservar />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
