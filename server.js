require("./database/db");
const express = require("express");
const app = express();
const categoriasRoutes = require("./routes/categorias");
const platosRoutes = require("./routes/platos");

app.use(express.json());

// rutas
app.use("/categorias", categoriasRoutes);
app.use("/platos", platosRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
