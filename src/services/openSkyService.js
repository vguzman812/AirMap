import axios from "axios";

const baseURL = "https://opensky-network.org/api/states/all";

// map the data from open sky to an object instead of a 2D array because why would they do that?
const getCleanedData = (data) => {
  if (!data.states) {
    return data;
  }
  const stateVectorData = {
    time: data.time,
    states: data.states.map((rawStateVector) => ({
      icao24: rawStateVector[0], // this is the ID to use
      callsign: rawStateVector[1],
      originCountry: rawStateVector[2],
      timePosition: rawStateVector[3],
      lastContact: rawStateVector[4],
      longitude: rawStateVector[5],
      latitude: rawStateVector[6],
      barometricAltitude: rawStateVector[7],
      onGround: rawStateVector[8],
      velocity: rawStateVector[9],
      trueTrack: rawStateVector[10],
      verticalRate: rawStateVector[11],
      sensors: rawStateVector[12],
      geoAltitude: rawStateVector[13],
      squawk: rawStateVector[14],
      spi: rawStateVector[15],
      positionSource: rawStateVector[16],
    })),
  };

  return stateVectorData;
};

// fetch the data from the OpenSky API
const getOpenSkyData = async () => {
  try {
    const response = await axios.get(baseURL);
    const stateVectors = getCleanedData(response.data);
    return stateVectors;
  } catch (error) {
    console.error("Error fetching OpenSky data:", error);
    throw error;
  }
};

function getTypeOfAircraft(category) {
  switch (category) {
    case 0:
      return "N/A";
    case 1:
      return "N/A";
    case 2:
      return "Light (< 15500 lbs)";
    case 3:
      return "Small (15500 to 75000 lbs)";
    case 4:
      return "Large (75000 to 300000 lbs)";
    case 5:
      return "High Vortex Large (aircraft such as B-757)";
    case 6:
      return "Heavy (> 300000 lbs)";
    case 7:
      return "High Performance (> 5g acceleration and 400 kts)";
    case 8:
      return "Rotorcraft";
    case 9:
      return "Glider / sailplane";
    case 10:
      return "Lighter-than-air";
    case 11:
      return "Parachutist / Skydiver";
    case 12:
      return "Ultralight / hang-glider / paraglider";
    case 13:
      return "Reserved";
    case 14:
      return "Unmanned Aerial Vehicle";
    case 15:
      return "Space / Trans-atmospheric vehicle";
    case 16:
      return "Surface Vehicle – Emergency Vehicle";
    case 17:
      return "Surface Vehicle – Service Vehicle";
    case 18:
      return "Point Obstacle (includes tethered balloons)";
    case 19:
      return "Cluster Obstacle";
    case 20:
      return "Line Obstacle";
    default:
      return "Unknown Category";
  }
}

export { getOpenSkyData, getCleanedData, getTypeOfAircraft };
