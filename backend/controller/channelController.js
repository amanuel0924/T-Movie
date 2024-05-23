import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getChannels = async (req, res) => {
  try {
    const channels = await prisma.channel.findMany()
    res.json(channels)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const createChannel = async (req, res) => {
  try {
    const { name } = req.body
    const channel = await prisma.channel.create({
      data: {
        name,
      },
    })
    res.json(channel)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const deleteChannel = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.channel.delete({
      where: {
        id: parseInt(id),
      },
    })
    res.json({ message: "Channel deleted" })
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const updateChannel = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    const channel = await prisma.channel.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    })
    res.json(channel)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const getChannelById = async (req, res) => {
  try {
    const { id } = req.params
    const channel = await prisma.channel.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    res.json(channel)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}
