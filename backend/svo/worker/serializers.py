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
