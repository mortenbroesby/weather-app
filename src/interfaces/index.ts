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

export interface Weather {
  precipitation: number;
  temperature: Temperature;
  humidity: number;
  windSpeed: number;
  weatherType: WeatherType;
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
