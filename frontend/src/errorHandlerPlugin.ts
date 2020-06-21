import { Store } from "vuex";
import { MbState } from "./types/MbState";
import { MbError } from "./types/MbError";

const errorHandlerPlugin = (store: Store<MbState>) => {
  // called when the store is initialized
  store.subscribe((mutation, state) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    const type: string = mutation.type;
    const payload: MbError = mutation.payload;

    switch (mutation.type) {
      case "error.log": {
        const errors = state.mbErrors.concat(payload);
        store.commit("mbErrors", errors);
        break;
      }
      case "error.dismiss": {
        const errors = state.mbErrors.filter(x => x.id !== payload.id);
        store.commit("mbErrors", errors);
        break;
      }
    }
  });
};

export default errorHandlerPlugin;
