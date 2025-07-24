import sqlite3 from "sqlite3"
import {open} from "sqlite"

export async function openDb() {
  return open({
    filename: './src/db/database.db',
    driver: sqlite3.Database
  });
}

export async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      login TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      desc TEXT NOT NULL,
      horas INTEGER NOT NULL,
      img TEXT NOT NULL,
      status TEXT CHECK(status IN ('ativo', 'inativo')) NOT NULL
    )
  `);
}