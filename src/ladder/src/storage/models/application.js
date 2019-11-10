import Api from "../Api";

export default {
  state: {
    config: {},
    hasData: false,
    skills: [],
    claims: [],
    api: null,
    snackbarMessage: "",
    userProfile: { claims: [] },
    levels: []
  },
  reducers: {
    setSkills(state, skills) {
      return {
        ...state,
        skills
      };
    },
    setSkillAsClaimed(state, skillId) {
      return {
        ...state,
        skills: state.skills.map(skill =>
          skill.id !== skillId ? skill : { ...skill, claimed: true }
        )
      };
    },
    setHasData(state) {
      return {
        ...state,
        hasData: true
      };
    },
    setClaims(state, claims) {
      return {
        ...state,
        claims
      };
    },
    setMessages(state, { claimId, messages }) {
      return {
        ...state,
        claims: state.claims.map(claim =>
          claim.id !== claimId ? claim : { ...claim, messages }
        )
      };
    },
    setClaimAsEndorsed(state, claimId) {
      return {
        ...state,
        claims: state.claims.filter(claim => claim.id !== claimId)
      };
    },
    setConfig(state, config) {
      return {
        ...state,
        config
      };
    },
    setApi(state, api) {
      return {
        ...state,
        api
      };
    },
    setSnackbarMessage(state, snackbarMessage) {
      return {
        ...state,
        snackbarMessage
      };
    },
    setUserProfile(state, userProfile) {
      return {
        ...state,
        userProfile
      };
    },
    setLevels(state, levels) {
      return {
        ...state,
        levels
      };
    }
  },
  effects: dispatch => ({
    async initialize(account, state) {
      if (state.auth.account && state.auth.account.userName) {
        const username = state.auth.account.userName;
        dispatch.application.setApi(new Api(state.config.serverUrl));

        await dispatch.application.getLevels();
        await dispatch.application.getSkillsForUser(username);
        await dispatch.application.getClaimsForNotUser(username);
        await dispatch.application.getUserProfile(username);
        dispatch.application.setHasData();
      }
    },

    async getSkillsForUser(username, state) {
      const data = await state.application.api.getSkillsForUser(username);

      data.forEach(skill => {
        skill.level = state.application.levels.find(
          level => level.id === skill.levelId
        );
        skill.summary = skill.summary || "";
      });

      dispatch.application.setSkills(data);
    },

    async getClaimsForNotUser(username, state) {
      const data = await state.application.api.getClaimsForNotUser(username);

      data.forEach(claim => {
        claim.level = state.application.levels.find(
          level => level.id === claim.levelId
        );
      });

      dispatch.application.setClaims(data);
    },

    async claimSkill(
      { claimingSkillId, claimEvidence, endorserEmails },
      state
    ) {
      await state.application.api.claimSkill(
        state.auth.account.userName,
        claimingSkillId,
        claimEvidence,
        endorserEmails
      );
      dispatch.application.setSkillAsClaimed(claimingSkillId);
      dispatch.application.setSnackbarMessage("Claimed skill.");
    },

    async endorse({ claimId, message }, state) {
      await state.application.api.endorse(
        state.auth.account.userName,
        claimId,
        message
      );
      dispatch.application.setClaimAsEndorsed(claimId);
      dispatch.application.setSnackbarMessage("Endorsed skill.");
    },

    async addSkill({ levelId, summary }, state) {
      await state.application.api.addSkill(
        state.auth.account.userName,
        levelId,
        summary
      );

      dispatch.application.getSkillsForUser(state.auth.account.userName);
      dispatch.application.setSnackbarMessage("Added skill.");
    },

    async editSkill({ skillId, levelId, summary }, state) {
      await state.application.api.editSkill(
        state.auth.account.userName,
        skillId,
        levelId,
        summary
      );
      dispatch.application.getSkillsForUser(state.auth.account.userName);
    },

    async getUserProfile(username, state) {
      const data = await state.application.api.getUserProfile(username);

      data.claims.forEach(claim => {
        claim.level = state.application.levels.find(
          level => level.id === claim.levelId
        );
      });

      dispatch.application.setUserProfile(data);
    },

    async getLevels(_, state) {
      const data = await state.application.api.getLevels();
      dispatch.application.setLevels(data);
    },

    async addMessage({ claimId, message }, state) {
      await state.application.api.addMessage(
        state.auth.account.userName,
        claimId,
        message
      );
    },

    async getMessages(claimId, state) {
      const data = await state.application.api.getMessages(claimId);
      dispatch.application.setMessages({ claimId, messages: data });
    }
  })
};
