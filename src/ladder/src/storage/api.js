const serverUrl = "https://localhost:5001";

const endpoints = {
  getSkillsForUser: username => `${serverUrl}/api/skills/${username}`,
  claimSkill: username => `${serverUrl}/api/claims/${username}`,
  getClaimsForNotUser: username => `${serverUrl}/api/claims/not/${username}`,
  endorse: claimId => `${serverUrl}/api/claims/${claimId}/endorse`
};

export async function getSkillsForUser(username) {
  const response = await fetch(endpoints.getSkillsForUser(username));
  const json = await response.json();
  return json.data;
}

export async function claimSkill(
  username,
  skillId,
  claimEvidence,
  endorserEmails
) {
  await fetch(endpoints.claimSkill(username), {
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
}

export async function getClaimsForNotUser(username) {
  const response = await fetch(endpoints.getClaimsForNotUser(username));
  const json = await response.json();
  return json.data;
}

export async function endorse(endorser, claimId, endorsementEvidence) {
  await fetch(endpoints.endorse(claimId), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endorser, endorsementEvidence })
  });
}
