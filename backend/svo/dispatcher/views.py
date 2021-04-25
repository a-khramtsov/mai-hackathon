# Create your models here.
from django_filters import rest_framework as filters
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from core.filters import ApplicationFilterSet
from core.models import Application
from core.serializers import CoreApplicationSerializer
from .serializers import EstimateSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    pagination_class = None
    queryset = Application.objects.all()
    serializer_class = CoreApplicationSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ApplicationFilterSet

    def perform_update(self, serializer):
        return serializer.save(status=Application.ApplicationStatuses.EDITED_BY_DISPATCHER)

    @swagger_auto_schema(method='get', operation_description="GET /api/dispatcher/applications/{id}/approve/")
    @action(methods=["GET"], detail=True)
    def approve(self, *args, **kwargs):
        application = self.get_object()
        application.approve_by_dispatcher()
        return Response(status=204)

    @swagger_auto_schema(method='get', operation_description="GET /api/dispatcher/applications/{id}/refuse/")
    @action(methods=["GET"], detail=True)
    def refuse(self, *args, **kwargs):
        application = self.get_object()
        application.refuse_by_dispatcher()
        return Response(status=204)

    @swagger_auto_schema(method="post", request_body=openapi.Schema(
                             type=openapi.TYPE_OBJECT,
                             required=['estimation'],
                             properties={
                                 'estimation': openapi.Schema(type=openapi.TYPE_INTEGER)
                             },
                         ), operation_description="POST /api/dispatcher/applications/{id}/estimate/")
    @action(methods=["POST"], detail=True)
    def estimate(self, *args, **kwargs):
        application = self.get_object()
        application.worker_estimation = self.request.data['estimation']
        application.save()
        return Response(status=204)
