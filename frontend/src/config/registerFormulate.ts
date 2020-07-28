/* eslint-disable @typescript-eslint/no-explicit-any */
import { VueConstructor } from "vue";
import { BUTTON_CLASSES } from "../constants";

const VueFormulate: any = require("@braid/vue-formulate");

export default (Vue: VueConstructor<Vue>) => {
  Vue.use(VueFormulate.default, {
    classes: {
      outer: [],
      wrapper: [],
      label: "cursor-pointer",
      element: [],
      input: (context: any /*, classes: any*/) => {
        const DEFAULTS =
          "border-gray-300 border-2 rounded-sm mb-4 p-2 cursor-pointer w-full";

        switch (context.type) {
          case "submit":
            return BUTTON_CLASSES + " w-full";
            break;
          case "textarea":
            return DEFAULTS + " resize-y h-32";
            break;
          default:
            return DEFAULTS;
            break;
        }
      },
      help: "text-xs mb-1 text-gray-600",
      error: "text-red-700 text-xs mb-1",
      errors: []
    }
  });
};
/* eslint-enable @typescript-eslint/no-explicit-any */
