import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

import template from "./weather-widget.vue";
import "./weather-widget.scss";

import StoreMixin from "../../mixins/store.mixin";

@Component({
  mixins: [template],
})
export default class WeatherWidget extends mixins(StoreMixin) {
  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get currentWeather() {
    return this.rootState.currentWeather;
  }

  get weatherID() {
    return this.currentWeather.weather.weatherType.id;
  }

  get weatherIcon() {
    return `wi-owm-${this.weatherID}`;
  }
}
