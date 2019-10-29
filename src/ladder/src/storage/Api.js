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
    getUserProfile: username => `${this.serverUrl}/api/user/${username}`
  };

  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }

  getSkillsForUser = async username => {
    const response = await fetch(this.endpoints.getSkillsForUser(username));
    const json = await response.json();

    json.data.forEach(skill => {
      skill.level = this.apiToLevel(skill.level);
      skill.summary = skill.summary || "";
    });

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

  editSkill = async (username, skillId, level, summary) => {
    await fetch(this.endpoints.editSkill(), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patchedByUsername: username,
        skillId,
        level: this.levelToApi(level),
        summary
      })
    });
  };

  getUserProfile = async username => {
    const response = await fetch(this.endpoints.getUserProfile(username));
    const json = await response.json();
    return json.data;
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

  apiToLevel = apiLevel => {
    switch (apiLevel) {
      case 0:
        return "Low";
      case 1:
        return "Medium";
      case 2:
        return "High";
      default:
        return "";
    }
  };
}

export default Api;
