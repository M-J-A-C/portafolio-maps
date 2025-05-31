import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer
} from "@react-google-maps/api";
import { TextField, Button, MenuItem, Typography, Stack } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "800px"
};

const center = {
  lat: 23.2494,
  lng: -106.4111
};

const Rutas = () => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [direccion, setDireccion] = useState(null);
  const [mostrarRuta, setMostrarRuta] = useState(false);
  const travelModeRef = useRef("DRIVING");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMostrarRuta(true);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Trazado de Ruta entre dos Puntos</Typography>
      <Typography paragraph>
        En este ejercicio se implementó el autocompletado de direcciones mediante Google Places, lo cual permite seleccionar fácilmente el origen y el destino de una ruta.
        Al presionar el botón "Trazar Ruta", se genera automáticamente el recorrido más eficiente entre ambos puntos utilizando el servicio DirectionsService de Google Maps.
        Favor de refrescar la página si no se muestra el mapa.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <TextField
            label="Origen"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Destino"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Modo"
            select
            defaultValue="DRIVING"
            onChange={(e) => (travelModeRef.current = e.target.value)}
            fullWidth
          >
            <MenuItem value="DRIVING">Coche</MenuItem>
            <MenuItem value="WALKING">Caminando</MenuItem>
            <MenuItem value="BICYCLING">Bicicleta</MenuItem>
          </TextField>
          <Button type="submit" variant="contained">Mostrar Ruta</Button>
        </Stack>
      </form>

      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {mostrarRuta && (
            <DirectionsService
              options={{
                destination: destino,
                origin: origen,
                travelMode: travelModeRef.current,
              }}
              callback={(res) => {
                console.log("Resultado del cálculo de ruta:", res);
                if (res.status === "OK") {
                    setDireccion(res);
                } else {
                    console.error("Error al calcular la ruta:", res);
                }
                }}
            />
          )}

          {direccion && (
  <>
    {console.log("Renderizando ruta...")}
        <DirectionsRenderer directions={direccion} />
    </>
    )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Rutas;
