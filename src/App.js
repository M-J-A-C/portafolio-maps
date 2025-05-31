import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/homepage/Home";
import About from "./pages/homepage/About";
import Contact from "./pages/homepage/Contact";
import Contador from "./pages/contador/Contador";
import TablaUsuarios from "./pages/tabla/TablaUsuarios";
import UsuariosAPI from "./pages/usuarios-api/UsuariosAPI";
import Mapa from "./pages/mapa-basico/Mapa";
import Rutas from "./pages/rutas/Rutas";
import MapaDibujo from "./pages/dibujo/MapaDibujo";
import MapaClusters from "./pages/clusters/MapaClusters";
import AutocompletadoRutas from "./pages/autocompletado/AutocompletadoRutas";


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contador" element={<Contador />} />
          <Route path="/tabla" element={<TablaUsuarios />} />
          <Route path="/usuarios" element={<UsuariosAPI />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/rutas" element={<Rutas />} />
          <Route path="/dibujo" element={<MapaDibujo />} />
          <Route path="/clusters" element={<MapaClusters />} />
          <Route path="/autocompletado" element={<AutocompletadoRutas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


