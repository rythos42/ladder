import { getConfig } from "../Api";

export default {
  state: {
    serverUrl: "",
    clientId: "",
    authority: "",
    redirectUri: "",
    profilePhotoUrl: ""
  },
  reducers: {
    setConfig(state, config) {
      return {
        serverUrl: config.application.serverUrl,
        clientId: config.auth.clientId,
        authority: config.auth.authority,
        redirectUri: config.auth.redirectUri,
        profilePhotoUrl: config.auth.profilePhotoUrl
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
