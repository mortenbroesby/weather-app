import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";
import { capitalize } from "../../utilities";

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

  get weatherType() {
    return capitalize(this.currentWeather.weather.weatherType.description);
  }

  get weatherIcon() {
    return `wi-owm-${this.weatherID}`;
  }

  get precipitation() {
    return this.currentWeather.weather.precipitation;
  }

  get temperature() {
    return this.currentWeather.weather.temperature.current;
  }

  get humidity() {
    return this.currentWeather.weather.humidity;
  }

  get windSpeed() {
    return this.currentWeather.weather.windSpeed;
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  refreshWeather() {
    this.$emit("refreshWeather");
  }
}
