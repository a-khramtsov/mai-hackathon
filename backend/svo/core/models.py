from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):
    email = models.EmailField(_('email'), unique=True)
    first_name = models.CharField(_('name'), max_length=30, blank=True)
    last_name = models.CharField(_('surname'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('registered'), auto_now_add=True)
    is_active = models.BooleanField(_('is_active'), default=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


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
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    description = models.TextField(default="", blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.IntegerField(choices=ApplicationStatuses.choices, default=ApplicationStatuses.NEW)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
