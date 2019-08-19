import { ForecastModel } from "../forecast.model";

describe("models/forecast.model.ts", () => {
  it("Generates a valid Forecast model", () => {
    const SampleJson = require("./forecast.example.valid");
    const model = new ForecastModel(SampleJson);

    expect(model.itemCount).toBe(3);

    expect(model).toMatchSnapshot();
  });

  it("Generates a valid Forecast model without items", () => {
    const SampleJson = require("./forecast.example.valid.poorData");
    const model = new ForecastModel(SampleJson);

    expect(model).toMatchSnapshot();
  });

  it("Generates a valid Forecast model on malformed data", () => {
    const model = new ForecastModel();

    expect(model).toMatchSnapshot();
  });
});
