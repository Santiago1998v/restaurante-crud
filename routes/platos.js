const express = require("express");
const router = express.Router();
const db = require("../database/db");

//obtener todos los platos GET
router.get("/", (req, res) => {
  db.all("SELECT * FROM platos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//obtener un plato por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM platos WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Plato no encontrado" });
    res.json(row);
  });
});

//crear un plato POST
router.post("/", (req, res) => {
  const { nombre, precio, categoria_id } = req.body;

  db.run(
    "INSERT INTO platos (nombre, precio, categoria_id) VALUES (?, ?, ?)",
    [nombre, precio, categoria_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Plato creado", id: this.lastID });
    }
  );
});

//actualizar un plato PUT
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, precio, categoria_id } = req.body;

  db.run(
    "UPDATE platos SET nombre = ?, precio = ?, categoria_id = ? WHERE id = ?",
    [nombre, precio, categoria_id, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Plato actualizado" });
    }
  );
});

//eliminar un plato DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM platos WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Plato eliminado" });
  });
});

module.exports = router;
