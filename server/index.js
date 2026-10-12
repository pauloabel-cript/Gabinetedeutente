const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS manifestacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      protocolo TEXT UNIQUE,
      tipo TEXT,
      canal TEXT,
      nome TEXT,
      anonimo INTEGER DEFAULT 0,
      descricao TEXT,
      status TEXT,
      prioridade TEXT,
      data TEXT
    )
  `);
});

function generateProtocol() {
  return `UG-${Math.floor(1000 + Math.random() * 9000)}`;
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'gabinetedeutente-api' });
});

app.get('/manifestacoes', (_req, res) => {
  db.all('SELECT * FROM manifestacoes ORDER BY id DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

app.post('/manifestacoes', (req, res) => {
  const { tipo, canal, nome, anonimo, descricao } = req.body;

  if (!tipo || !canal || !descricao) {
    return res.status(400).json({
      error: 'Os campos tipo, canal e descricao são obrigatórios.'
    });
  }

  const protocolo = generateProtocol();
  const data = new Date().toLocaleDateString('pt-MZ');

  db.run(
    `INSERT INTO manifestacoes (protocolo, tipo, canal, nome, anonimo, descricao, status, prioridade, data)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      protocolo,
      tipo,
      canal,
      nome || 'Utente externo',
      anonimo ? 1 : 0,
      descricao,
      'Em análise',
      'Média',
      data
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: this.lastID,
        protocolo,
        tipo,
        canal,
        nome: nome || 'Utente externo',
        status: 'Em análise',
        prioridade: 'Média',
        data
      });
    }
  );
});

app.patch('/manifestacoes/:id/status', (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'O campo status é obrigatório.' });
  }

  db.run('UPDATE manifestacoes SET status = ? WHERE id = ?', [status, req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ updated: this.changes, id: req.params.id, status });
  });
});

app.get('/relatorios', (_req, res) => {
  const query = `
    SELECT tipo, status, COUNT(*) AS total
    FROM manifestacoes
    GROUP BY tipo, status
    ORDER BY tipo, status
  `;

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`API do Gabinete do Utente em execução na porta ${port}`);
});
