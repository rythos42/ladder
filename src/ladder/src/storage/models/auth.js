import {
  msalApp,
  requiresInteraction,
  fetchMsGraph,
  GRAPH_ENDPOINTS,
  GRAPH_REQUESTS
} from "./auth-utils";

export default {
  state: {
    error: "",
    account: null,
    graphProfile: {},
    showDebug: false
  },
  reducers: {
    setAuthError(state, error) {
      return {
        ...state,
        error
      };
    },
    setAccount(state, account) {
      return {
        ...state,
        account: account
      };
    },
    setGraphProfile(state, graphProfile) {
      return {
        ...state,
        graphProfile
      };
    },
    setShowDebug(state, showDebug) {
      return {
        ...state,
        showDebug
      };
    }
  },
  effects: dispatch => ({
    async acquireToken(request, state) {
      return msalApp.acquireTokenSilent(request).catch(error => {
        // Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure due to consent or interaction required ONLY
        if (requiresInteraction(error.errorCode))
          msalApp.acquireTokenPopup(request);
      });
    },

    async initializeAzureAccess(account, state) {
      const tokenResponse = await dispatch.auth
        .acquireToken(GRAPH_REQUESTS.LOGIN)
        .catch(error => {
          dispatch.auth.setAuthError(error.message);
        });

      if (tokenResponse) {
        const graphProfile = await fetchMsGraph(
          GRAPH_ENDPOINTS.ME,
          tokenResponse.accessToken
        ).catch(() => {
          dispatch.auth.setAuthError("Unable to fetch Graph profile.");
        });

        if (graphProfile) dispatch.auth.setGraphProfile(graphProfile);
      }
    },

    async initialize(_, state) {
      const account = msalApp.getAccount();
      dispatch.auth.setAccount(account);

      if (account) dispatch.auth.initializeAzureAccess(account);
    },

    async requestSignIn(_, state) {
      const loginResponse = await msalApp
        .loginPopup(GRAPH_REQUESTS.LOGIN)
        .catch(error => {
          dispatch.auth.setAuthError(error.message);
        });

      if (loginResponse) {
        dispatch.auth.setAccount(loginResponse.account);
        dispatch.auth.initializeAzureAccess(loginResponse.account);
      }
    },

    async requestSignOut(_, state) {
      msalApp.logout();
    },

    toggleShowDebug(_, state) {
      const toggle = !state.auth.showDebug;
      dispatch.auth.setShowDebug(toggle);
    }
  })
};
