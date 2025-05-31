import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";

const actividades = [
  { ruta: "/contador", nombre: "Implementación de useEffect en ReactContador" },
  { ruta: "/tabla", nombre: "Implementacion de Tablas en ReactTabla con MUI" },
  { ruta: "/usuarios", nombre: "Consumiendo una API de Usuarios con Fetch en React" },
  { ruta: "/mapa", nombre: "Implementacion con Google Maps" },
  { ruta: "/rutas", nombre: "Generar direcciones en Google Maps" },
  { ruta: "/clusters", nombre: "Implementación de Marker Clustering con Google Maps API en React" },
  { ruta: "/dibujo", nombre: "Mapa con Drawing Tools de Google Maps en React" },
  { ruta: "/autocompletado", nombre: "Rutas con Google Maps en React (Routes API Rendering)" },
  
];

const Home = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Bienvenido al Portafolio de Google Maps</Typography>
      <Typography variant="body1" gutterBottom>
        <h3>Alvarez Cazares Mariana Joandle</h3>
      </Typography>

      <List>
        {actividades.map((act, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={act.ruta}>
              <ListItemText primary={act.nombre} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Home;
