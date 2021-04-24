from rest_framework import serializers

from . import models


class AirlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Airline
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    airline = AirlineSerializer(read_only=True)

    class Meta:
        model = models.User
        fields = ["id", "email", "username", "first_name", "last_name", "avatar"]


class CoreResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resource
        fields = '__all__'


class CoreApplicationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    resource = CoreResourceSerializer(read_only=True)

    class Meta:
        model = models.Application
        fields = '__all__'
