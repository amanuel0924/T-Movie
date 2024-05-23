import express from "express"
import {
  getMovieById,
  getMovies,
  updateMovie,
  createMovie,
  deleteMovie,
} from "./../controller/movieController.js"
import { validate, movieSchema } from "../middleware/validationMiddleware.js"
const router = express.Router()

router.route("/").get(getMovies).post(validate(movieSchema), createMovie)
router
  .route("/:id")
  .get(getMovieById)
  .put(validate(movieSchema), updateMovie)
  .delete(deleteMovie)

export default router
