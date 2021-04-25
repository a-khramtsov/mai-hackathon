from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, viewsets, status, mixins, permissions
from rest_framework.decorators import action
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

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    @swagger_auto_schema(method="post", request_body=openapi.Schema(
                             type=openapi.TYPE_OBJECT,
                             required=['estimation'],
                             properties={
                                 'resource_estimation': openapi.Schema(type=openapi.TYPE_INTEGER),
                                 'service_estimation': openapi.Schema(type=openapi.TYPE_INTEGER)
                             },
                         ), operation_description="POST /api/dispatcher/applications/{id}/estimate/")
    @action(methods=["POST"], detail=True)
    def estimate(self, *args, **kwargs):
        application = self.get_object()
        if self.request.data.get('resource_estimation', None):
            application.resource_estimation = self.request.data['resource_estimation']
        elif self.request.data.get('service_estimation', None):
            application.service_estimation = self.request.data['service_estimation']
        application.save()
        return Response(status=204)


class ResourceListAPI(generics.ListAPIView):

    queryset = Resource.objects.all()
    serializer_class = serializers.ResourcesSerializer
    permission_classes = [permissions.IsAuthenticated]
