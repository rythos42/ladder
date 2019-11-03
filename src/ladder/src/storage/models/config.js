import { getConfig } from "../Api";

export default {
  state: {
    serverUrl: ""
  },
  reducers: {
    setConfig(state, config) {
      return {
        serverUrl: config.application.serverUrl
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
