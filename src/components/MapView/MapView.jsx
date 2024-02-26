/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useMemo, useEffect } from "react";

import Map, { Popup } from "react-map-gl";

import { Typography, Grid, Button, CircularProgress } from "@mui/material";

import InfoPanel from "../InfoPanel/InfoPanel";
import useFlightData from "@/services/openSkyService";
import PlaneMarker from "../PlaneMarker/PlaneMarker";
import MapControl from "../MapControl/MapControl";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function MapView() {
  const [popupInfo, setPopupInfo] = useState(null);
  const { flightData, isLoading, error } = useFlightData();
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Function to toggle the control panel visibility
  const toggleInfoPanel = () => {
    setIsInfoPanelOpen(!isInfoPanelOpen);
  };

  // snackbar error handling
  useEffect(() => {
    if (error) {
      setSnackbarMessage(
        `Failed to load data from OpenSky API. ${error.message || "An unexpected error occurred."}`,
      );
      setSnackbarOpen(true);
    }
  }, [error]);

  // Memoize the pins to avoid unnecessary re-renders
  const pins = useMemo(
    () =>
      flightData?.map((plane) => (
        <PlaneMarker
          key={plane.icao24}
          plane={plane}
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(plane);
          }}
        />
      )),
    [flightData],
  );
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* If we are getting data from the api and loading the pins, then we show a spinner */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {/* snackbar and alert for error popups */}
      <ErrorSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />

      {!isLoading && (
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
          <MapControl position="top-left" />

          {pins}

          {/* a tooltip essentially for each plane */}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              onClose={() => setPopupInfo(null)}
            >
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{ mt: 2, mb: 2 }}
                  variant="body1"
                  component="div"
                >
                  Callsign: {popupInfo.callsign}
                </Typography>
                <Typography
                  sx={{ mt: 2, mb: 2 }}
                  variant="body1"
                  component="div"
                >
                  Origin country: {popupInfo.originCountry}
                </Typography>
                <Typography
                  sx={{ mt: 2, mb: 2 }}
                  variant="body1"
                  component="div"
                >
                  Velocity: {popupInfo.velocity} m/s
                </Typography>
                <Typography
                  sx={{ mt: 2, mb: 2 }}
                  variant="body1"
                  component="div"
                >
                  Altitude:{" "}
                  {popupInfo.barometricAltitude
                    ? popupInfo.barometricAltitude
                    : "N/A"}{" "}
                  meters
                </Typography>
              </Grid>{" "}
            </Popup>
          )}
        </Map>
      )}
      {isInfoPanelOpen && <InfoPanel />}
      {/* button to open the infopanel */}
      <Button
        variant="contained"
        onClick={toggleInfoPanel}
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        {isInfoPanelOpen ? "Hide Info Panel" : "Show Info Panel"}
      </Button>
      {/* Home button */}
      <Button
        variant="contained"
        href="/"
        style={{ position: "absolute", top: 10, right: 250 }}
        color="error"
      >
        Home
      </Button>
    </div>
  );
}

export default MapView;
