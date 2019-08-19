import Logger from "js-logger";
import { Line, mixins as chartMixins } from "vue-chartjs";

import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";
import StoreMixin from "../../mixins/store.mixin";

import { formatMessage } from "../../services/localisation.service";
import { timestampToTime } from "../../utilities";
import { ChartLabel } from "../../enums";

import { WeatherModel } from "../../models/weather.model";

@Component({
  mixins: [chartMixins.reactiveData],
})
export default class Chart extends mixins(StoreMixin, Line) {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  chartData: Object | undefined = undefined;

  options: Object = {
    responsive: true,
    maintainAspectRatio: false,

    legend: {
      labels: {
        fontSize: 16,
        fontStyle: "bold",
        fontColor: "rgb(255, 99, 132)"
      },
      position: "bottom",
      fontStyle: "bold",
    },
    scales: {
      yAxes: [{
        ticks: {
          fontSize: 12,
          fontColor: "white",
        }
      }],
      xAxes: [{
        ticks: {
          fontSize: 10,
          fontColor: "white",
        }
      }]
    }
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
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
    this.updateData();
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  updateData() {
    let chartData = {
      labels: [],
      datasets: [
        {
          id: ChartLabel.PRECIPITATION,
          label: formatMessage("chart.labels.precipitation"),
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "#249EBF",
          data: []
        },
        {
          id: ChartLabel.WINDSPEED,
          label: formatMessage("chart.labels.windspeed"),
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "#249EBF",
          data: []
        },
        {
          id: ChartLabel.TEMPERATURE,
          label: formatMessage("chart.labels.temperature"),
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "#249EBF",
          data: []
        },
        {
          id: ChartLabel.HUMIDITY,
          label: formatMessage("chart.labels.humidity"),
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

        const precipitation = chartData.datasets.find((dataset) => dataset.id === ChartLabel.PRECIPITATION);
        if (precipitation) {
          (precipitation.data as any[]).push(item.precipitation);
        }

        const windspeed = chartData.datasets.find((dataset) => dataset.id === ChartLabel.WINDSPEED);
        if (windspeed) {
          (windspeed.data as any[]).push(item.windSpeed);
        }

        const temperature = chartData.datasets.find((dataset) => dataset.id === ChartLabel.TEMPERATURE);
        if (temperature) {
          (temperature.data as any[]).push(item.temperature.current);
        }

        const humidity = chartData.datasets.find((dataset) => dataset.id === ChartLabel.HUMIDITY);
        if (humidity) {
          (humidity.data as any[]).push(item.humidity);
        }
      });

      this.chartData = chartData;
    }

    this.renderChart(this.chartData, this.options);
  }
}
