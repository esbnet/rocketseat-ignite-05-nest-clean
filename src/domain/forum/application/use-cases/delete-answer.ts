import { Either, left, right } from '@/core/either'
import { ResourceNotAllowedError } from '@/core/errors/errors/resource-not-allowed'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | ResourceNotAllowedError,
  null
>

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new ResourceNotAllowedError())
    }

    await this.answersRepository.delete(answer)

    return right(null)
  }
}
