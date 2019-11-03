import Api from "../Api";

export default {
  state: {
    config: {},
    hasData: false,
    showClaims: false,
    skills: [],
    claims: [],
    api: null,
    snackbarMessage: "",
    userProfile: {},
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
    setShowClaims(state, showClaims) {
      return {
        ...state,
        showClaims
      };
    },
    setClaims(state, claims) {
      return {
        ...state,
        claims
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

    showClaims() {
      dispatch.application.setShowClaims(true);
    },

    showSkills() {
      dispatch.application.setShowClaims(false);
    },

    async endorse({ claimId, endorsementEvidence }, state) {
      await state.application.api.endorse(
        state.auth.account.userName,
        claimId,
        endorsementEvidence
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
      dispatch.application.setUserProfile(data);
    },

    async getLevels(_, state) {
      const data = await state.application.api.getLevels();
      dispatch.application.setLevels(data);
    }
  })
};
