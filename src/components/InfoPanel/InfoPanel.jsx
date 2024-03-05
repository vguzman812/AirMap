import "./infoPanel.css";
import { Typography, Link, Card, CardContent, Button } from "@mui/material";

export default function InfoPanel() {
  return (
    <Card className="info-panel">
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          Made By Vincent Guzman
        </Typography>

        <Typography variant="body2">
          This application was created using the{" "}
          <Link href="https://openskynetwork.github.io/opensky-api/rest.html">
            OpenSky Network API
          </Link>{" "}
          and{" "}
          <Link href="https://visgl.github.io/react-map-gl/">React Map GL</Link>
        </Typography>
      </CardContent>

      <Button
        variant="outlined"
        href="https://www,github.com/vguzman812/airmap"
      >
        View Code ↗
      </Button>
    </Card>
  );
}
