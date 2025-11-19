const sqlite3 = require("sqlite3").verbose();
const path = require("path");

//Ruta a la base de datos
const DB_PATH = path.join(__dirname, "restaurante.db");

//Crear la base de datos
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.message);
  } else {
    console.log("Conectado a la base de datos restaurante.db");
  }
});

//Crear tablas si no existen
db.run(`
  CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS platos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    categoria_id INTEGER NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
  )
`);

module.exports = db;
