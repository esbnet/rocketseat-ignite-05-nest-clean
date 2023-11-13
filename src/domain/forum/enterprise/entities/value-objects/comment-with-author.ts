import { ValueObject } from '@/core/entities/value-object'

export interface ICommentWithAuthorProps {
  contentId: string
  content: string
  authorId: string
  author: string
  createdAt: Date
  updatedAt?: Date | null
}

export class CommentWithAuthor extends ValueObject<ICommentWithAuthorProps> {
  static create(props: ICommentWithAuthorProps) {
    return new CommentWithAuthor(props)
  }

  get contentId() {
    return this.props.contentId
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get author() {
    return this.props.author
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
