import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  PORT: z.number().optional().default(3333),
})

export type Env = z.infer<typeof envSchema>
