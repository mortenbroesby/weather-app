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
  get translate() {
    return {
      mainTitle: this.$t("weatherWidget.mainTitle"),
      firstSubtitle: this.$t("weatherWidget.firstSubtitle"),
      secondSubtitle: this.$t("weatherWidget.secondSubtitle", { value: this.weatherType }),
      precipitationTitle: this.$t("weatherWidget.precipitationTitle", { value: this.precipitation }),
      windspeedTitle: this.$t("weatherWidget.windspeedTitle", { value: this.windSpeed }),
      temperatureTitle: this.$t("weatherWidget.temperatureTitle", { value: this.temperature }),
      humidityTitle: this.$t("weatherWidget.humidityTitle", { value: this.humidity }),
    };
  }

  get currentWeather() {
    return this.rootState.currentWeather;
  }

  get weatherID() {
    return this.currentWeather.weatherType.id;
  }

  get weatherType() {
    return capitalize(this.currentWeather.weatherType.description);
  }

  get weatherIcon() {
    return `wi-owm-${this.weatherID}`;
  }

  get precipitation() {
    return this.currentWeather.precipitation;
  }

  get temperature() {
    return this.currentWeather.temperature.current;
  }

  get humidity() {
    return this.currentWeather.humidity;
  }

  get windSpeed() {
    return this.currentWeather.windSpeed;
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  refreshWeather() {
    this.$emit("refreshWeather");
  }
}
