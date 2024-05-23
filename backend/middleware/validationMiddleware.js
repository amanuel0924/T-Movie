import zod from "zod"

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body)
    next()
  } catch (error) {
    res.status(400).json({ error: error.errors })
  }
}

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
})
