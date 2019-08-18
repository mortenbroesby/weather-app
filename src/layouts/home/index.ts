import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";
import { Location } from "../../interfaces";

import { getWeather } from "../../services/api.service";

import StoreMixin from "../../mixins/store.mixin";

import template from "./home.vue";
import "./home.scss";

import { geoLocationService } from "../../services/geolocation.service";

@Component({
  mixins: [template],
})
export default class Home extends mixins(StoreMixin) {
  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get currentWeather() {
    return this.rootState.currentWeather;
  }

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
    geoLocationService.requestLocation().then((location: Location) => {
      getWeather(location).then((result) => {
        Logger.info("getWeather result: ", result);
      }).catch((error) => {
        Logger.info("getWeather error: ", error);
      });
    }).catch((error) => {
      Logger.info("geoLocationService error: ", error);
    });
  }
}
