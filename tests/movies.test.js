import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";
import Movie from "../models/movie.model.js";
import { response } from "express";

describe("API de Movies - CRUD completo", () => {
  // ============================================
  // CREATE - POST /api/movies
  // ============================================
  describe("POST /api/movies", () => {
    it("debería crear una película correctamente", async () => {
      const validMovieData = {
        title: "Interstellar",
        director: "Christopher Nolan",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.6,
      };

      const response = await request(app)
        .post("/api/movies")
        .send(validMovieData);

      expect(response.status).toBe(201);
      expect(response.body._id).toBeDefined();
      expect(response.body.title).toBe(validMovieData.title);
      expect(response.body.director).toBe(validMovieData.director);
      expect(response.body.year).toBe(validMovieData.year);
      expect(response.body.genre).toBe(validMovieData.genre);
      expect(response.body.rating).toBe(validMovieData.rating);

      const createdMovie = await Movie.findById(response.body._id);
      expect(createdMovie).not.toBeNull();
      expect(createdMovie.title).toBe(validMovieData.title);
      expect(createdMovie.director).toBe(validMovieData.director);
    });

    it("debería devolver 400 si falta el título", async () => {
      // TODO: Enviar un POST sin el campo "title"
      // Verificar que la respuesta tiene status 400
      // Verificar que el body contiene errores de validación (ej: response.body.title)
      const movieTest = {
        director: "Christopher Nolan",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.6,
      };

      const response = await request(app).post("/api/movies").send(movieTest);

      expect(response.status).toBe(400);
      expect(response.body.title).toBeDefined();
      expect(response.body.title.message).toContain("required");
    });

    it("debería devolver 400 si falta el director", async () => {
      // TODO: Enviar un POST sin el campo "director"
      // Verificar que la respuesta tiene status 400
      // Verificar que el body contiene errores de validación (ej: response.body.director)
      const movieTest = {
        title: "Interstellar",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.6,
      };

      const response = await request(app).post("/api/movies").send(movieTest);

      expect(response.status).toBe(400);
      expect(response.body.director).toBeDefined();
      expect(response.body.director.message).toContain("required");
    });

    // BONUS: Escribe un test que verifique que el rating no puede ser mayor a 10
    it("deberia de devolver 400 si se pasa del rating", async () => {
      const movieTest = {
        title: "Interstellar",
        director: "Christopher Nolan",
        year: 2014,
        genre: "Sci-Fi",
        rating: 11.2,
      };

      const response = await request(app).post("/api/movies").send(movieTest);

      expect(response.status).toBe(400);
      expect(response.body.rating).toBeDefined();
      expect(response.body.rating.kind).toBe("max");
    });
  });

  // ============================================
  // READ ALL - GET /api/movies
  // ============================================
  describe("GET /api/movies", () => {
    it("debería devolver un array con las películas existentes", async () => {
      // TODO: Hacer GET a /api/movies
      // Verificar que la respuesta tiene status 200
      // Verificar que el body es un array

      const response = await request(app).get("/api/movies");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // ============================================
  // READ ONE - GET /api/movies/:id
  // ============================================
  describe("GET /api/movies/:id", () => {
    it("debería devolver una película por su ID", async () => {
      // TODO: Crear una película directamente en la BDD con Movie.create()
      // Hacer GET a /api/movies/:id con el ID de la película creada
      // Verificar que la respuesta tiene status 200
      // Verificar que el body contiene los datos correctos

      const movieTest = await Movie.create({
        title: "Interstellar",
        director: "Christopher Nolan",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.6,
      });

      const response = await request(app).get(`/api/movies/${movieTest._id}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(String(movieTest._id));
      expect(response.body.title).toBe("Interstellar");
      expect(response.body.director).toBe("Christopher Nolan");
    });

    it("debería devolver 404 si la película no existe", async () => {
      // TODO: Hacer GET con un ID válido pero inexistente (ej: '64f1a2b3c4d5e6f7a8b9c0d1')
      // Verificar que la respuesta tiene status 404
      // Verificar que el mensaje es 'Película no encontrada'
      const response = await request(app).get(
        `/api/movies/64f1a2b3c4d5e6f7a8b9c0d1`,
      );

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Película no encontrada");
    });
  });

  // ============================================
  // UPDATE - PATCH /api/movies/:id
  // ============================================
  describe("PATCH /api/movies/:id", () => {
    it("debería actualizar parcialmente una película existente", async () => {
      // TODO: Crear una película en la BDD
      // Enviar PATCH con solo algunos campos modificados
      // Verificar status 200
      // Verificar que los campos enviados se actualizaron
      // Verificar que los campos NO enviados mantienen su valor original
      const movieTest = await Movie.create({
        title: "Interstellar",
        director: "Christopher Nolan",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.6,
      });
      const response = await request(app)
        .patch(`/api/movies/${movieTest._id}`)
        .send({ title: "Interstellar (Actualizada)", rating: 9.0 });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Interstellar (Actualizada)");
      expect(response.body.rating).toBe(9.0);
    });

    it("debería devolver 404 si la película a actualizar no existe", async () => {
      // TODO: Enviar PATCH a un ID inexistente
      // Verificar status 404
      const response = await request(app)
        .patch(`/api/movies/64f1a2b3c4d5e6f7a8b9c0d1`)
        .send({ title: "Película Inexistente" });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Película no encontrada");
    });
  });

  // ============================================
  // DELETE - DELETE /api/movies/:id
  // ============================================
  describe("DELETE /api/movies/:id", () => {
    it("debería eliminar una película existente", async () => {
      // TODO: Crear una película en la BDD
      // Enviar DELETE a /api/movies/:id
      // Verificar status 204
      // Verificar que la película ya NO existe en la BDD
      const movieTest = await Movie.create({
        title: "Interstellar",
        director: "Christopher Nolan",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.6,
      });

      const response = await request(app).delete(`/api/movies/${movieTest._id}`);

      expect(response.status).toBe(204);
      const movieDeleted = await Movie.findById(movieTest._id);
      expect(movieDeleted).toBeNull();
    });

    it("debería devolver 404 si la película a eliminar no existe", async () => {
      // TODO: Enviar DELETE a un ID inexistente
      // Verificar status 404
      const response = await request(app).delete(`/api/movies/64f1a2b3c4d5e6f7a8b9c0d1`);
      expect(response.status).toBe(404);
    });
    
  });

  // ============================================
  // BONUS: Flujo completo CRUD
  // ============================================
  describe("Flujo completo CRUD", () => {
    it("debería crear, leer, actualizar y eliminar una película", async () => {
      // TODO (BONUS): Implementar el flujo completo en un solo test
      // 1. POST - Crear una película → verificar 201
      // 2. GET  - Leer la película creada → verificar 200 y datos correctos
      // 3. PATCH - Actualizar el título → verificar 200 y cambio aplicado
      // 4. DELETE - Eliminar la película → verificar 204
      // 5. GET  - Intentar leer la película eliminada → verificar 404
      const movieData = {
        title: "Interstellar",
        director: "Christopher Nolan",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.6,
      };

      // 1. POST - Crear una película → verificar 201
      const postResponse = await request(app).post("/api/movies").send(movieData);
      expect(postResponse.status).toBe(201);
      expect(postResponse.body.title).toBe(movieData.title);

      // 2. GET  - Leer la película creada → verificar 200 y datos correctos
      const movieId = postResponse.body._id;
      const getResponse = await request(app).get(`/api/movies/${movieId}`);
      expect(getResponse.status).toBe(200);
      expect(getResponse.body.title).toBe(movieData.title);

      // 3. PATCH - Actualizar el título → verificar 200 y cambio aplicado
      const updatedTitle = "Interstellar (Actualizada)";
      const patchResponse = await request(app)
        .patch(`/api/movies/${movieId}`)
        .send({ title: updatedTitle });
      expect(patchResponse.status).toBe(200);
      expect(patchResponse.body.title).toBe(updatedTitle);

      // 4. DELETE - Eliminar la película → verificar 204
      const deleteResponse = await request(app).delete(`/api/movies/${movieId}`);
      expect(deleteResponse.status).toBe(204);

      // 5. GET  - Intentar leer la película eliminada → verificar 404
      const getDeletedMovie = await request(app).get(`/api/movies/${movieId}`);
      expect(getDeletedMovie.status).toBe(404);
    });
  });
});
// 