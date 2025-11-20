const sqlite3 = require("sqlite3").verbose();
const path = require("path");

//ruta donde se guardará la base de datos en el directorio actual
const DB_PATH = path.join(__dirname, "restaurante.db");

//conexión a la base de datos SQLite
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.message);
  } else {
    console.log("Conectado a la base de datos restaurante.db");
  }
});

//crear tabla categorias primero
db.run(`
  CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    tipo TEXT
  );
`);

//crear tabla platos
db.run(`
  CREATE TABLE IF NOT EXISTS platos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    descripcion TEXT NOT NULL,
    categoria_id INTEGER NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
  );
`);

//categorías iniciales si no existen
db.get(`SELECT COUNT(*) AS count FROM categorias`, (err, row) => {
  if (err) {
    console.error("Error al contar categorías:", err.message);
  } else if (row.count === 0) {
    const categorias = [
      ["Entrantes", "Ensaladas"],
      ["Platos principales", "Almuerzos y jugos"],
      ["Postres", "Tortas"],
      ["Bebidas", "Refrescos o jugos naturales"],
    ];

    const insert = db.prepare(
      "INSERT INTO categorias (nombre, tipo) VALUES (?, ?)"
    );

    categorias.forEach((cat) => insert.run(cat[0], cat[1]));
    insert.finalize(() => console.log("Categorías iniciales insertadas."));
  }
});

module.exports = db;
