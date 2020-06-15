import Vuex, { MutationTree, ActionTree, Action } from "vuex";

import { AuthService } from "./services/authService";
import { MbState } from "./types/MbState";
import { MbContext } from "./types/MbContext";
import { Project } from "./types/Project";

const state: MbState = {
  user: undefined,
  loginUrl: undefined,
  logoutUrl: undefined,
  registerUrl: undefined,
  project: undefined,
  mbEvents: [],
  votes: [],
};

const mutations: MutationTree<MbState> = {
  setProperty(state, arr) {
    const key: keyof MbState = arr[0];
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const value: any = arr[1];
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    state[key] = value;
  },
};

const createActions = (mbContext: MbContext): ActionTree<MbState, MbState> => {
  const checkAuth: Action<MbState, MbState> = async ({ commit }) => {
    mbContext.authService
      .checkAuth()
      .then((user) => commit("setProperty", ["user", user || undefined]))
      .catch((e) => {
        console.log("Failed to perform auth", e);
      });
  };

  const login: Action<MbState, MbState> = async (
    { commit },
    { email, password, $router }
  ) => {
    mbContext.authService
      .login(email, password)
      .then((user) => {
        commit("setProperty", ["user", user || undefined]);
        if (user) {
          $router.push("/");
        }
      })
      .catch((e) => {
        const message =
          (e && e.response && e.response.data && e.response.data.message) || "";
        console.log("Login failed", message, e);
        alert("Login failed. " + message);
      });
  };

  const register: Action<MbState, MbState> = async (
    { commit },
    { email, password, firstname, lastname, $router }
  ) => {
    mbContext.authService
      .register(firstname, lastname, email, password)
      .then((user) => {
        commit("setProperty", ["user", user || undefined]);
        if (user) {
          $router.push("/");
        }
      })
      .catch((e) => {
        const message =
          (e && e.response && e.response.data && e.response.data.message) || "";
        console.log("Registration failed", message, e);
        alert("Registration failed. " + message);
      });
  };

  const logout: Action<MbState, MbState> = async ({ commit }) => {
    mbContext.authService
      .logout()
      .then(() => commit("setProperty", ["user", undefined]))
      .catch((e) => {
        console.log("Failed to logout", e);
      });
  };

  const fetchMbEvents: Action<MbState, MbState> = async ({ commit }) => {
    mbContext.mbEventService
      .getMbEvents()
      .then((events) => commit("setProperty", ["mbEvents", events]))
      .catch((e) => {
        console.log("Failed to fetch events", e);
      });
  };

  const submitProject: Action<MbState, MbState> = async (
    { commit, dispatch },
    obj: Project
  ) => {
    mbContext.projectService
      .submitProject(obj)
      .then((dto) => {
        dispatch("fetchMbEvents");
      })
      .catch((e) => {
        const message =
          (e && e.response && e.response.data && e.response.data.message) || "";
        console.log("Project submission failed", message, e);
        alert("Project submission failed. " + message);
      });
  };

  const fetchProject: Action<MbState, MbState> = async (
    { commit, dispatch },
    projectId: string
  ) => {
    mbContext.projectService
      .fetchProject(projectId)
      .then((dto) => {
        commit("setProperty", ["project", dto || undefined]);
      })
      .catch((e) => {
        const message =
          (e && e.response && e.response.data && e.response.data.message) || "";
        console.log("Failed to fetch project", message, e);
        alert("Failed to fetch project");
      });
  };

  // TODO: remove any
  const vote: Action<MbState, MbState> = async (
    { commit, dispatch },
    obj: any
  ) => {
    mbContext.projectService
      .vote(obj)
      .then((dto) => {
        alert("Thanks for voting!");
        dispatch("fetchProject", obj.ProjectId);
      })
      .catch((e) => {
        const message =
          (e && e.response && e.response.data && e.response.data.message) || "";
        console.log("Voting failed", message, e);
        alert("Voting failed. " + message);
        if (obj && obj.ProjectId) {
          dispatch("fetchProject", obj.ProjectId);
        }
      });
  };

  const deleteMediaAsset: Action<MbState, MbState> = async (
    { commit, dispatch },
    obj: { ProjectId: string; MediaAssetId: string }
  ) => {
    mbContext.projectService
      .deleteMediaAsset(obj)
      .then(() => {
        alert("Deletion successful.");
        dispatch("fetchProject", obj.ProjectId);
      })
      .catch((e) => {
        const message =
          (e && e.response && e.response.data && e.response.data.message) || "";
        console.log("Deletion failed", message, e);
        alert("Deletion failed. " + message);
        if (obj && obj.ProjectId) {
          dispatch("fetchProject", obj.ProjectId);
        }
      });
  };

  const uploadMediaAssets: Action<MbState, MbState> = async (
    { commit, dispatch },
    obj: { ProjectId: string; MediaAssets: any }
  ) => {
    mbContext.projectService
      .uploadMediaAssets(obj)
      .then(() => {
        alert("Upload successful.");
        dispatch("fetchProject", obj.ProjectId);
      })
      .catch((e) => {
        const message =
          (e && e.response && e.response.data && e.response.data.message) || "";
        console.log("Upload failed", message, e);
        alert("Upload  failed. " + message);
        if (obj && obj.ProjectId) {
          dispatch("fetchProject", obj.ProjectId);
        }
      });
  };
  return {
    checkAuth,
    login,
    logout,
    register,
    fetchMbEvents,
    submitProject,
    vote,
    fetchProject,
    deleteMediaAsset,
    uploadMediaAssets,
  };
};

export const createStore = (mbContext: MbContext) => {
  const { authService, mbEventService } = mbContext;

  return new Vuex.Store({
    state,
    mutations,
    actions: createActions(mbContext),
  });
};
