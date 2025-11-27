const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Obtener todas las categorías
router.get("/", (req, res) => {
  db.all("SELECT * FROM categorias", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//obtener una categoría por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM categorias WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(row);
  });
});

//crear una categoría POST
router.post("/", (req, res) => {
  const { nombre, descripcion } = req.body;

  db.run(
<<<<<<< HEAD
    "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
=======
    "INSERT INTO categorias (nombre, tipo) VALUES (?, ?)",
>>>>>>> cd9cc171380fd7b39249f7ffaeb2a3b99e24a1f2
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
<<<<<<< HEAD
    "UPDATE categorias SET nombre=?, descripcion=? WHERE id=?",
=======
    "UPDATE categorias SET nombre=?, tipo=? WHERE id=?",
>>>>>>> cd9cc171380fd7b39249f7ffaeb2a3b99e24a1f2
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
