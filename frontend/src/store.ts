import Vuex, { MutationTree, ActionTree } from "vuex";

import { AuthService } from "./services/authService";
import { MbState } from './types/MbState';
import { MbContext } from './types/MbContext';

const state: MbState = {
  user: undefined,
  loginUrl: undefined,
  logoutUrl: undefined,
  registerUrl: undefined
};

const mutations: MutationTree<MbState> = {
  setProperty(state, arr) {
    const key: keyof MbState = arr[0];
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const value: any = arr[1];
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    state[key] = value;
  }
};

const createActions: (authservice: AuthService) => ActionTree<MbState, MbState> = authService => ({
  async checkAuth({ commit }) {
    let isAuthenticated;
    let user;

    try {
      isAuthenticated = await authService.checkAuth();
    } catch (e) {
      console.error("Failed to initialize Auth Service", e);
    }

    if (isAuthenticated) {
      try {
        user = await authService.checkAuth();
      } catch (e) {
        console.error("Auth passed, but failed to fetch user data.", e);
      }
    }

    if (user) {
      commit("setProperty", ["user", user]);
    } else {
      commit("setProperty", ["user", undefined]);
    }
  }
})

export const createStore = (mbContext: MbContext) => {
  const { authService } = mbContext;

  return new Vuex.Store({
    state,
    mutations,
    actions: createActions(authService)
  });
}
