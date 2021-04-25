from django.contrib import admin

from . import models

# Register your models here.
admin.site.register(models.User)
admin.site.register(models.Resource)


admin.site.register(models.Airline)
admin.site.register(models.ParkingPlace)


class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'resource__title',
        'resource__photo'
        'user__airline',
        'user__email',
        'user__username',
        'user__first_name',
        'user__last_name',
        'parking_place__code'
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
