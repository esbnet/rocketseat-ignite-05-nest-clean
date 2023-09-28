import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repositorie'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async findById(id: string) {
    const notification = this.items.find(
      (notification) => notification.id.toString() === id,
    )

    if (!notification) {
      return null
    }

    return notification
  }

  async update(notification: Notification) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[itemIndex] = notification
  }

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
