import { WeatherModel } from "../weather.model";

describe("models/weather.model.ts", () => {
  it("Generates a valid Weather model", () => {
    const SampleJson = require("./weather.example.valid.richData");
    const model = new WeatherModel(SampleJson);

    expect(model).toMatchSnapshot();
  });

  it("Generates a valid Weather model with poor data", () => {
    const SampleJson = require("./weather.example.valid.poorData");
    const model = new WeatherModel(SampleJson);

    expect(model).toMatchSnapshot();
  });

  it("Generates a valid Weather model with main data missing", () => {
    const SampleJson = require("./weather.example.valid.noMain");
    const model = new WeatherModel(SampleJson);

    expect(model).toMatchSnapshot();
  });

  it("Generates a valid Weather model on malformed data", () => {
    const model = new WeatherModel();

    expect(model).toMatchSnapshot();
  });
});
