from rest_framework import serializers


class EstimateSerializer(serializers.ModelSerializer):
    estimation = serializers.IntegerField()
