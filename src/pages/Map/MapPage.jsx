import React from "react";
import { Box } from "@mui/material";
import MapView from "../../components/MapView/MapView";

function MapPage() {
  return (
    <Box sx={{ position: "relative" }}>
      <MapView />
    </Box>
  );
}

export default MapPage;
