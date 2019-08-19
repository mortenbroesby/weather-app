import { GeolocationModel } from "../geolocation.model";

describe("models/geolocation.model.ts", () => {
  it("Generates a valid Geolocation model", () => {
    const SampleJson = require("./geolocation.example.valid");
    const model = new GeolocationModel(SampleJson);

    expect(model).toMatchSnapshot();
  });

  it("Generates a valid Geolocation model with poor data", () => {
    const SampleJson = require("./geolocation.example.poorData");
    const model = new GeolocationModel(SampleJson);

    expect(model).toMatchSnapshot();
  });

  it("Generates a valid Geolocation model with malformed data", () => {
    const SampleJson = require("./geolocation.example.malformed");
    const model = new GeolocationModel(SampleJson);

    expect(model).toMatchSnapshot();
  });

  it("Generates a valid Geolocation model on malformed data", () => {
    const model = new GeolocationModel();

    expect(model).toMatchSnapshot();
  });
});
