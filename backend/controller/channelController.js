import { PrismaClient } from "@prisma/client"
import {
  getAdminData,
  deleteData,
  createData,
  updateData,
  getUserData,
  togler,
  getDatabyId,
} from "./refactoredController.js"
const prisma = new PrismaClient()

export const getChannels = getUserData(prisma.channel)

export const createChannel = createData(prisma.channel)

export const deleteChannel = deleteData(prisma.channel)

export const updateChannel = updateData(prisma.channel)

export const getChannelById = getDatabyId(prisma.channel)

export const statusTogler = togler(prisma.channel)

export const getAdminChannel = getAdminData(prisma.channel)
