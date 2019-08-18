import Logger from "js-logger";
import { Weather } from "../interfaces";

export class WeatherModel {
  weather: Weather = {
    // Precipitation in mm
    precipitation: 0,

    // Temperature in degrees celsius
    temperature: {
      current: 0,
      minimum: 0,
      maximum: 0,
    },

    // Humidity in percentage
    humidity: 0,

    // Wind-speed in meters/second
    windSpeed: 0,

    // Weather conditions
    weatherType: {
      id: 800,
      type: "Clear",
      description: "clear sky",
    },
  };

  constructor(metadata?: any) {
    if (metadata) {
      // Precipitation

      // Note: Precipitation is untested.
      // For one, there is - no - precipitation field directly available...
      // Second: Apparently OWM does not display the "rain amount" object if it's not raining.
      // I looked at their XML, which just reports "no" when it's not raining,
      // even though the API says there should be a "precipitation.value".

      if (metadata.rain && typeof metadata.rain === "object" && metadata.rain.length > 0) {
        const precipitation = Object.values(metadata.rain)[0];

        if (typeof precipitation === "number") {
          this.weather.precipitation = precipitation;
        }
      }

      if (metadata.main) {
        // Temperature
        if (metadata.main.temp && typeof metadata.main.temp === "number") {
          this.weather.temperature.current = Math.floor(metadata.main.temp);
        }

        if (metadata.main.temp_min && typeof metadata.main.temp_min === "number") {
          this.weather.temperature.minimum = Math.floor(metadata.main.temp_min);
        }

        if (metadata.main.temp_max && typeof metadata.main.temp_max === "number") {
          this.weather.temperature.maximum = Math.floor(metadata.main.temp_max);
        }

        // Humidity
        if (metadata.main.humidity && typeof metadata.main.humidity === "number") {
          this.weather.humidity = metadata.main.humidity;
        }
      }

      // Wind speed
      if (metadata.wind && metadata.wind.speed && typeof metadata.wind.speed === "number") {
        this.weather.windSpeed = Math.floor(metadata.wind.speed);
      }

      // Weather type
      if (metadata.weather && typeof metadata.weather === "object" && metadata.weather.length > 0) {
        const weatherType = metadata.weather[0];

        if (weatherType.id && weatherType.main && weatherType.description) {
          this.weather.weatherType = {
            id: weatherType.id,
            type: weatherType.main,
            description: weatherType.description,
          };
        }
      }
    }
  }
}
