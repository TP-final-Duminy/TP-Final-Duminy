const express = require('express');
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process');

const INTERNAL_TOKEN = process.env.INTERNAL_TOKEN;

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/health', (req, res) => {
  // On retourne un statut HTTP 200 et l'objet JSON attendu par Jest
  res.status(200).json({ status: 'UP' });
});

app.get('/api/debug-ping', (req, res) => {
  const targetIp = req.query.ip || '127.0.0.1';

  exec(`ping -c 1 ${targetIp}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ output: stdout });
  });
});

app.get('/api/welcome', (req, res) => {
  const name = req.query.name || 'Invité';
  res.send(`<h1>Bienvenue ${name}</h1>`);
});

if (process.env.NODE_ENV !== 'test' && (process.env.NODE_ENV !== 'production' || process.env.DOCKER_RUN === 'true')) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Le serveur écoute activement sur le port ${PORT}`);
  });
}

module.exports = app;