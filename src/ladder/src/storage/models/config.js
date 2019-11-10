import { getConfig } from "../Api";

export default {
  state: {
    serverUrl: "",
    clientId: "",
    authority: "",
    redirectUri: ""
  },
  reducers: {
    setConfig(state, config) {
      return {
        serverUrl: config.application.serverUrl,
        clientId: config.auth.clientId,
        authority: config.auth.authority,
        redirectUri: config.auth.redirectUri
      };
    }
  },
  effects: dispatch => ({
    async initialize(_, state) {
      const data = await getConfig();
      dispatch.config.setConfig(data);
    }
  })
};
