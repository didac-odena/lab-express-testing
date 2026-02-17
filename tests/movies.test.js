import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";
import Movie from "../models/movie.model.js";

describe("API de Movies - CRUD completo", () => {
  // ============================================
  // CREATE - POST /api/movies
  // ============================================
  describe("POST /api/movies", () => {
    it("debería crear una película correctamente", async () => {
      // TODO: Enviar un POST a /api/movies con datos válidos
      // Verificar que la respuesta tiene status 201
      // Verificar que el body contiene los datos enviados y un _id
      // Verificar que la película se guardó en la base de datos
    });

    it("debería devolver 400 si falta el título", async () => {
      // TODO: Enviar un POST sin el campo "title"
      // Verificar que la respuesta tiene status 400
      // Verificar que el body contiene errores de validación (ej: response.body.title)
    });

    it("debería devolver 400 si falta el director", async () => {
      // TODO: Enviar un POST sin el campo "director"
      // Verificar que la respuesta tiene status 400
      // Verificar que el body contiene errores de validación (ej: response.body.director)
    });

    // BONUS: Escribe un test que verifique que el rating no puede ser mayor a 10
  });

  // ============================================
  // READ ALL - GET /api/movies
  // ============================================
  describe("GET /api/movies", () => {
    it("debería devolver un array con las películas existentes", async () => {
      // TODO: Hacer GET a /api/movies
      // Verificar que la respuesta tiene status 200
      // Verificar que el body es un array
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
    });

    it("debería devolver 404 si la película no existe", async () => {
      // TODO: Hacer GET con un ID válido pero inexistente (ej: '64f1a2b3c4d5e6f7a8b9c0d1')
      // Verificar que la respuesta tiene status 404
      // Verificar que el mensaje es 'Película no encontrada'
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
    });

    it("debería devolver 404 si la película a actualizar no existe", async () => {
      // TODO: Enviar PATCH a un ID inexistente
      // Verificar status 404
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
    });

    it("debería devolver 404 si la película a eliminar no existe", async () => {
      // TODO: Enviar DELETE a un ID inexistente
      // Verificar status 404
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
    });
  });
});
