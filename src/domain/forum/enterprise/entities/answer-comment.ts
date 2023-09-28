import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface IAnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<IAnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<IAnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answercomment = new AnswerComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )
    return answercomment
  }
}
