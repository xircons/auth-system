import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DEFAULT_USERS_PATH = path.join(__dirname, '..', 'data', 'users.txt');

function getUsersPath() {
  return process.env.USERS_FILE || DEFAULT_USERS_PATH;
}

function ensureDataDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Read all users from the file. Each line is a JSON object: { email, password, firstname, lastname }
 */
export function readUsers(filePath = getUsersPath()) {
  ensureDataDir(filePath);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n').filter(Boolean);
  return lines.map((line) => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

/**
 * Append one user. Returns true if appended, false if email already exists.
 */
export function addUser(user, filePath = getUsersPath()) {
  const users = readUsers(filePath);
  if (users.some((u) => u.email === user.email)) {
    return false;
  }
  ensureDataDir(filePath);
  const line = JSON.stringify(user) + '\n';
  fs.appendFileSync(filePath, line);
  return true;
}

/**
 * Find user by email and password. Returns user object (with firstname) or null.
 */
export function findUser(email, password, filePath = getUsersPath()) {
  const users = readUsers(filePath);
  return users.find((u) => u.email === email && u.password === password) || null;
}
