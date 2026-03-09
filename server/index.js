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
  const tryListen = (port) => {
    const server = app.listen(port, () => {
      console.log(`Auth API running at http://localhost:${server.address().port}`);
      if (server.address().port !== 3001) {
        console.log('  (3001 was in use — set VITE_API_URL=http://localhost:' + server.address().port + ' and restart the frontend if needed)');
      }
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE' && port < 3010) {
        tryListen(port + 1);
      } else {
        throw err;
      }
    });
  };
  tryListen(Number(PORT) || 3001);
}

export { app };
