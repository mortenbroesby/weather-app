import Logger from "js-logger";
import axios, { AxiosInstance } from "axios";
import config from "../config";
import { queryString } from "../utilities";

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
function getWeatherRequest() {
  const payload: string = "?" + queryString({
    APPID: config.apiDomains.openWeatherMap.apiKey,
    q: "Amsterdam",
    units: "metric",
  });

  return requestWeatherAPI.get(`weather${payload}`);
}

/*************************************************/
/* EXTERNAL METHODS */
/*************************************************/
export function getWeather() {
  return getWeatherRequest().then((response: any) => {
    return (response.data);
  }).catch((error: any) => {
    return error;
  });
}
