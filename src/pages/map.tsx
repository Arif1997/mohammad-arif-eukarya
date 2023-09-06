import GoogleMapReact from "google-map-react";

import {
  getCityFromCoordinates,
  getWeatherData,
} from "../utils/geocodingService";
import React, { useState } from "react";
import "../css/map.css";
import { MapMarkerProps } from "../interfaces";
import WheatherIcon from "../components/weather-icon";
import { handleApiLoaded, toggleMapView } from "../services";
import { WeatherState } from "../interfaces";
import { TbTemperatureCelsius } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureQuarter } from "react-icons/fa6";
import { PiWindFill } from "react-icons/pi";
import { CgCodeClimate } from "react-icons/cg";
import { MdOutlineDetails } from "react-icons/md";
import { BiSolidCity } from "react-icons/bi";

const AnyReactComponent: React.FC<MapMarkerProps> = React.memo(({ text }) => {
  return (
    <>
      {text} <WheatherIcon />
    </>
  );
});

export default function Map() {
  const del = {
    lat: 26.78,
    lng: 77.9,
  };
  const defaultProps = {
    center: del,
    zoom: 5,
  };

  const [cityName, setCityName] = useState("");
  const [wheather, setWeather] = useState<WeatherState | null>(null);
  const [mapOptions, setMapOptions] = useState({
    mapTypeId: "roadmap",
  });
  const [isCitySelected, setIsCitySelected] = useState(false);

  //this function is created to receive lat and lon and api call to open weather and city name
  const handleCoordinates = async (lat: number, lon: number) => {
    try {
      const city = await getCityFromCoordinates(lat, lon);
      setCityName(city);
      setIsCitySelected(true);
      const weather: WeatherState | null = await getWeatherData(lat, lon);
      setWeather(weather);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main className="map__page">
        <button
          className="toggle__map"
          onClick={() =>
            setMapOptions({
              ...mapOptions,
              mapTypeId: toggleMapView(mapOptions),
            })
          }
        >
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
            onGoogleApiLoaded={({ map, maps }) => {
              handleApiLoaded(map, maps);
            }}
            onClick={(event) => {
              handleCoordinates(event.lat, event.lng);
            }}
          >
            <AnyReactComponent lat={26.78} lng={77.9} text="sunny" />
          </GoogleMapReact>
        </div>

        <section
          className="weather__wedget"
          style={{ display: isCitySelected ? "block" : "none" }}
        >
          <p style={{ fontSize: "1.4rem", textAlign: "center" }}>
            <BiSolidCity size={30} /> {cityName}
          </p>
          <p>
            <CgCodeClimate size={30} />
            Wheather: {wheather && wheather.weather[0].main}
            <WheatherIcon />
          </p>
          <p>
            <WiHumidity size={30} /> Humidity:{" "}
            {wheather && wheather.main.humidity}
          </p>
          <p>
            <FaTemperatureQuarter size={30} />
            Temperature: {wheather && wheather.main.temp}{" "}
            <TbTemperatureCelsius size={30} />{" "}
          </p>
          <p>
            <PiWindFill size={30} /> Wind Speed:{" "}
            {wheather && wheather.wind.speed}
          </p>
          <p>
            <MdOutlineDetails size={30} /> Description:{" "}
            {wheather && wheather.weather[0].description}
          </p>
          <button onClick={() => setIsCitySelected(false)}>Close</button>
        </section>
      </main>
    </>
  );
}
