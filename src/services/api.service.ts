import axios, { AxiosInstance } from "axios";
import config from "../config";
import { queryString } from "../utilities";
import { Location } from "../interfaces";

/*************************************************/
/* API SETUP */
/*************************************************/
const requestWeatherAPI: AxiosInstance = axios.create({
  baseURL: `http://${config.apiDomains.openWeatherMap.url}`,
  timeout: config.api.requestTimeout,
  headers: {
    "Content-Type": "application/json"
  }
});

/*************************************************/
/* REQUEST METHODS */
/*************************************************/
// Docs:
// - https://openweathermap.org/weather-data
// - https://openweathermap.org/current
function getWeatherRequest(options: Location) {
  const payload: string = "?" + queryString({
    APPID: config.apiDomains.openWeatherMap.apiKey,
    units: "metric",
    lat: options.coords.latitude,
    lon: options.coords.longitude,
  });

  return requestWeatherAPI.get(`weather${payload}`);
}

/*************************************************/
/* EXTERNAL METHODS */
/*************************************************/
export function getWeather(options: Location) {
  return getWeatherRequest(options).then((response: any) => {
    return (response.data);
  }).catch((error: any) => {
    return error;
  });
}
