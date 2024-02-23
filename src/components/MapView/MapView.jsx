/* eslint-disable import/no-extraneous-dependencies */
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useMemo, useEffect } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import { Typography, Grid, Button } from "@mui/material";
import ControlPanel from "../InfoPanel/InfoPanel";
import Pin from "./PlaneIcons/Pin";
import { getOpenSkyData, getTypeOfAircraft } from "@/services/openSkyService";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function MapView({ center, zoom }) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [flightData, setFlightData] = useState(null);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);

  // Function to toggle the control panel visibility
  const toggleControlPanel = () => {
    setIsControlPanelOpen(!isControlPanelOpen);
  };

  // fetch data from OpenSky API
  useEffect(() => {
    getOpenSkyData().then((data) => {
      setFlightData(data.states);
    });
  }, []);

  // make all the pins for the planes. This is a memoized function so it only runs when the flightData changes
  const pins = useMemo(
    () =>
      flightData?.map((plane) => (
        <Marker
          key={plane.icao24}
          longitude={plane.longitude}
          latitude={plane.latitude}
          anchor="bottom"
          rotation={plane.trueTrack}
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(plane);
            console.log(plane);
          }}
        >
          <Pin grounded={plane.on_ground} verticalRate={plane.verticalRate} />
        </Marker>
      )),
    [flightData],
  );
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        mapboxAccessToken={TOKEN}
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        transitionDuration={200}
      >
        <GeolocateControl
          position="top-left"
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation="true"
        />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {/* TODO: Change the popupInfo to better represent the data given by the OpenSky API */}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 2, mb: 2 }} variant="body1" component="div">
                Callsign: {popupInfo.callsign}
              </Typography>
              <Typography sx={{ mt: 2, mb: 2 }} variant="body1" component="div">
                Origin country: {popupInfo.originCountry}
              </Typography>
              <Typography sx={{ mt: 2, mb: 2 }} variant="body1" component="div">
                Velocity: {popupInfo.velocity}
              </Typography>
              <Typography sx={{ mt: 2, mb: 2 }} variant="body1" component="div">
                Altitude:{" "}
                {popupInfo.barometricAltitude
                  ? popupInfo.barometricAltitude
                  : "N/A"}
              </Typography>
              <Typography sx={{ mt: 2, mb: 2 }} variant="body1" component="div">
                Aircraft Type: {getTypeOfAircraft(popupInfo.category)}
              </Typography>
            </Grid>{" "}
          </Popup>
        )}
      </Map>
      {isControlPanelOpen && <ControlPanel />}
      <Button
        variant="contained"
        onClick={toggleControlPanel}
        style={{ position: "absolute", top: 10, right: 10 }} // Position the button on the map
      >
        {isControlPanelOpen ? "Hide Info Panel" : "Show Info Panel"}
      </Button>
    </div>
  );
}

export default MapView;
