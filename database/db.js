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
    descripcion TEXT
  );
`);

//crear tabla platos
db.run(`
  CREATE TABLE IF NOT EXISTS platos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
   
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
      "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)"
    );

    categorias.forEach((cat) => insert.run(cat[0], cat[1]));
    insert.finalize(() => console.log("Categorías iniciales insertadas."));
  }
});
//platos iniciales si no existen
db.get(`SELECT COUNT(*) AS count FROM platos`, (err, row) => {
  if (err) {
    console.error("Error al contar platos:", err.message);
  } else if (row.count === 0) {
    const platos = [
      ["Ensalada César", 18000, 1],
      ["Sancocho de Pollo", 22000, 2],
      ["Torta de Chocolate", 15000, 3],
      ["Limonada Natural", 8000, 4],
    ];

    const insert = db.prepare(
      "INSERT INTO platos (nombre, precio, categoria_id) VALUES (?, ?, ?)"
    );

    platos.forEach((p) => insert.run(p[0], p[1], p[2]));
    insert.finalize(() => console.log("Platos iniciales insertados."));
  }
});

module.exports = db;
