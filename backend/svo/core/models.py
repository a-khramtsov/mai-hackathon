from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import ugettext_lazy as _


class Airline(models.Model):
    name = models.CharField(
        max_length=150
    )
    logo = models.ImageField(upload_to='airline_logos', null=True, blank=True)


class User(AbstractUser):
    email = models.EmailField(_('email'), unique=True)
    username = models.CharField(
        max_length=150, verbose_name='Псевдоним'
    )
    first_name = models.CharField(_('name'), max_length=30, blank=True)
    last_name = models.CharField(_('surname'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('registered'), auto_now_add=True)
    is_active = models.BooleanField(_('is_active'), default=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["username"]
    airline = models.ForeignKey(Airline, null=True, default=None, on_delete=models.SET_NULL)


class Resource(models.Model):
    title = models.TextField()
    description = models.TextField()
    photo = models.ImageField()
    geo_lat = models.IntegerField()
    geo_lon = models.IntegerField()


class Application(models.Model):
    class ApplicationStatuses(models.IntegerChoices):
        CANCELLED = 0, 'CANCELLED'
        NEW = 1, 'NEW'
        APPROVED_BY_AIRLINE = 2, 'APPROVED_BY_AIRLINE'
        REFUSED_BY_AIRLINE = 3, 'REFUSED_BY_AIRLINE'
        EDITED_BY_AIRLINE = 4,  'EDITED_BY_AIRLINE'
        APPROVED_BY_DISPATCHER = 5, 'APPROVED_BY_DISPATCHER'
        REFUSED_BY_DISPATCHER = 6, 'REFUSED_BY_DISPATCHER'
        EDITED_BY_DISPATCHER = 7, 'EDITED_BY_DISPATCHER'
        APPROVED_BY_WORKER_BUT_NOT_BY_AIRLINE = 8, 'APPROVED_BY_WORKER_BUT_NOT_BY_AIRLINE'
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.IntegerField(choices=ApplicationStatuses.choices, default=ApplicationStatuses.NEW)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    service_estimation = models.IntegerField(null=True)
    worker_estimation = models.IntegerField(null=True)
    resource_estimation = models.IntegerField(null=True)

    def approve_by_airline(self):
        self.status = Application.ApplicationStatuses.APPROVED_BY_AIRLINE
        self.save()

    def approve_by_dispatcher(self):
        self.status = Application.ApplicationStatuses.APPROVED_BY_DISPATCHER
        self.save()

    def refuse_by_airline(self):
        self.status = Application.ApplicationStatuses.REFUSED_BY_AIRLINE
        self.save()

    def refuse_by_dispatcher(self):
        self.status = Application.ApplicationStatuses.REFUSED_BY_DISPATCHER
        self.save()

    def approve_changes(self):
        if self.status == Application.ApplicationStatuses.EDITED_BY_AIRLINE:
            self.approve_by_airline()
        else:
            self.status = Application.ApplicationStatuses.APPROVED_BY_WORKER_BUT_NOT_BY_AIRLINE
            self.save()

