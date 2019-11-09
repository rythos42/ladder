import { UserAgentApplication } from "msal";

const GRAPH_SCOPES = {
  OPENID: "openid",
  PROFILE: "profile",
  USER_READ: "User.Read",
  MAIL_READ: "Mail.Read"
};

const GRAPH_REQUESTS = {
  LOGIN: {
    scopes: [GRAPH_SCOPES.OPENID, GRAPH_SCOPES.PROFILE, GRAPH_SCOPES.USER_READ]
  }
};

const GRAPH_ENDPOINTS = {
  ME: "https://graph.microsoft.com/v1.0/me"
};

export default {
  state: {
    msalApp: null,
    error: "",
    account: null,
    graphProfile: {}
  },
  reducers: {
    setMsalApp(state, msalApp) {
      return {
        ...state,
        msalApp
      };
    },
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
    }
  },
  effects: dispatch => ({
    async acquireToken(request, state) {
      return state.auth.msalApp.acquireTokenSilent(request).catch(error => {
        // Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure due to consent or interaction required ONLY
        if (!error.errorCode || !error.errorCode.length) return;

        const requiresInteraction =
          error.errorCode.indexOf("consent_required") > -1 ||
          error.errorCode.indexOf("interaction_required") > -1 ||
          error.errorCode.indexOf("login_required") > -1;

        if (requiresInteraction) state.auth.msalApp.acquireTokenPopup(request);
      });
    },

    async initializeAzureAccess(account, state) {
      const tokenResponse = await dispatch.auth
        .acquireToken(GRAPH_REQUESTS.LOGIN)
        .catch(error => {
          dispatch.auth.setAuthError(error.message);
        });

      if (tokenResponse) {
        const response = await fetch(GRAPH_ENDPOINTS.ME, {
          headers: {
            Authorization: `Bearer ${tokenResponse.accessToken}`
          }
        });

        const graphProfile = response.json();
        if (graphProfile) dispatch.auth.setGraphProfile(graphProfile);
      }
    },

    async initialize(_, state) {
      const msalApp = new UserAgentApplication({
        auth: {
          clientId: state.config.clientId,
          authority: state.config.authority,
          validateAuthority: true,
          redirectUri: state.config.redirectUri,
          postLogoutRedirectUri: state.config.redirectUri,
          navigateToLoginRequestUrl: false
        },
        cache: {
          cacheLocation: "sessionStorage"
        },
        system: {
          navigateFrameWait: 0
        }
      });
      dispatch.auth.setMsalApp(msalApp);

      const account = msalApp.getAccount();
      dispatch.auth.setAccount(account);

      if (account) dispatch.auth.initializeAzureAccess(account);
    },

    async requestSignIn(_, state) {
      const loginResponse = await state.auth.msalApp
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
      state.auth.msalApp.logout();
    }
  })
};
