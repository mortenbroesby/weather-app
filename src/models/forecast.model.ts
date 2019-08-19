import Logger from "js-logger";

import { WeatherModel } from "./weather.model";

export class ForecastModel {
  items: WeatherModel[] = [];
  itemCount: number = 0;

  constructor(metadata?: any) {
    if (metadata) {
      if (metadata.list && Array.isArray(metadata.list) && metadata.list.length > 0) {
        this.items = metadata.list.map((listItem: unknown) => {
          return new WeatherModel(listItem);
        });

        this.itemCount = this.items.length;
      }
    }
  }
}
