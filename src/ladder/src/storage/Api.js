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
    addSkill: () => `${this.serverUrl}/api/skills`
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

  endorse = async (endorserUsername, claimId, endorsementEvidence) => {
    await fetch(this.endpoints.endorse(claimId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endorserUsername, endorsementEvidence })
    });
  };

  addSkill = async (username, level, summary) => {
    await fetch(this.endpoints.addSkill(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, level: this.levelToApi(level), summary })
    });
  };

  levelToApi = level => {
    switch (level) {
      case "Low":
        return 0;
      case "Medium":
        return 1;
      case "High":
        return 2;
      default:
        return -1;
    }
  };
}

export default Api;
