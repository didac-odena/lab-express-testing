import Movie from "../models/movie.model.js";
import createError from "http-errors";

export const list = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

export const detail = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      throw createError(404, "Película no encontrada");
    }

    res.json(movie);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      throw createError(404, "Película no encontrada");
    }

    res.json(movie);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      throw createError(404, "Película no encontrada");
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
