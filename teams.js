let teamCount = 0;

const buildingOptions = [
  "Assign building...",
  "Imperial Foundry",
  "Prototype Site I",
  "Prototype Site II",
  "Boiler Room",
  "Transit Station",
  "Mercenary Camp",
  "Munitions Warehouse",
  "Repair Facility I",
  "Repair Facility II",
  "Repair Facility III",
  "Repair Facility IV",
  "Workshops Team"
];

function createBuildingSelectHTML() {
  return `<select class="building-select">
    ${buildingOptions.map(b => `<option value="${b}">${b}</option>`).join('')}
  </select>`;
}

function addTeam(teamName = "", building = "") {
  teamCount++;
  const container = document.getElementById('teams-container');

  const teamCard = document.createElement('div');
  teamCard.className = 'team-card';
  teamCard.id = `team-${teamCount}`;

  teamCard.innerHTML = `
    <div class="team-header">
      <span class="team-badge">${teamCount}</span>
      <input type="text" class="team-name-input" value="${teamName || 'Team ' + teamCount}" placeholder="Team Name">
      <span class="arrow-sep">➔</span>
      ${createBuildingSelectHTML()}
      <button onclick="deleteTeam('${teamCard.id}')" class="btn-danger">🗑️</button>
    </div>

    <div class="role-section leader-section">
      <div class="role-title">👑 RALLY LEADER</div>
      <div class="player-row leader-row">
        <input type="text" placeholder="Player Name" class="input-name leader-name">
        <input type="text" placeholder="Note — rally instructions / heroes..." class="input-note leader-note">
      </div>
    </div>

    <div class="joiners-container" id="joiners-${teamCount}">
      <div class="role-title">👥 JOINERS</div>
    </div>

    <button onclick="addJoiner(${teamCount})" class="btn-secondary">+ Add Joiner</button>
  `;

  container.appendChild(teamCard);
  
  // Default 2 joiners
  addJoiner(teamCount);
  addJoiner(teamCount);
}

function addJoiner(teamId) {
  const joinersContainer = document.getElementById(`joiners-${teamId}`);
  const joinerRow = document.createElement('div');
  joinerRow.className = 'player-row joiner-row';

  joinerRow.innerHTML = `
    <input type="text" placeholder="Player Name" class="input-name joiner-name">
    <input type="text" placeholder="Note / instructions..." class="input-note joiner-note">
    <button onclick="this.parentElement.remove()" class="btn-remove">✖</button>
  `;

  joinersContainer.appendChild(joinerRow);
}

function deleteTeam(teamCardId) {
  document.getElementById(teamCardId).remove();
}

function resetTeams() {
  if (confirm("Are you sure you want to reset all teams?")) {
    document.getElementById('teams-container').innerHTML = '';
    document.getElementById('summary-output').style.display = 'none';
    teamCount = 0;
    addTeam("Team 1");
    addTeam("Team 2");
    addTeam("Team 3");
  }
}

function generateSummary() {
  const legionTitle = document.getElementById('legion-title').value || 'Legion 1';
  const battleTime = document.getElementById('battle-time').value || '';
  
  const headerElem = document.getElementById('summary-header-title');
  headerElem.innerText = `Foundry Battle Plan • ${legionTitle} ${battleTime ? '• ' + battleTime : ''}`;

  const summaryList = document.getElementById('summary-teams-list');
  summaryList.innerHTML = '';

  const teamCards = document.querySelectorAll('.team-card');

  teamCards.forEach((card, index) => {
    const teamName = card.querySelector('.team-name-input').value || `Team ${index + 1}`;
    const targetBuilding = card.querySelector('.building-select').value;
    const buildingText = targetBuilding !== "Assign building..." ? targetBuilding : "";

    const leaderName = card.querySelector('.leader-name').value || "";
    const leaderNote = card.querySelector('.leader-note').value || "";

    const joinerRows = card.querySelectorAll('.joiner-row');
    let joinersHTML = '';

    joinerRows.forEach((row) => {
      const jName = row.querySelector('.joiner-name').value || "";
      const jNote = row.querySelector('.joiner-note').value || "";
      if (jName || jNote) {
        joinersHTML += `<li>• ${jName} ${jNote ? '— ' + jNote : ''}</li>`;
      }
    });

    const summaryTeam = document.createElement('div');
    summaryTeam.className = 'summary-team-block';
    summaryTeam.innerHTML = `
      <div class="summary-team-title">
        ${index + 1}. ${teamName} ${buildingText ? '➔ <span class="summary-building">' + buildingText + '</span>' : ''}
      </div>
      ${leaderName ? `<div class="summary-leader">★ ${leaderName} ${leaderNote ? '— ' + leaderNote : ''}</div>` : ''}
      ${joinersHTML ? `<ul class="summary-joiners">${joinersHTML}</ul>` : ''}
    `;

    summaryList.appendChild(summaryTeam);
  });

  document.getElementById('summary-output').style.display = 'block';
  document.getElementById('summary-output').scrollIntoView({ behavior: 'smooth' });
}

window.onload = function() {
  addTeam("Team 1");
  addTeam("Team 2");
  addTeam("Team 3");
};
