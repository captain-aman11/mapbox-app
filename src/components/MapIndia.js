import React, { useState, useEffect, useMemo } from "react";
import Map, { Source, Layer, FullscreenControl } from "react-map-gl";
import { accessToken } from "../config/config";
import { indiaGeoJSON } from "../config/geoJSON";
import { stateBorders, fillStates } from "./mapLayers";

function MapIndia() {
  //Controlled Map
  const [viewState, setViewState] = useState({
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 4,
  });

  //Map GeoJSON Data
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    indiaGeoJSON()
      .then((data) => setMapData(data))
      .catch((err) => console.error("Could not fetch geojson data", err));
  });

  const indiaGeoData = useMemo(() => {
    return mapData;
  }, [mapData]);

  //Hover Details
  const [hoverDetails, setHoverDetails] = useState(null);

  const handleMouseMove = (event) => {
    console.log(event);
    const {
      point: { x, y },
    } = event;

    if (features) {
      setHoverDetails({ ...features[0], x, y });
    }
  };

  const handleMouseLeave = (event) => {
    setHoverDetails(null);
  };

  return (
    <>
      <Map
        {...viewState}
        onMove={(e) => setViewState(e.viewState)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={accessToken}
      >
        <Source id="my-data" type="geojson" data={indiaGeoData}>
          <Layer {...fillStates} />
          <Layer {...stateBorders} />
        </Source>
        <ToolTip currentState={hoverDetails} />
        <FullscreenControl />
      </Map>
    </>
  );
}

function ToolTip({ currentState }) {
  return (
    <>
      <div
        className="tooltip"
        style={{
          left: parseFloat(currentState.x + 10),
          top: parseFloat(currentState.y + 10),
          position: "absolute",
          zIndex: 8,
          backgroundColor: "#fff",
          padding: "4px",
          transition: "all 0.7 ease-in-out",
        }}
      >
        <p>{`${currentState.properties.NAME_1}, ${currentState.properties.NAME_0}`}</p>
      </div>
    </>
  );
}

export default MapIndia;
