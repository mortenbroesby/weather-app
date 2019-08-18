import Logger from "js-logger";
import { Location } from "../interfaces";
import { hasDeep } from "../utilities";

export class GeoLocationModel {
    // Default to Amsterdam for now.
  location: Location = {
    coords: {
      latitude: 52.3886,
      longitude: 4.9068
    }
  };

  constructor(metadata?: any) {
    if (metadata) {
      if (metadata.coords) {
        if (metadata.coords.latitude && typeof metadata.coords.latitude === "number") {
          this.location.coords.latitude = metadata.coords.latitude;
        }

        if (metadata.coords.longitude && typeof metadata.coords.longitude === "number") {
          this.location.coords.longitude = metadata.coords.longitude;
        }
      }
    }
  }
}
