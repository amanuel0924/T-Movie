import express from "express"
import {
  getChannelById,
  getChannels,
  updateChannel,
  createChannel,
  deleteChannel,
  statusTogler,
  getAdminChannel,
} from "./../controller/channelController.js"

const router = express.Router()

router.route("/").get(getChannels).post(createChannel)
router.route("/admin").get(getAdminChannel)
router
  .route("/:id")
  .get(getChannelById)
  .put(updateChannel)
  .delete(deleteChannel)
  .patch(statusTogler)

export default router
