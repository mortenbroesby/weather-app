import Logger from "js-logger";
import Vue from "vue";
import config from "../config";

if (config.debug) {
  Vue.mixin({
    mounted() {
      type Watcher = { expression: string };
      const vm = this as {
        _watchers: Watcher[],
        $options: {
          name: string
        }
      };

      vm._watchers
        .filter(({ expression }) => !/function/.test(expression))
        .forEach(({ expression }) => {
          if (!(expression in vm)) {
            Logger.error(`[watcher-mixin] Found watcher ${expression} which is not declared in ${vm.$options.name}.`);
          }
        });
    }
  });
}
