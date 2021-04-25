from django.contrib import admin
from django.db.models import Count

from . import models

# Register your models here.
admin.site.register(models.User)


class ResourceAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'title',
        'photo',
        'applications_count'
    )

    def get_queryset(self, request):
        return super().get_queryset().annotate(applications_count=Count('resource_applications'))

    def applications_count(self, obj):
        return obj.applications_count


admin.site.register(models.Resource, ResourceAdmin)

admin.site.register(models.Airline)
admin.site.register(models.ParkingPlace)


class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'resource',
        'user',
        'parking_place',
        'start_time',
        'end_time',
        'status'
    )


admin.site.register(models.Application, ApplicationAdmin)


class ExternalTaskAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'resource_title',
        'resource_description',
        'resource_geo_lat',
        'resource_geo_lon',
        'start_time',
        'end_time',
        'airline',
        'user_email',
        'user_username',
        'user_first_name',
        'user_last_name',
        'parking_place'
    )


admin.site.register(models.ExternalTask, ExternalTaskAdmin)
