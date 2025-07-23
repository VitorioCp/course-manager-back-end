import { Request, Response } from 'express';
import { registerUser, authenticateUser } from '../services/auth.services';

export async function register(req: Request, res: Response) {
  const { email, login, password } = req.body;

  if (!email || !login || !password) {
    return res.status(400).json({ error: 'Preencha todos os campos' });
  }

  try {
    await registerUser(email, login, password);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err: any) {
    res.status(400).json({ error: 'Email ou login já está em uso' });
  }
}

export async function login(req: Request, res: Response) {
  const { identifier, password } = req.body;

  const result = await authenticateUser(identifier, password);

  if (!result) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  res.json({ token: result.token });
}
