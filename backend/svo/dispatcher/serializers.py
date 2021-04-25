from rest_framework import serializers


class EstimateSerialize(serializers.ModelSerializer):
    estimation = serializers.IntegerField()