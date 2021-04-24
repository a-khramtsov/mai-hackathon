from rest_framework import generics, viewsets, status, mixins, permissions
from rest_framework.response import Response

from . import models, serializers
from core.models import Application, Resource


class ApplicationViewSet(mixins.ListModelMixin,
                         mixins.CreateModelMixin,
                         mixins.RetrieveModelMixin,
                         viewsets.GenericViewSet):

    queryset = Application.objects.all()
    serializer_class = serializers.ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]


class ResourceListAPI(generics.ListAPIView):

    queryset = Resource.objects.all()
    serializer_class = serializers.ResourcesSerializer
    permission_classes = [permissions.IsAuthenticated]
