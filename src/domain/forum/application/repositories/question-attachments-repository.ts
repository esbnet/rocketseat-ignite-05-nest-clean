// eslint-disable-next-line prettier/prettier
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';

export abstract class QuestionAttachmentsRepository {
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>

  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}
