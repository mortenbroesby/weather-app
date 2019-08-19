import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

import template from "./forecast-widget.vue";
import "./forecast-widget.scss";

import StoreMixin from "../../mixins/store.mixin";

import { Line, mixins as chartMixins } from "vue-chartjs";

@Component({
  mixins: [
    template,
    chartMixins.reactiveProp
  ],
  components: {
    Line,
  }
})
export default class ForecastWidget extends mixins(StoreMixin) {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  chartdata: {
    labels: ["January", "February"],
    datasets: [
      {
        label: "Data One",
        backgroundColor: "#f87979",
        data: [40, 20]
      }
    ]
  };

  options: {
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
}
