from django.contrib import admin

from . import models

# Register your models here.
admin.site.register(models.User)
admin.site.register(models.Resource)
admin.site.register(models.Application)
admin.site.register(models.Airline)
admin.site.register(models.ParkingPlace)


class ExternalTaskAdmin(admin.ModelAdmin):
    fields = (
        'resource_title',
        'resource_description',
        'resource_geo_lat',
        'resource_geo_lon ',
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
