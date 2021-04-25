from push_notifications.models import GCMDevice
from . import models


def notify_user(user, message):
    models.Notification.objects.create(user=user, message=message)
    devices = GCMDevice.objects.filter(user=user)
    devices.send_message(message)


def notify_many_users(users, message):
    for user in users:
        notify_user(user, message)


def notify_all(message):
    devices = GCMDevice.objects.all()
    for user in models.User.objects.all():
        models.Notification.objects.create(user=user, message=message)
    devices.send_message(message)