import Vue from "vue";

// @ts-ignore: Library without TS support
import Notify from "../../modules/vue-notify-me";

import { Component } from "vue-property-decorator";
import { Events } from "../../eventbus";

import template from "./notification.vue";
import "./notification.scss";

@Component({
  mixins: [template],
  components: {
    Notify,
  }
})
export default class Notification extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  eventbus = Events;

  closeNotification() {
    this.$emit("hide");
  }
}
