import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";

import template from "./home.vue";
import "./home.scss";

import NavigationMenu from "../../components/navigation-menu";
import WeatherWidget from "../../components/weather-widget";

@Component({
  mixins: [template],
  components: {
    NavigationMenu,
    WeatherWidget,
  }
})
export default class Home extends mixins(StoreMixin) {}
