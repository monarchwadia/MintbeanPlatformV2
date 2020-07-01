const VueCountdown: any = require("@chenfengyuan/vue-countdown");

import { VueConstructor } from "vue";

const validate = (files: __WebpackModuleApi.RequireContext): string[] => {
  // error holder
  const errors: string[] = [];
  // duplication detection set
  const names: Set<string> = new Set();

  files.keys().forEach((key: string) => {
    const module = files(key).default;
    const name: string = module.name;

    // ensure all modules have names
    if (!name) {
      errors.push(
        `Module [${key}] doesn't have a name defined in the default export.`
      );

      // since there's no name, just return.
      return;
    }

    // ensure names are unique
    if (names.has(name)) {
      errors.push(
        `Module [${key}] has name [${name}], but this name was already used and is not unique. Fix the duplication and try again.`
      );
    }

    // passed
    names.add(name);
  });

  return errors;
};

export default (Vue: VueConstructor<Vue>) => {
  const files = require.context("../components", false, /\.vue$/);

  const errors = validate(files);

  // this only happens once, during bootup, and should theoretically only happen if there was obvious programmer error.
  if (errors.length > 0) {
    console.error(errors.join("\r\n"));
    throw new Error("Errors found! See above.");
  }

  files.keys().forEach((key: string) => {
    // @ts-ignore
    const module = files(key).default;
    const { name } = module;
    Vue.component(name, module);
  });

  // register components not found in the folder
  Vue.component(VueCountdown.name, VueCountdown);
};
