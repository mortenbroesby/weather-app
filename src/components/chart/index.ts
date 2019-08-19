import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

import { Line, mixins as chartMixins } from "vue-chartjs";
import StoreMixin from "../../mixins/store.mixin";
import { WeatherModel } from "../../models/weather.model";
import { timestampToTime } from "../../utilities";

@Component({
  mixins: [chartMixins.reactiveData],
})
export default class Chart extends mixins(StoreMixin, Line) {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  chartData: Object | undefined = {};

  options: Object = {
    responsive: true,
    maintainAspectRatio: false
  };

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get forecast() {
    return this.rootState.forecastWeather;
  }

  get forecastItems() {
    return this.forecast.items;
  }

  /*************************************************/
  /* WATCHERS */
  /*************************************************/
  mounted() {
    this.updateData();
  }

  updateData() {
    let chartData = {
      labels: [],
      datasets: [
        {
          label: "Precipitation",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "#249EBF",
          data: []
        },
        {
          label: "Humidity",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "#249EBF",
          data: []
        },
        {
          label: "Wind speed",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "#249EBF",
          data: []
        },
        {
          label: "Temperature",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "#249EBF",
          data: []
        },
      ]
    };

    if (this.forecastItems && this.forecastItems.length > 0) {
      this.forecastItems.forEach((item: WeatherModel) => {
        const time = timestampToTime(item.timestamp);

        chartData.labels.push(time as never);

        chartData.datasets[0].data.push(item.precipitation as never);
        chartData.datasets[1].data.push(item.humidity as never);
        chartData.datasets[2].data.push(item.windSpeed as never);
        chartData.datasets[3].data.push(item.temperature as never);
      });

      this.chartData = chartData;
    }

    this.renderChart(this.chartData, this.options);
  }
}
