import geolocator from "geolocator";

import { setItem, getItem } from "../utilities";
import { localisationService } from "./localisation.service";

import { Location } from "../interfaces";
import { GeoLocationModel } from "../models/location.model";

class GeoLocationService {
  geolocator = {};

  location: Location = new GeoLocationModel().location;

  requestLocation(): Promise<Location> {
    this.geolocator = geolocator.config({
      language: localisationService.getActiveLanguage(),
    });

    const storedLocation: Location = getItem("storedUserLocation");

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
          return reject(this.location);
        }

        const userLocation = new GeoLocationModel(location).location;
        setItem("storedUserLocation", userLocation);

        return resolve(userLocation);
      });
    });
  }
}

export const geoLocationService = new GeoLocationService();
