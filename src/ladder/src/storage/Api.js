export async function getConfig() {
  const response = await fetch("config.json");
  const json = await response.json();
  return json;
}

class Api {
  serverUrl = "";
  endpoints = {
    getSkillsForUser: username => `${this.serverUrl}/api/skills/${username}`,
    claimSkill: username => `${this.serverUrl}/api/claims/${username}`,
    getClaimsForNotUser: username =>
      `${this.serverUrl}/api/claims/not/${username}`,
    endorse: claimId => `${this.serverUrl}/api/claims/${claimId}/endorse`,
    addSkill: () => `${this.serverUrl}/api/skills`,
    editSkill: () => `${this.serverUrl}/api/skills`,
    getUserProfile: username => `${this.serverUrl}/api/user/${username}`,
    getLevels: () => `${this.serverUrl}/api/levels`,
    addMessage: claimId => `${this.serverUrl}/api/claims/${claimId}/message`,
    getMessages: claimId => `${this.serverUrl}/api/claims/${claimId}/message`
  };

  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }

  getSkillsForUser = async username => {
    const response = await fetch(this.endpoints.getSkillsForUser(username));
    const json = await response.json();
    return json.data;
  };

  claimSkill = async (username, skillId, claimEvidence, endorserEmails) => {
    await fetch(this.endpoints.claimSkill(username), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        skillId,
        claimEvidence,
        endorserEmails
      })
    });
  };

  getClaimsForNotUser = async username => {
    const response = await fetch(this.endpoints.getClaimsForNotUser(username));
    const json = await response.json();
    return json.data;
  };

  endorse = async (endorserUsername, claimId, message) => {
    await fetch(this.endpoints.endorse(claimId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endorserUsername, message })
    });
  };

  addSkill = async (username, levelId, summary) => {
    await fetch(this.endpoints.addSkill(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, levelId, summary })
    });
  };

  editSkill = async (username, skillId, levelId, summary) => {
    await fetch(this.endpoints.editSkill(), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patchedByUsername: username,
        skillId,
        levelId,
        summary
      })
    });
  };

  getUserProfile = async username => {
    const response = await fetch(this.endpoints.getUserProfile(username));
    const json = await response.json();
    return json.data;
  };

  getLevels = async () => {
    const response = await fetch(this.endpoints.getLevels());
    const json = await response.json();
    return json.data;
  };

  addMessage = async (username, claimId, message) => {
    await fetch(this.endpoints.addMessage(claimId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authorUsername: username, message })
    });
  };

  getMessages = async claimId => {
    const response = await fetch(this.endpoints.getMessages(claimId));
    const json = await response.json();
    return json.data;
  };
}

export default Api;
