export class ForecastModel {
  metadata = {};

  constructor(metadata?: any) {
    if (metadata) {
      this.metadata = metadata;
    }
  }
}
