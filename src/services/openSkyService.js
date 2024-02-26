import axios from "axios";
import { useState, useEffect } from "react";

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
  const response = await axios.get(baseURL);
  const stateVectors = getCleanedData(response.data);
  return stateVectors;
};

// A custom hook that gives the component data about our API call
export default function useFlightData() {
  const [flightData, setFlightData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getOpenSkyData();
        setFlightData(data.states);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { flightData, isLoading, error };
}
