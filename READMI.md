# Nombre del Proyecto

- restaurante-crud

## Integrantes

- Santiago Varela Peña
- Miguel Angel Rendon

## Descripción

Este proyecto es una api rest desarrollada con node.js que gestiona la carta de un restaurante , mostrando sus categorias y sus platos. Usamos sql lite3 como base de datos la cual tiene las tablas categorias y platos y s eralacinan mediante una llave foranea.

La api esta desarrollada para resivir las peticiones CRUD (Create,Read,Update,Delate).

## Instalación

Instrucciones paso a paso:

1. Clonar el repositorio: Para esto es necesario ingresar a github, copiar el link del repositorio (git clone [https://github.com/Santiago1998v/restaurante-crud.git]).
2. Instalar dependencias: `npm install`

- install express sqlite3
- install --save-dev nodemon
- install express cors
- Node.js instalación local

3. Ejecutar: `npm run dev`
4. Abrir: http://localhost:3000

## Base de Datos

Fue necesario crear dos tablas llamadas platos y categorias, las cuales se relacionan mediante una llave foranea, esta se encuentra en la tabla principal platos y se relaciona con la tabla categorias.

## Endpoints Disponibles

Lista completa de endpoints con ejemplos
-platos:
GET:
http://localhost:3000/api/platos --> obtener todos
http://localhost:3000/api/platos/1 --> obtener poe ID

CREATE:
http://localhost:3000/api/platos/ --> Crear plato
json:
{
"nombre": "ensalada de abichuelas",
"precio": "10000",
"categoria_id": 1
}

UPDATE:
http://localhost:3000/api/platos/2 --> Actualizar plata
json:
{
"nombre": "repollo",
"precio": "10000",
"categoria_id": 1
}
DELATE:
http://localhost:3000/api/platos/2 --> plato eliminado

## Tecnologías Utilizadas

- Node.js
- Express
- SQLite3

## Ejemplos de Uso

Capturas de pantalla o ejemplos con Thunder Client
