import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getChannels = async (req, res) => {
  try {
    const queryObj = {}
    if (req.query.keyword) {
      queryObj.name = {
        contains: req.query.keyword,
        mode: "insensitive",
      }
    }
    const channels = await prisma.channel.findMany({
      where: queryObj,
    })
    res.json(channels)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const createChannel = async (req, res) => {
  try {
    console.log("createChannel")
    console.log(req.body)

    const { name } = req.body
    const channel = await prisma.channel.create({
      data: {
        name,
      },
    })
    res.json(channel)
  } catch (error) {
    console.log(error)
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
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const updateChannel = async (req, res) => {
  try {
    console.log(req.body)
    const { id } = req.params
    const channel = await prisma.channel.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    if (!channel) {
      return res.status(404).json({ error: "Channel not found" })
    }
    const { name, status } = req.body

    await prisma.channel.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        status,
      },
    })
    res.json({ message: "Channel updated" })
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
export const statusTogler = async (req, res) => {
  try {
    const { id } = req.params
    const channel = await prisma.channel.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    if (!channel) {
      return res.status(404).json({ error: "channel not found" })
    }
    const updatedChanel = await prisma.channel.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: !channel.status,
      },
    })
    res.json(updatedChanel)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}
