/* eslint-disable import/no-extraneous-dependencies */
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useMemo } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import ControlPanel from "../ControlPanel/ControlPanel";

// TODO: Change this to have the proper pins (airplanes and stuff)
import Pin from "./PlaneIcons/Pin";

// TODO: Change this to grab data from the OpenSky API
import CITIES from "./cities.json";

function MapView() {
  const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
		// TODO: Change this to not use index as key
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    [],
  );
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        // className="mapView"
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
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

{/* Change the popupInfo to better represent the data given by the OpenSky API */}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{" "}
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>
      <ControlPanel />
    </div>
  );
}

export default MapView;
