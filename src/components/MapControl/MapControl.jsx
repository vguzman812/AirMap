import {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";

export default function MapControl({ position }) {
  return (
    <>
      <GeolocateControl
        position={position}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation="true"
      />
      <FullscreenControl position={position} />
      <NavigationControl position={position} />
      <ScaleControl />
    </>
  );
}
