from django.contrib import admin

from . import models

# Register your models here.
admin.site.register(models.User)
admin.site.register(models.Resource)
admin.site.register(models.Application)
admin.site.register(models.Airline)
admin.site.register(models.ParkingPlace)


class ExternalTaskAdmin(admin.ModelAdmin):
    fields = '__all__'


admin.site.register(models.ExternalTask, ExternalTaskAdmin)
