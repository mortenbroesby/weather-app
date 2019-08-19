import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

import template from "./forecast-widget.vue";
import "./forecast-widget.scss";

import StoreMixin from "../../mixins/store.mixin";

@Component({
  mixins: [template],
})
export default class ForecastWidget extends mixins(StoreMixin) {
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
