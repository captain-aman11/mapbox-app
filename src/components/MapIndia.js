import React, { useState, useEffect, useMemo } from "react";
import Map, { Source, Layer, FullscreenControl } from "react-map-gl";
import { accessToken } from "../config/config";
import { indiaGeoJSON } from "../config/geoJSON";
import { stateBorders, fillStates } from "./mapLayers";
import ToolTip from "./ToolTip";

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
      features,
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
        interactiveLayerIds={["fill-states"]}
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

export default MapIndia;
