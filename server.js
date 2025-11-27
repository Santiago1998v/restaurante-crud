<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const app = express();

// Importar la base de datos (esto ejecutará las tablas)
const db = require("./database/db");

// Importar rutas
const categoriasRoutes = require("./routes/categorias");
const platosRoutes = require("./routes/platos");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/categorias", categoriasRoutes);
app.use("/api/platos", platosRoutes);

// GET / - Página de bienvenida con documentación
app.get("/", (req, res) => {
  res.json({
    success: true,
    mensaje: "¡Bienvenido a la API de Restaurante! 🍽️",
    documentacion: {
      descripcion:
        "API REST para gestión de restaurante con categorías y platos",
      version: "1.0.0",
      endpoints: {
        categorias: {
          "GET /api/categorias": "Obtener todas las categorías",
          "GET /api/categorias/:id": "Obtener una categoría específica",
          "POST /api/categorias":
            "Crear una nueva categoría (requiere: nombre)",
          "PUT /api/categorias/:id":
            "Actualizar una categoría (requiere: nombre)",
          "DELETE /api/categorias/:id":
            "Eliminar una categoría (solo si no tiene platos)",
        },
        platos: {
          "GET /api/platos": "Obtener todos los platos",
          "GET /api/platos/:id": "Obtener un plato específico",
          "GET /api/platos/categoria/:categoria_id":
            "Obtener platos por categoría",
          "POST /api/platos":
            "Crear un nuevo plato (requiere: nombre, precio, categoria_id)",
          "PUT /api/platos/:id":
            "Actualizar un plato (requiere: nombre, precio, categoria_id)",
          "DELETE /api/platos/:id": "Eliminar un plato",
        },
      },
      ejemplos: {
        crear_categoria: {
          url: "POST /api/categorias",
          body: { nombre: "Sopas", descripcion: "Sopas caseras" },
        },
        crear_plato: {
          url: "POST /api/platos",
          body: { nombre: "Bandeja Paisa", precio: 25000, categoria_id: 2 },
        },
      },
      codigos_estado: {
        200: "Operación exitosa",
        201: "Registro creado",
        400: "Datos inválidos (validación)",
        404: "Registro no encontrado",
        500: "Error del servidor",
      },
    },
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    mensaje: "Endpoint no encontrado",
  });
});

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:${PORT}");
=======
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
>>>>>>> cd9cc171380fd7b39249f7ffaeb2a3b99e24a1f2
});
