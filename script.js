// script.js - Updated to show Logo on team cards
let currentTeam = null;

async function loadTeams() {
    try {
        const response = await fetch('/teams');
        if (!response.ok) throw new Error('Failed to fetch teams');
        
        const teams = await response.json();
        
        const grid = document.getElementById('teams-grid');
        grid.innerHTML = '';

        teams.forEach(team => {
            const card = document.createElement('div');
            card.className = 'team-card';
            card.innerHTML = `
                <img src="${team.logo}" alt="${team.name} Logo" style="height: 180px; object-fit: contain; padding: 20px 10px 10px;">
                <h3>${team.name}</h3>
            `;
            card.addEventListener('click', () => showTeamDetail(team));
            grid.appendChild(card);
        });

        console.log('✅ Loaded', teams.length, 'F1 teams with logos');
    } catch (error) {
        console.error('Error loading teams:', error);
    }
}

function showTeamDetail(team) {
    currentTeam = team;
    
    document.getElementById('detail-name').textContent = team.name;
    document.getElementById('detail-section').classList.remove('hidden');
    
    // Reset buttons
    document.querySelectorAll('.detail-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.detail-btn[data-type="logo"]').classList.add('active');
    
    renderContent('logo', team);
    document.getElementById('detail-section').scrollIntoView({ behavior: 'smooth' });
}

function renderContent(type, team) {
    const contentEl = document.getElementById('detail-content');
    contentEl.classList.remove('show');
    
    let html = '';

    switch(type) {
        case 'logo':
            html = `<img src="${team.logo}" alt="${team.name} Logo" style="max-height:420px; object-fit: contain;">`;
            break;
        case 'car':
            html = `<img src="${team.car}" alt="${team.name} Car" style="max-height:420px; object-fit: contain;">`;
            break;
        case 'drivers':
            html = `
                <h4>Drivers 2026</h4>
                <ul>
                    ${team.drivers.map(d => `<li>${d}</li>`).join('')}
                </ul>
            `;
            break;
        case 'principal':
            html = `<h4>Team Principal</h4><p style="font-size:1.8rem;">${team.principal}</p>`;
            break;
        case 'ceo':
            html = `<h4>CEO</h4><p style="font-size:1.8rem;">${team.ceo}</p>`;
            break;
    }

    contentEl.innerHTML = html;
    setTimeout(() => contentEl.classList.add('show'), 10);
}

// Button listeners
function attachDetailListeners() {
    document.querySelectorAll('.detail-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.detail-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (currentTeam) renderContent(this.dataset.type, currentTeam);
        });
    });

    document.getElementById('close-detail').addEventListener('click', () => {
        document.getElementById('detail-section').classList.add('hidden');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTeams();
    attachDetailListeners();
});