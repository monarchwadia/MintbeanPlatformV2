import Vuex, { MutationTree, ActionTree, Action } from "vuex";

import { AuthService } from "./services/authService";
import { MbState } from './types/MbState';
import { MbContext } from './types/MbContext';
import { MbEventService } from './services/mbEventService';

const state: MbState = {
  user: undefined,
  loginUrl: undefined,
  logoutUrl: undefined,
  registerUrl: undefined,
  mbEvents: []
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

const createActions: (authservice: AuthService, mbEventService: MbEventService) => ActionTree<MbState, MbState> = (authService, mbEventService) => {
  const checkAuth: Action<MbState, MbState> = async ({ commit }) => {
    authService.checkAuth()
      .then(user => commit("setProperty", ["user", user || undefined]))
      .catch(e => {
        console.log("Failed to perform auth", e);
      });
  };

  const login: Action<MbState, MbState> = async ({ commit }, { email, password, $router }) => {
    authService.login(email, password)
      .then(user => {
        commit("setProperty", ["user", user || undefined]);
        if (user) {
          $router.push('/')
        }
      })
      .catch(e => {
        console.log("Failed to perform login call", e);
        alert('Login failed');
      });
  }

  const logout: Action<MbState, MbState> = async ({ commit }) => {
    authService.logout()
      .then(() => commit("setProperty", ["user", undefined]))
      .catch(e => {
        console.log("Failed to logout", e);
      });
  }

  const fetchMbEvents: Action<MbState, MbState> = async ({ commit }) => {
    mbEventService.getMbEvents()
      .then(events => commit("setProperty", ["mbEvents", events]))
      .catch(e => {
        console.log("Failed to fetch events", e);
      })
  }

  return {
    checkAuth,
    login,
    logout,
    fetchMbEvents
  }
}



export const createStore = (mbContext: MbContext) => {
  const { authService, mbEventService } = mbContext;

  return new Vuex.Store({
    state,
    mutations,
    actions: createActions(authService, mbEventService)
  });
}
