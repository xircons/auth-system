import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { addUser, findUser } from './store.js';

const __filename = fileURLToPath(import.meta.url);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.post('/api/register', (req, res) => {
  const { email, password, firstname, lastname } = req.body || {};
  if (!email || !password || !firstname) {
    return res.status(400).json({ error: 'Missing required fields: email, password, firstname' });
  }
  const appended = addUser({ email, password, firstname, lastname: lastname || '' });
  if (!appended) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  res.status(201).json({ user: firstname });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  const user = findUser(email, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  res.status(200).json({ user: user.firstname || user.email });
});

const isMain = process.argv[1] === __filename;
if (isMain) {
  app.listen(PORT, () => {
    console.log(`Auth API running at http://localhost:${PORT}`);
  });
}

export { app };
