import Movie from "../models/movie.model.js";
import createError from "http-errors";

export const list = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

export const detail = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    throw createError(404, "Película no encontrada");
  }

  res.json(movie);
};

export const create = async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(201).json(movie);
};

export const update = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    throw createError(404, "Película no encontrada");
  }

  res.json(movie);
};

export const remove = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    throw createError(404, "Película no encontrada");
  }

  res.status(204).end();
};
