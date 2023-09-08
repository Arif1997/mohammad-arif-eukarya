import { allIndianCities } from "../data/indian-cities";
import { WeatherData, WeatherState } from "../interfaces";
const map_api_key = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
export const getCityFromCoordinates = async (
  lat: number,
  lon: number
): Promise<string> => {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=locality&key=${map_api_key}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const extractCityName = (text: string) => {
      const match = text.replace(/^.{9}/g, "").replace(/,.*/g, "");
      return match.trim();
    };

    const cityName = extractCityName(data.plus_code.compound_code);

    return cityName;
  } catch (error) {
    console.error("Error:", error);
    return "Unknown";
  }
};

const open_wheather_api_id = import.meta.env.VITE_OPEN_WHEATHER_APIA_ID;
export const getWeatherData = async (
  lat: number,
  lon: number
): Promise<WeatherState | null> => {
  const openWheatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${open_wheather_api_id}`;

  try {
    const response = await fetch(openWheatherURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
const weath: WeatherData[] = [];
export const getWeatherDataForAllCities = async () => {
  allIndianCities.slice(0, 100).map(async (city) => {
    const openWheatherURL = `http://api.weatherapi.com/v1/current.json?key=0c8d18d7b38c4112bcb165551230609&q=${city.name}&aqi=no`;

    try {
      const response = await fetch(openWheatherURL);
      const data = await response.json();
      weath.push(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  });
  return weath;
};
