# Lab | Testing de una API Express con Vitest y Supertest

## Introducción

En este laboratorio pondrás en práctica lo aprendido sobre testing de APIs REST. Se te proporciona una API de películas completamente funcional construida con **Express** y **Mongoose**. Tu tarea es **escribir los tests** usando **Vitest** y **Supertest**.

## Requisitos previos

- Node.js instalado
- MongoDB corriendo localmente en `mongodb://127.0.0.1:27017`
- Conocimientos de Express, Mongoose y REST APIs

## Configuración inicial

```bash
npm install
```

## La API

La API gestiona un recurso **Movie** con los siguientes endpoints:

| Método   | Ruta              | Descripción                    | Status esperado |
| -------- | ----------------- | ------------------------------ | --------------- |
| `GET`    | `/api/movies`     | Listar todas las películas     | 200             |
| `POST`   | `/api/movies`     | Crear una nueva película       | 201             |
| `GET`    | `/api/movies/:id` | Obtener una película por su ID | 200             |
| `PATCH`  | `/api/movies/:id` | Actualizar parcialmente        | 200             |
| `DELETE` | `/api/movies/:id` | Eliminar una película          | 204             |

### Modelo Movie

| Campo      | Tipo   | Requerido | Validaciones   |
| ---------- | ------ | --------- | -------------- |
| `title`    | String | Sí        | trim           |
| `director` | String | Sí        | trim           |
| `year`     | Number | No        | —              |
| `genre`    | String | No        | trim           |
| `rating`   | Number | No        | min: 0 max: 10 |

## Estructura del proyecto

```
lab-express-testing/
├── app.js                          # Aplicación Express (exporta app)
├── package.json
├── vitest.config.js                # Configuración de Vitest
├── config/
│   ├── db.config.js                # Conexión a MongoDB (usa BDD _test en tests)
│   └── routes.config.js            # Definición de rutas
├── controllers/
│   └── movie.controllers.js        # Controladores CRUD (sin try/catch)
├── middlewares/
│   └── errors.middleware.js        # Middleware centralizado de errores
├── models/
│   └── movie.model.js              # Esquema y modelo de Movie
└── tests/
    ├── setup.js                    # Setup global (limpieza de BDD)
    └── movies.test.js              # 👈 TU TRABAJO: implementar los tests
```

## Tu tarea

Abre el fichero `tests/movies.test.js`. Encontrarás la estructura de tests ya definida con `describe` e `it`, pero los cuerpos de los tests están vacíos con comentarios `// TODO` que explican qué debes implementar.

### Ejecutar los tests

```bash
npm test
```

Al principio todos los tests pasarán porque están vacíos. A medida que implementes cada test, verás los resultados reales.

Para ejecutar en modo watch (re-ejecuta al guardar cambios):

```bash
npm run test:watch
```

### Comprobar cobertura (coverage)

Para verificar qué porcentaje de tu código está cubierto por los tests:

```bash
npm run test:coverage
```

Esto generará un informe con el porcentaje de cobertura por fichero. Asegúrate de alcanzar al menos un **80%** de cobertura en los controladores (`controllers/movie.controllers.js`).

---

## Iteraciones

### Iteración 1: POST /api/movies (Create)

Implementa los tests del bloque `POST /api/movies`:

1. **Crear una película correctamente**: Envía un POST con datos válidos, verifica status `201` y que el body contiene los datos enviados y un `_id`. Comprueba también que la película se guardó en la base de datos usando `Movie.findById()`.

2. **Error si falta el título**: Envía un POST sin `title`, verifica status `400` y que el body contiene los errores de validación de Mongoose (ej: `response.body.title`).

3. **Error si falta el director**: Envía un POST sin `director`, verifica status `400` y que el body contiene los errores de validación.

**Pista - Patrón básico con Supertest:**

```javascript
const response = await request(app)
  .post("/api/movies")
  .send({ title: "Inception", director: "Christopher Nolan" })
  .expect(201);

expect(response.body.title).toBe("Inception");
```

### Iteración 2: GET /api/movies (Read All)

Implementa el test del bloque `GET /api/movies`:

1. **Devolver las películas existentes**: Haz GET y verifica status `200` y que el body es un array.

### Iteración 3: GET /api/movies/:id (Read One)

Implementa los tests del bloque `GET /api/movies/:id`:

1. **Devolver una película por ID**: Crea una película con `Movie.create()`, luego haz GET con su `_id`. Verifica status `200` y los datos.

2. **404 si no existe**: Haz GET con un ID válido pero inexistente (ej: `'64f1a2b3c4d5e6f7a8b9c0d1'`). Verifica status `404` y el mensaje `'Película no encontrada'`.

### Iteración 4: PATCH /api/movies/:id (Update)

Implementa los tests del bloque `PATCH /api/movies/:id`:

1. **Actualizar parcialmente**: Crea una película, envía PATCH con solo algunos campos. Verifica que los campos enviados cambiaron y los no enviados mantienen su valor original.

2. **404 si no existe**: Envía PATCH a un ID inexistente, verifica status `404`.

### Iteración 5: DELETE /api/movies/:id (Delete)

Implementa los tests del bloque `DELETE /api/movies/:id`:

1. **Eliminar correctamente**: Crea una película, envía DELETE. Verifica status `204`. Comprueba con `Movie.findById()` que ya no existe.

2. **404 si no existe**: Envía DELETE a un ID inexistente, verifica status `404`.

### Iteración 6 (Bonus): Flujo completo CRUD

Implementa el test de integración que realiza el ciclo completo en un solo test:

1. **CREATE** - POST → 201
2. **READ** - GET por ID → 200
3. **UPDATE** - PATCH → 200
4. **DELETE** - DELETE → 204
5. **VERIFY** - GET por ID → 404 (ya no existe)

---

## Resultado esperado

Cuando todos los tests estén implementados, deberías ver algo similar a:

```
 ✓ tests/movies.test.js (12)
   ✓ API de Movies - CRUD completo (12)
     ✓ POST /api/movies (3)
       ✓ debería crear una película correctamente
       ✓ debería devolver 400 si falta el título
       ✓ debería devolver 400 si falta el director
     ✓ GET /api/movies (1)
       ✓ debería devolver un array con las películas existentes
     ✓ GET /api/movies/:id (2)
       ✓ debería devolver una película por su ID
       ✓ debería devolver 404 si la película no existe
     ✓ PATCH /api/movies/:id (2)
       ✓ debería actualizar parcialmente una película existente
       ✓ debería devolver 404 si la película a actualizar no existe
     ✓ DELETE /api/movies/:id (2)
       ✓ debería eliminar una película existente
       ✓ debería devolver 404 si la película a eliminar no existe
     ✓ Flujo completo CRUD (1)
       ✓ debería crear, leer, actualizar y eliminar una película

 Test Files  1 passed (1)
      Tests  12 passed (12)
```

## Conceptos clave

| Concepto                        | Detalle                                                                             |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| **`export default app`**        | Exportamos la app para que Supertest la use sin levantar el servidor                |
| **`NODE_ENV=test`**             | Usa la BDD `moviesdb_test` para no contaminar datos reales                          |
| **Error middleware**             | Centraliza el manejo de errores: ValidationError (400), http-errors (status), CastError (404) |
| **`request(app)`**              | Supertest simula peticiones HTTP sin necesidad de `app.listen()`                    |
| **`.send(data)`**               | Envía un body JSON en la petición                                                   |
| **`.expect(statusCode)`**       | Verifica el código de estado HTTP de la respuesta                                   |
| **`Movie.create()` en tests**   | Crea datos directamente en la BDD para preparar el escenario del test               |
| **`Movie.findById()` en tests** | Verifica directamente en la BDD que los datos se guardaron/eliminaron correctamente |

Happy coding! :)
