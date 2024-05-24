import express from "express"
import {
  getMovieById,
  getMovies,
  updateMovie,
  createMovie,
  deleteMovie,
  statusTogler,
  getCategoryMovieCounts,
  getTypeMovieCounts,
} from "./../controller/movieController.js"
import { validate, movieSchema } from "../middleware/validationMiddleware.js"
const router = express.Router()

router.route("/").get(getMovies).post(validate(movieSchema), createMovie)
router.route("/grouped").get(getCategoryMovieCounts)
router.route("/type").get(getTypeMovieCounts)
router
  .route("/:id")
  .get(getMovieById)
  .put(validate(movieSchema), updateMovie)
  .delete(deleteMovie)
  .patch(statusTogler)

export default router
