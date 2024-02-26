import { Marker } from "react-map-gl";
import Pin from "./PlaneIcons/Pin";

export default function PlaneMarker({ plane, onClick }) {
  return (
    <Marker
      longitude={plane.longitude}
      latitude={plane.latitude}
      anchor="bottom"
      rotation={plane.trueTrack}
      onClick={onClick}
    >
      <Pin grounded={plane.on_ground} verticalRate={plane.verticalRate} />
    </Marker>
  );
}
