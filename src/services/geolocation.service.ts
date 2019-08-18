import geolocator from "geolocator";

import { setItem, getItem } from "../utilities";
import { localisationService } from "./localisation.service";

import { Location, LocationError } from "../interfaces";
import { GeolocationModel } from "../models/geolocation.model";

class GeolocationService {
  geolocator = {};

  location: GeolocationModel = new GeolocationModel();

  requestLocation(): Promise<GeolocationModel> {
    this.geolocator = geolocator.config({
      language: localisationService.getActiveLanguage(),
    });

    const storedLocation: GeolocationModel = getItem("storedUserLocation");

    const options = {
      enableHighAccuracy: true,
      timeout: 3000,
      maximumWait: 3000,
      maximumAge: 0,
      desiredAccuracy: 30,
      fallbackToIP: true,
    };

    return new Promise((resolve, reject) => {
      if (storedLocation) {
        return resolve(storedLocation);
      }

      geolocator.locate(options, (error: any, location: any) => {
        if (error) {
          return reject({
            error,
            fallbackLocation: this.location
          });
        }

        const userLocation = new GeolocationModel(location);
        setItem("storedUserLocation", userLocation);

        return resolve(userLocation);
      });
    });
  }
}

export const geolocationService = new GeolocationService();
