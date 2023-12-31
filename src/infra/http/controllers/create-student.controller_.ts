import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { z } from 'zod'

const CreateStudentBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

type CreateStudentBodySchema = z.infer<typeof CreateStudentBodySchema>

@Controller('/accounts')
export class CreateStudentController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(CreateStudentBodySchema))
  async handle(@Body() body: CreateStudentBodySchema) {
    const { name, email, password } = body

    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userAlreadyExists) {
      throw new ConflictException('User already exists with this email.')
    }

    const passwordHash = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    })
  }
}
