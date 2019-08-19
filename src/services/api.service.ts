import axios, { AxiosInstance } from "axios";
import config from "../config";
import { queryString } from "../utilities";

import { Location, WeatherData } from "../interfaces";

import { WeatherModel } from "../models/weather.model";
import { ForecastModel } from "../models/forecast.model";

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

function getForecastRequest(options: Location) {
  const payload: string = "?" + queryString({
    APPID: config.apiDomains.openWeatherMap.apiKey,
    units: "metric",
    lat: options.coords.latitude,
    lon: options.coords.longitude,
  });

  return requestWeatherAPI.get(`forecast${payload}`);
}

/*************************************************/
/* EXTERNAL METHODS */
/*************************************************/
export async function getWeather(options: Location): Promise<WeatherData> {
  try {
    const currentWeather = await getWeatherRequest(options);
    const forecast = await getForecastRequest(options);

    return {
      currentWeather: new WeatherModel(currentWeather.data),
      forecastWeather: new ForecastModel(forecast.data),
    };
  } catch (error) {
    return error;
  }
}
