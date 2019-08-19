import { WeatherModel } from "../models/weather.model";
import { ForecastModel } from "../models/forecast.model";

/*************************************************/
/* INTERFACES & DEFINITIONS */
/*************************************************/

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  coords: Coordinates;
}

export interface LocationError {
  error: any;
  fallbackLocation: Location;
}
export interface WeatherType {
  id: number;
  type: string;
  description: string;
}

export interface Temperature {
  current: number;
  minimum: number;
  maximum: number;
}

export interface NotificationData {
  title: string;
  text: string;
}

export interface WeatherData {
  currentWeather: WeatherModel;
  forecastWeather: ForecastModel;
}
