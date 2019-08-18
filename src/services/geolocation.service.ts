import geolocator from "geolocator";

import { setItem, getItem, removeItem } from "../utilities";
import { localisationService } from "./localisation.service";

import { GeolocationModel } from "../models/geolocation.model";

class GeolocationService {
  geolocator = undefined;

  location: GeolocationModel = new GeolocationModel();

  init() {
    this.geolocator = geolocator.config({
      language: localisationService.getActiveLanguage(),
    });
  }

  requestLocation(): Promise<GeolocationModel> {
    if (!this.geolocator) {
      this.init();
    }

    const storedLocation: GeolocationModel
      = getItem("storedUserLocation");

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

  updateLocation() {
    removeItem("storedUserLocation");
    return this.requestLocation();
  }
}

export const geolocationService = new GeolocationService();
