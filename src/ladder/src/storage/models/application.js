import * as api from "./../api";

export default {
  state: {
    hasData: false,
    showClaims: false,
    skills: [],
    claims: []
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
    }
  },
  effects: dispatch => ({
    async initialize(account, state) {
      if (state.auth.account && state.auth.account.userName) {
        const username = state.auth.account.userName;
        await dispatch.application.getSkillsForUser(username);
        await dispatch.application.getClaimsForNotUser(username);
        dispatch.application.setHasData();
      }
    },

    async getSkillsForUser(username, state) {
      const data = await api.getSkillsForUser(username);
      dispatch.application.setSkills(data);
    },

    async getClaimsForNotUser(username, state) {
      const data = await api.getClaimsForNotUser(username);
      dispatch.application.setClaims(data);
    },

    async claimSkill(
      { claimingSkillId, claimEvidence, endorserEmails },
      state
    ) {
      await api.claimSkill(
        state.auth.account.userName,
        claimingSkillId,
        claimEvidence,
        endorserEmails
      );
      dispatch.application.setSkillAsClaimed(claimingSkillId);
    },

    showClaims() {
      dispatch.application.setShowClaims(true);
    },

    showSkills() {
      dispatch.application.setShowClaims(false);
    },

    async endorse({ claimId, endorsementEvidence }, state) {
      await api.endorse(
        state.auth.account.userName,
        claimId,
        endorsementEvidence
      );
      dispatch.application.setClaimAsEndorsed(claimId);
    }
  })
};
