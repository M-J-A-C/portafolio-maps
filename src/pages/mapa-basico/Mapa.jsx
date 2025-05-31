import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Typography } from "@mui/material";

const center = {
  lat: 23.2315, 
  lng: -106.42654
};

const containerStyle = {
  width: "100%",
  height: "800px"
};

const Mapa = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Mapa Básico con Google Maps</Typography>
      <Typography paragraph>
        Este es un mapa básico centrado en Mazatlán. Se utiliza el componente <code>GoogleMap</code> proporcionado por la librería <code>@react-google-maps/api</code>,
        que permite integrar Google Maps en una aplicación React de forma sencilla.Favor de refrescar la página si no se muestra el mapa.
        Favor de refrescar la página si no se muestra el mapa.
      </Typography>

      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
          <Marker
            position={center}
            onClick={() => setSelected(center)}
          />
          {selected && (
            <InfoWindow position={selected} onCloseClick={() => setSelected(null)}>
              <div>
                <strong>¡Estás aquí, en la Universidad Autonoma de Sinaloa!</strong>
                <p>Mazatlán, Sinaloa</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Mapa;
