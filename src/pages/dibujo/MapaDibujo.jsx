import React, { useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const center = {
  lat: 23.2315,
  lng: -106.42754,
};

const opcionesDibujo = {
  drawingControl: true,
  drawingControlOptions: {
    position: window.google?.maps.ControlPosition.TOP_CENTER,
    drawingModes: ["circle", "rectangle", "polygon"],
  },
  circleOptions: {
    fillColor: "#ff0000",
    fillOpacity: 0.3,
    strokeWeight: 2,
    clickable: false,
    editable: false,
    zIndex: 1,
  },
  rectangleOptions: {
    fillColor: "#0000ff",
    fillOpacity: 0.3,
    strokeWeight: 2,
    clickable: false,
    editable: false,
    zIndex: 1,
  },
  polygonOptions: {
    fillColor: "#00ff00",
    fillOpacity: 0.3,
    strokeWeight: 2,
    clickable: false,
    editable: false,
    zIndex: 1,
  },
};

const App = () => {
  const [circulos, setCirculos] = useState([]);
  const [rectangulos, setRectangulos] = useState([]);
  const [poligonos, setPoligonos] = useState([]);
  const drawingRef = useRef(null);

  const handleOverlayComplete = (e) => {
    const { type, overlay } = e;

    if (type === "circle") {
      const centro = overlay.getCenter().toJSON();
      const radio = overlay.getRadius();
      setCirculos((prev) => [...prev, { centro, radio }]);
    }

    if (type === "rectangle") {
      const bounds = overlay.getBounds();
      const ne = bounds.getNorthEast().toJSON();
      const sw = bounds.getSouthWest().toJSON();
      setRectangulos((prev) => [...prev, { ne, sw }]);
    }

    if (type === "polygon") {
      const path = overlay.getPath().getArray().map((latlng) => latlng.toJSON());
      setPoligonos((prev) => [...prev, path]);
    }

    overlay.setMap(null); // Borra la figura del mapa si no quieres que se quede
  };

  return (
  <>
    <div>
      <h2>Dibujo de Figuras en Google Maps</h2>
      <p>
        Se implementó una herramienta de dibujo que permite al usuario crear polígonos, círculos y rectángulos directamente sobre el mapa.
        Cada figura dibujada muestra sus coordenadas correspondientes, diferenciadas y agrupadas por tipo.
      </p>
      <p>
        Para esto, se utilizó la librería DrawingManager de Google Maps para habilitar el dibujo de las figuras. Al completar cada forma,
        se extraen sus coordenadas, que se almacenan en el estado y se presentan en la interfaz agrupadas y con estilos que resaltan cada sección.
        Favor de refrescar la página si no se muestra el mapa.
      </p>
    </div>

    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={["drawing"]}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <DrawingManager
          onLoad={(drawingManager) => (drawingRef.current = drawingManager)}
          onOverlayComplete={handleOverlayComplete}
          options={opcionesDibujo}
        />
      </GoogleMap>

      <div style={{ padding: "20px", fontSize: "1.2rem", fontFamily: "monospace" }}>
        {circulos.length > 0 && (
          <div style={{ marginBottom: "1rem", background: "#fde2e2", padding: "1rem", borderRadius: "10px" }}>
            <strong style={{ color: "#c0392b" }}>CIRCULOS:</strong>
            {circulos.map((c, i) => (
              <div key={i}>
                Centro: lat: {c.centro.lat}, lng: {c.centro.lng}, Radio: {c.radio.toFixed(2)} m
              </div>
            ))}
          </div>
        )}

        {rectangulos.length > 0 && (
          <div style={{ marginBottom: "1rem", background: "#d6eaf8", padding: "1rem", borderRadius: "10px" }}>
            <strong style={{ color: "#21618c" }}>RECTANGULOS:</strong>
            {rectangulos.map((r, i) => (
              <div key={i}>
                NE: lat: {r.ne.lat}, lng: {r.ne.lng} | SW: lat: {r.sw.lat}, lng: {r.sw.lng}
              </div>
            ))}
          </div>
        )}

        {poligonos.length > 0 && (
          <div style={{ marginBottom: "1rem", background: "#d5f5e3", padding: "1rem", borderRadius: "10px" }}>
            <strong style={{ color: "#1e8449" }}>POLIGONOS:</strong>
            {poligonos.map((p, i) => (
              <div key={i}>
                {p.map((point, idx) => (
                  <div key={idx}>
                    Punto {idx + 1}: lat: {point.lat}, lng: {point.lng}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </LoadScript>
  </>
);
};

export default App;