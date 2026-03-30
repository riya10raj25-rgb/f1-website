// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Serve all static files (HTML, CSS, JS) from the current directory
app.use(express.static(__dirname));

// Teams API endpoint
app.get('/teams', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data.json');
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const teams = JSON.parse(rawData);
        
        console.log(`📡 Serving ${teams.length} F1 teams`);
        res.json(teams);
    } catch (error) {
        console.error('Error reading data.json:', error);
        res.status(500).json({ error: 'Failed to load team data' });
    }
});

// Root route (already handled by static middleware)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n🚀 F1 Hub server running at http://localhost:${PORT}`);
    console.log(`📁 Static files served from: ${__dirname}`);
    console.log(`🔗 API available at http://localhost:${PORT}/teams\n`);
    console.log('✅ Open your browser → http://localhost:5000');
});