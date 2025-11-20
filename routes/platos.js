const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Obtener todos los platos
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
  const { nombre, descripcion } = req.body;

  db.run(
    "INSERT INTO platos (nombre, precio, descripcion, categoria_id) VALUES (?, ?)",
    [nombre, descripcion],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Categoría creada", id: this.lastID });
    }
  );
});

//actualizar categoría PUT
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion } = req.body;

  db.run(
    "UPDATE categorias SET nombre=?, descripcion=? WHERE id=?",
    [nombre, descripcion, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Categoría actualizada" });
    }
  );
});

//eliminar categoría DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM categorias WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Categoría eliminada" });
  });
});

module.exports = router;
