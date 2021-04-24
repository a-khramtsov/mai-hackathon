from django.utils import timezone

from rest_framework import serializers

from core.models import Application, Resource


class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = "__all__"


class ResourcesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resource
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        application = instance.resource_applications.\
            filter(end_time__gte=timezone.now()).order_by('-end_time').first()
        if application:
            data['blocked'] = True
            data['blocked_until'] = str(application.end_time)
        else:
            data['blocked'] = False
            data['blocked_until'] = None

        return data
