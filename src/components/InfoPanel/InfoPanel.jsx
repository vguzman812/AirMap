import * as React from "react";
import "./infoPanel.css";
import { Typography } from "@mui/material";

export default function InfoPanel() {
  return (
    <div className="info-panel">
      <Typography variant="h6" component="h6">
        Made by Vincent Guzman{" "}
      </Typography>
      <Typography variant="body1" component="p">
        This application was created using the{" "}
        <Typography
          component="a"
          href="https://openskynetwork.github.io/opensky-api/rest.html"
        >
          OpenSky Network API
        </Typography>{" "}
        and{" "}
        <Typography component="a" href="https://visgl.github.io/react-map-gl/">
          React Map GL
        </Typography>
      </Typography>

      <Typography
        variant="a"
        component="a"
        href="https://www.github.com/vguzman812/airmap"
      >
        View Code ↗
      </Typography>
    </div>
  );
}
