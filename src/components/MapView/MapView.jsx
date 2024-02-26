/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import {
  Typography,
  Grid,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import InfoPanel from "../InfoPanel/InfoPanel";
import Pin from "./PlaneIcons/Pin";
import { getOpenSkyData } from "@/services/openSkyService";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function MapView() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [flightData, setFlightData] = useState(null);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  // Function to toggle the control panel visibility
  const toggleInfoPanel = () => {
    setIsInfoPanelOpen(!isInfoPanelOpen);
  };

  // fetch data from OpenSky API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getOpenSkyData();
        setFlightData(data.states);
        console.log("finished fetching");
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setSnackbarMessage(
          `Failed to load data from OpenSky API. ${error.message}` ||
            "An unexpected error occurred.",
        );
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
          }}
        >
          <Pin grounded={plane.on_ground} verticalRate={plane.verticalRate} />
        </Marker>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

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
          <GeolocateControl
            position="top-left"
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation="true"
          />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />

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
        onClick={() => navigate("/")}
        style={{ position: "absolute", top: 10, right: 250 }}
        color="error"
      >
        Home
      </Button>
    </div>
  );
}

export default MapView;
