import GoogleMapReact from "google-map-react";
import {
  getCityFromCoordinates,
  getWeatherData,
} from "../utils/geocodingService";
import { useState } from "react";
import "../css/map.css";
import { handleApiLoaded } from "../services";
// import { allIndianCities } from "../data/indian-cities";
import { MapMarkerProps } from "../interfaces";
import WheatherIcon from "../components/weather-icon";

const AnyReactComponent: React.FC<MapMarkerProps> = ({ text }) => {
  return (
    <div
      style={{
        color: "red",
        width: "100px",
        height: "100px",
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {text} <WheatherIcon />
    </div>
  );
};

export default function Map() {
  const defaultProps = {
    center: {
      lat: 10.99,
      lng: 77.01,
    },
    zoom: 10,
  };

  const [cityName, setCityName] = useState("");
  const [wheather, setWeather] = useState({});

  const [mapOptions, setMapOptions] = useState({
    mapTypeId: "roadmap", // Default to roadmap view
  });

  //this function is created to receive lat and lon and api call to open weather and city name
  const handleCoordinates = async (lat: number, lon: number) => {
    try {
      const city = await getCityFromCoordinates(lat, lon);
      setCityName(city);
      const weather = await getWeatherData(lat, lon);
      setWeather(weather);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleMapView = () => {
    //This function is created to Toggle between satellite and roadmap views
    const newMapTypeId =
      mapOptions.mapTypeId === "roadmap" ? "satellite" : "roadmap";
    setMapOptions({ ...mapOptions, mapTypeId: newMapTypeId });
  };

  return (
    <>
      <main className="map__page">
        <button className="toggle__map" onClick={toggleMapView}>
          views
        </button>
        <div style={{ flex: 1 }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: `${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`,
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            options={mapOptions}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            onClick={(event) => {
              handleCoordinates(event.lat, event.lng);
            }}
          >
            <AnyReactComponent lat={28.63} lng={28.63} text="sunny" />
          </GoogleMapReact>
        </div>

        <section className="weather__wedget">
          <p style={{ fontSize: "1.2rem", textAlign: "center" }}>{cityName}</p>
          <p>Latitude: {wheather && wheather?.coord?.lat.toFixed(2)}</p>
          <p>Latitude: {wheather && wheather?.coord?.lat.toFixed(2)}</p>
          <p>Humidity: {wheather && wheather?.main?.humidity}</p>
          <p>Temperature: {wheather && parseInt(wheather?.main?.temp)}</p>
        </section>
      </main>
    </>
  );
}
