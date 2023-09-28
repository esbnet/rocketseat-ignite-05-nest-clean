import { Either, left, right } from '@/core/either'
import { ResourceNotAllowedError } from '@/core/errors/errors/resource-not-allowed'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repositorie'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotAllowedError | ResourceNotFoundError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new ResourceNotAllowedError())
    }

    notification.read()

    await this.notificationsRepository.update(notification)

    return right({ notification })
  }
}
