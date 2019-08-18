import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

import { getWeather } from "../../services/api.service";

import StoreMixin from "../../mixins/store.mixin";

import template from "./home.vue";
import "./home.scss";

@Component({
  mixins: [template],
})
export default class Home extends mixins(StoreMixin) {
  mounted() {
    getWeather().then((result) => {
      Logger.info("result: ", result);
    }).catch((error) => {
      Logger.info("error: ", error);
    });
  }
}
