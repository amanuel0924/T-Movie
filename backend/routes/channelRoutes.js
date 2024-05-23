import express from "express"
import {
  getChannelById,
  getChannels,
  updateChannel,
  createChannel,
  deleteChannel,
} from "./../controller/channelController.js"
import { validate, channelSchema } from "../middleware/validationMiddleware.js"

const router = express.Router()

router.route("/").get(getChannels).post(validate(channelSchema), createChannel)
router
  .route("/:id")
  .get(getChannelById)
  .put(validate(channelSchema), updateChannel)
  .delete(deleteChannel)

export default router
