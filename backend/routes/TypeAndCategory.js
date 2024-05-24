import express from "express"
import { getCategories, getTypes } from "./../controller/typeAndCategorey.js"

const router = express.Router()

router.route("/types").get(getTypes)
router.route("/categories").get(getCategories)

export default router
