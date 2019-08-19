import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component, Watch } from "vue-property-decorator";

import template from "./forecast-widget.vue";
import "./forecast-widget.scss";

import StoreMixin from "../../mixins/store.mixin";

import LineChart from "../chart";

@Component({
  mixins: [template],
  components: {
    LineChart,
  }
})
export default class ForecastWidget extends mixins(StoreMixin) {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  isVisible = false;

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
  @Watch("forecastItems", { immediate: true })
  onChartUpdate() {
    this.isVisible = true;
  }
}
