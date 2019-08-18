import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./spinner.vue";
import "./spinner.scss";

@Component({
  mixins: [template],
  components: {}
})
export default class Spinner extends Vue {}
