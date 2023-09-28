import { Either, left, right } from '@/core/either'
import { ResourceNotAllowedError } from '@/core/errors/errors/resource-not-allowed'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | ResourceNotAllowedError,
  null
>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new ResourceNotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return right(null)
  }
}
