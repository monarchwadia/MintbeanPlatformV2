import Vuex, { MutationTree, ActionTree, Action } from "vuex";

import { AuthService } from "./services/authService";
import { MbState } from './types/MbState';
import { MbContext } from './types/MbContext';
import { Project } from './types/Project';

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

const createActions = (mbContext: MbContext): ActionTree<MbState, MbState> => {
  const checkAuth: Action<MbState, MbState> = async ({ commit }) => {
    mbContext.authService.checkAuth()
      .then(user => commit("setProperty", ["user", user || undefined]))
      .catch(e => {
        console.log("Failed to perform auth", e);
      });
  };

  const login: Action<MbState, MbState> = async ({ commit }, { email, password, $router }) => {
    mbContext.authService.login(email, password)
      .then(user => {
        commit("setProperty", ["user", user || undefined]);
        if (user) {
          $router.push('/')
        }
      })
      .catch(e => {
        const message = e && e.response && e.response.data && e.response.data.message || '';
        console.log("Login failed", message, e);
        alert('Login failed. ' + message);
      });
  }

  const register: Action<MbState, MbState> = async ({ commit }, { email, password, firstname, lastname, $router }) => {
    mbContext.authService.register(firstname, lastname, email, password)
      .then(user => {
        commit("setProperty", ["user", user || undefined]);
        if (user) {
          $router.push('/')
        }
      })
      .catch(e => {
        const message = e && e.response && e.response.data && e.response.data.message || '';
        console.log("Registration failed", message, e);
        alert('Registration failed. ' + message);
      });
  }

  const logout: Action<MbState, MbState> = async ({ commit }) => {
    mbContext.authService.logout()
      .then(() => commit("setProperty", ["user", undefined]))
      .catch(e => {
        console.log("Failed to logout", e);
      });
  }

  const fetchMbEvents: Action<MbState, MbState> = async ({ commit }) => {
    mbContext.mbEventService.getMbEvents()
      .then(events => commit("setProperty", ["mbEvents", events]))
      .catch(e => {
        console.log("Failed to fetch events", e);
      })
  }

  const submitProject: Action<MbState, MbState> = async ({ commit, dispatch }, obj: Project) => {
    mbContext.projectService.submitProject(obj)
      .then(dto => {
        dispatch('fetchMbEvents');
      })
      .catch(e => {
        const message = e && e.response && e.response.data && e.response.data.message || '';
        console.log("Project submission failed", message, e);
        alert('Project submission failed. ' + message);
      })
  }

  return {
    checkAuth,
    login,
    logout,
    register,
    fetchMbEvents,
    submitProject
  }
}



export const createStore = (mbContext: MbContext) => {
  const { authService, mbEventService } = mbContext;

  return new Vuex.Store({
    state,
    mutations,
    actions: createActions(mbContext)
  });
}
