import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";

import template from "./home.vue";
import "./home.scss";

import NavigationMenu from "../../components/navigation-menu";

@Component({
  mixins: [template],
  components: {
    NavigationMenu,
  }
})
export default class Home extends mixins(StoreMixin) {
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
