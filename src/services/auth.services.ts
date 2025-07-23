import { openDb } from '../db/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export async function registerUser(email: string, login: string, password: string) {
  const db = await openDb();
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.run('INSERT INTO users (email, login, password) VALUES (?, ?, ?)', [email, login, hashedPassword]);
}

export async function authenticateUser(identifier: string, password: string) {
  const db = await openDb();
  const user = await db.get('SELECT * FROM users WHERE email = ? OR login = ?', [identifier, identifier]);

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  const token = jwt.sign({ id: user.id, email: user.email, login: user.login }, config.jwtSecret, { expiresIn: '1h' });

  return { token, user };
}
