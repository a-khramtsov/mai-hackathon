from push_notifications.models import GCMDevice
from . import models


def notify_user(user, message):
    devices = GCMDevice.objects.filter(user=user)
    devices.send_message(message)


def notify_many_users(users, message):
    for user in users:
        notify_user(user, message)


def notify_all(message):
    devices = GCMDevice.objects.all()
    devices.send_message(message)