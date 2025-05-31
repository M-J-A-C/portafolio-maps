import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  MarkerClustererF,
  InfoWindowF,
} from "@react-google-maps/api";
import { Typography } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const center = {
  lat: 23.2315,
  lng: -106.42754,
};

const puntos = [
  { lat: 23.2414, lng: -106.4522, nombre: "Galerías Mazatlán" },
  { lat: 23.239428, lng: -106.438359, nombre: "Gran Plaza Mazatlán" },
  { lat: 23.236063, lng: -106.440058, nombre: "Malecón de Mazatlán" },
  { lat: 23.187784, lng: -106.424386, nombre: "El mirador" },
  { lat: 23.177585, lng: -106.428122, nombre: "Mirador de Cristal" },
  { lat: 23.279038, lng: -106.449507, nombre: "Liverpool Galerías" },
  { lat: 23.228928, lng: -106.427616, nombre: "Gran Acuario Mazatlán" },
  { lat: 23.21157, lng: -106.42155, nombre: "Monumento al Pescador" },
  { lat: 23.2315, lng: -106.42654, nombre: "Facultad de Informática UAS" },
  { lat: 23.276899, lng: -106.382460, nombre: "Estadio del Mazatlán FC" },
  { lat: 23.19835, lng: -106.42321, nombre: "Plazuela Machado" },
];

const MapaClusters = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (loadError) {
    return <div>Error al cargar el mapa</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Clustering de Marcadores con InfoWindows
      </Typography>
      <Typography paragraph>
        Se implementó una herramienta de dibujo que permite al usuario crear polígonos, círculos y rectángulos directamente sobre el mapa.
        Cada figura dibujada muestra sus coordenadas correspondientes, diferenciadas y agrupadas por tipo.
      </Typography>

      <Typography paragraph>
        Para esto, se utilizó la librería DrawingManager de Google Maps para habilitar el dibujo de las figuras. Al completar cada forma,
        se extraen sus coordenadas, que se almacenan en el estado y se presentan en la interfaz agrupadas y con estilos que resaltan cada sección.
      Favor de refrescar la página si no se muestra el mapa.
      </Typography>
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
      >
        <MarkerClustererF>
          {(clusterer) =>
            puntos.map((pos, index) => (
              <MarkerF
                key={index}
                position={{ lat: pos.lat, lng: pos.lng }}
                clusterer={clusterer}
                title={pos.nombre}
                onClick={() => setSelectedMarker(pos)}
              />
            ))
          }
        </MarkerClustererF>

        {selectedMarker && (
          <InfoWindowF
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <strong>{selectedMarker.nombre}</strong>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapaClusters;
