import { ForecastModel } from "../forecast.model";

describe("models/forecast.model.ts", () => {
  it("Generates a valid Forecast model on malformed data", () => {
    const model = new ForecastModel();

    expect(model).toMatchSnapshot();
  });
});
