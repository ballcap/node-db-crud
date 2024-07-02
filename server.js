const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'avnadmin',
  host: 'pg-1dae0a96-burneract-ef64.e.aivencloud.com',
  database: 'defaultdb',
  password: 'AVNS_AXUkLLJRuRTkJyz7rc5',
  port: 12971,
});

app.use(cors());
app.use(bodyParser.json());

app.get('/comments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM chats');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching comments', error);
    res.status(500).send('Server error');
  }
});

app.post('/comments', async (req, res) => {
  const { chatname, chatcomment } = req.body;
  const chatdate = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD

  try {
    const result = await pool.query(
      'INSERT INTO chats (chatname, chatdate, chatcomment) VALUES ($1, $2, $3) RETURNING *',
      [chatname, chatdate, chatcomment]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error posting comment', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
