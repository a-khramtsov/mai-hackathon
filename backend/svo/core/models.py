from _signal import signal

from django.contrib.auth.models import AbstractUser, UserManager as BaseUserManager
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Avg
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _


class Airline(models.Model):
    name = models.CharField(
        max_length=150
    )
    logo = models.ImageField(upload_to='airline_logos/', null=True, blank=True)

    def __str__(self):
        return self.name


class UserManager(BaseUserManager):
    use_for_related_fields = True

    def get_queryset(self):
        return super().get_queryset()


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
    airline = models.ForeignKey(Airline, null=True, blank=True, default=None, on_delete=models.SET_NULL)

    objects = UserManager()

    @property
    def estimation(self):
        self.user_applications: models.QuerySet
        return self.user_applications.aggregate(estimation=Avg('worker_estimation')).get('estimation', 5)

    def __str__(self):
        return self.email + (
            (' ' + self.first_name + ' ' + self.last_name) if self.first_name and self.last_name else '')


class ResourceManager(models.Manager):
    use_for_related_fields = True

    def get_queryset(self):
        return super().get_queryset() \
            .annotate(estimation=Avg('resource_applications__resource_estimation',
                                     output_field=models.FloatField()))


class Resource(models.Model):
    title = models.TextField()
    description = models.TextField()
    photo = models.ImageField()
    geo_lat = models.FloatField()
    geo_lon = models.FloatField()

    def __str__(self):
        return self.title


class ParkingPlace(models.Model):
    code = models.CharField(max_length=100, unique=True)
    geo_lat = models.FloatField()
    geo_lon = models.FloatField()

    def __str__(self):
        return self.code


class Application(models.Model):
    class ApplicationStatuses(models.IntegerChoices):
        CANCELLED = 0, 'CANCELLED'
        NEW = 1, 'NEW'
        APPROVED_BY_AIRLINE = 2, 'APPROVED_BY_AIRLINE'
        REFUSED_BY_AIRLINE = 3, 'REFUSED_BY_AIRLINE'
        EDITED_BY_AIRLINE = 4, 'EDITED_BY_AIRLINE'
        APPROVED_BY_DISPATCHER = 5, 'APPROVED_BY_DISPATCHER'
        REFUSED_BY_DISPATCHER = 6, 'REFUSED_BY_DISPATCHER'
        EDITED_BY_DISPATCHER = 7, 'EDITED_BY_DISPATCHER'
        APPROVED_BY_WORKER_BUT_NOT_BY_AIRLINE = 8, 'APPROVED_BY_WORKER_BUT_NOT_BY_AIRLINE'

    resource = models.ForeignKey(Resource, related_name='resource_applications', on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.IntegerField(choices=ApplicationStatuses.choices, default=ApplicationStatuses.NEW)
    user = models.ForeignKey(get_user_model(), related_name='user_applications', on_delete=models.CASCADE)

    parking_place = models.ForeignKey(ParkingPlace, null=True, blank=True, on_delete=models.SET_NULL)

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

    def __str__(self):
        return f"Application#{self.pk} from {str(self.user)} for {str(self.resource)}"


class ExternalTask(models.Model):
    resource_title = models.TextField(null=True, blank=True)
    resource_description = models.TextField(null=True, blank=True)
    resource_geo_lat = models.FloatField(null=True, blank=True)
    resource_geo_lon = models.FloatField(null=True, blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    airline = models.TextField()
    user_email = models.TextField(null=True, blank=True)
    user_username = models.TextField(null=True, blank=True)
    user_first_name = models.TextField(null=True, blank=True)
    user_last_name = models.TextField(null=True, blank=True)
    parking_place = models.TextField(null=True, blank=True)


@receiver(post_save, sender=Application)
def save_application_to_task(sender, instance, **kwargs):
    if instance.status == 5:
        res = ExternalTask()
        res.resource_title = instance.resource.title
        res.resource_description = instance.resource.description
        res.resource_geo_lat = instance.resource.geo_lat
        res.resource_geo_lon = instance.resource.geo_lon
        res.start_time = instance.start_time
        res.end_time = instance.end_time
        res.airline = instance.user.airline.name if instance.user.airline else None
        res.user_email = instance.user.email
        res.user_username = instance.user.username
        res.user_first_name = instance.user.first_name
        res.user_last_name = instance.user.last_name
        res.parking_place = instance.parking_place.code if instance.parking_place else None
        res.save()