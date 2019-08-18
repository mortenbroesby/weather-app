import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";

import template from "./home.vue";
import "./home.scss";

@Component({
  mixins: [template],
})
export default class Home extends mixins(StoreMixin) {}
