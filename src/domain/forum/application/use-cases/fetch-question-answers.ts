import { Either, right } from '@/core/either'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchRecentAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchRecentAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

@Injectable()
export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchRecentAnswersUseCaseRequest): Promise<FetchRecentAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({
      answers,
    })
  }
}
