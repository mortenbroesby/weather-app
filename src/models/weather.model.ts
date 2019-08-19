import Logger from "js-logger";
import { Temperature, WeatherType } from "../interfaces";

export class WeatherModel {
  // Precipitation in mm
  precipitation: number = 0;

  // Temperature in degrees celsius
  temperature: Temperature = {
    current: 0,
    minimum: 0,
    maximum: 0,
  };

  // Humidity in percentage
  humidity: number = 0;

  // Wind-speed in meters/second
  windSpeed: number = 0;

  // Weather conditions
  weatherType: WeatherType = {
    id: 800,
    type: "Clear",
    description: "clear sky",
  };

  // JS Timestamp
  timestamp: number = Date.now();

  constructor(metadata?: any) {
    if (metadata) {
      // Precipitation

      // Note: Precipitation is untested.
      // For one, there is - no - precipitation field directly available...
      // Second: Apparently OWM does not display the "rain amount" object if it's not raining.
      // I looked at their XML, which just reports "no" when it's not raining,
      // even though the API says there should be a "precipitation.value".

      if (metadata.rain && typeof metadata.rain === "object" && Object.keys(metadata.rain).length) {
        const precipitation = Object.values(metadata.rain)[0];

        if (typeof precipitation === "number") {
          this.precipitation = precipitation;
        }
      }

      if (metadata.main) {
        // Temperature
        if (metadata.main.temp && typeof metadata.main.temp === "number") {
          this.temperature.current = Math.floor(metadata.main.temp);
        }

        if (metadata.main.temp_min && typeof metadata.main.temp_min === "number") {
          this.temperature.minimum = Math.floor(metadata.main.temp_min);
        }

        if (metadata.main.temp_max && typeof metadata.main.temp_max === "number") {
          this.temperature.maximum = Math.floor(metadata.main.temp_max);
        }

        // Humidity
        if (metadata.main.humidity && typeof metadata.main.humidity === "number") {
          this.humidity = metadata.main.humidity;
        }
      }

      // Wind speed
      if (metadata.wind && metadata.wind.speed && typeof metadata.wind.speed === "number") {
        this.windSpeed = Math.floor(metadata.wind.speed);
      }

      // Weather type
      if (metadata.weather && typeof metadata.weather === "object" && metadata.weather.length > 0) {
        const weatherType = metadata.weather[0];

        if (weatherType.id && weatherType.main && weatherType.description) {
          this.weatherType = {
            id: weatherType.id,
            type: weatherType.main,
            description: weatherType.description,
          };
        }
      }

      // JS Timestamp
      if (metadata.dt && typeof metadata.dt === "number") {
        this.timestamp = metadata.dt;
      }
    }
  }
}
