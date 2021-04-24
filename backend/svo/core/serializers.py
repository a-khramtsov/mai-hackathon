from rest_framework import serializers

from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["id", "email", "username", "first_name", "last_name", "avatar"]


class CoreResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resource
        fields = '__all__'


class CoreApplicationSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    resource = CoreResourceSerializer()

    class Meta:
        model = models.Application
        fields = '__all__'
