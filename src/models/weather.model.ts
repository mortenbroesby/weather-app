import Logger from "js-logger";
import { Weather, WeatherType } from "../interfaces";

export class WeatherModel {
  weather: Weather = {
    // Degrees celsius
    temperature: {
      current: 0,
      minimum: 0,
      maximum: 0,
    },

    // Meters / second
    windSpeed: 0,

    // Percentage
    humidity: 0,

    // https://openweathermap.org/weather-conditions
    weatherType: {
      id: 800,
      type: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  };

  constructor(metadata?: any) {
    if (metadata) {
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

        // Wind speed
        if (metadata.wind.speed && typeof metadata.wind.speed === "number") {
          this.weather.windSpeed = Math.floor(metadata.wind.speed);
        }

        // Weather type
        if (metadata.weather && typeof metadata.weather === "object" && metadata.weather.length > 0) {
          const weatherType = metadata.weather[0];

          if (weatherType.id && weatherType.main && weatherType.description && weatherType.icon) {
            this.weather.weatherType = {
              id: weatherType.id,
              type: weatherType.main,
              description: weatherType.description,
              icon: weatherType.icon,
            };
          }
        }
      }
    }
  }
}
