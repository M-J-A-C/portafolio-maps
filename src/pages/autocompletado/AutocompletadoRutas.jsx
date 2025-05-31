import React, { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer
} from "@react-google-maps/api";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const center = { lat: 23.2494, lng: -106.4111 };

const libraries = ["places"];

export default function AutocompletadoRutas() {
  const originRef = useRef(null);
  const destRef = useRef(null);

  const originAutocomplete = useRef(null);
  const destAutocomplete = useRef(null);

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [originPlace, setOriginPlace] = useState(null);
  const [destPlace, setDestPlace] = useState(null);
  const [directions, setDirections] = useState(null);
  const [requestDirections, setRequestDirections] = useState(false);

  // Inicializar Autocomplete SOLO después de que el script cargue
  useEffect(() => {
    if (scriptLoaded && window.google && originRef.current && destRef.current) {
      originAutocomplete.current = new window.google.maps.places.Autocomplete(originRef.current);
      originAutocomplete.current.setFields(["formatted_address", "geometry"]);
      originAutocomplete.current.addListener("place_changed", () => {
        const place = originAutocomplete.current.getPlace();
        setOriginPlace(place);
      });

      destAutocomplete.current = new window.google.maps.places.Autocomplete(destRef.current);
      destAutocomplete.current.setFields(["formatted_address", "geometry"]);
      destAutocomplete.current.addListener("place_changed", () => {
        const place = destAutocomplete.current.getPlace();
        setDestPlace(place);
      });
    }
  }, [scriptLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!originPlace || !originPlace.formatted_address || !destPlace || !destPlace.formatted_address) {
      alert("Por favor selecciona ambas direcciones desde las sugerencias.");
      return;
    }
    setRequestDirections(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Autocompletado de Direcciones
      </Typography>
      <Typography variant="body1" paragraph>
        Se implementó un formulario con dos campos que utilizan el servicio de Autocompletado de Google Places para facilitar la selección de origen y destino. Al enviar, se calcula y muestra la ruta en el mapa usando Google Directions.
      </Typography>

      <Typography variant="body1" paragraph>
        Para lograrlo, se cargaron las librerías "places" y "directions" de Google Maps. Se inicializaron los autocompletados para ambos campos y, al seleccionar ambos lugares, se pidió la ruta con DirectionsService, que luego se muestra con DirectionsRenderer. Se manejó el estado para actualizar y mostrar correctamente la ruta.
      Favor de refrescar la página si no se muestra el mapa. </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <TextField
            label="Origen"
            inputRef={originRef}
            fullWidth
            placeholder="Escribe el origen"
          />
          <TextField
            label="Destino"
            inputRef={destRef}
            fullWidth
            placeholder="Escribe el destino"
          />
          <Button type="submit" variant="contained">
            Calcular Ruta
          </Button>
        </Stack>
      </form>

      <LoadScript
            googleMapsApiKey="AIzaSyA7vo-244iwYFLf5aTKKjr6ylsPmMHcfI0"
            libraries={libraries}
            onLoad={() => setScriptLoaded(true)}
          >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {requestDirections && originPlace && destPlace && (
            <DirectionsService
              options={{
                origin: originPlace.formatted_address,
                destination: destPlace.formatted_address,
                travelMode: "DRIVING",
              }}
              callback={(result, status) => {
                if (status === "OK") {
                  setDirections(result);
                } else {
                  alert("Error al calcular ruta: " + status);
                }
                setRequestDirections(false);
              }}
            />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}
