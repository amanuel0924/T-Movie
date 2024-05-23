import zod from "zod"

export const validate = (schema) => async (req, res, next) => {
  try {
    console.log(req.body)
    await schema.parseAsync(req.body)
    next()
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.errors })
  }
}

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
})

export const channelSchema = zod.object({
  name: zod.string().min(3),
})

export const movieSchema = zod.object({
  title: zod.string().min(3),
  duration: zod.number().min(1),
  description: zod.string().min(3),
  channelId: zod.number(),
  typeId: zod.number(),
  categoryId: zod.number(),
  videoUrl: zod.string().url(),
})
