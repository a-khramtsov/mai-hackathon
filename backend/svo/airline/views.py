from django.shortcuts import render
from django_filters import rest_framework as filters
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from core.filters import ApplicationFilterSet
from core.models import Application
from core.serializers import CoreApplicationSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    pagination_class = None
    queryset = Application.objects.all()
    serializer_class = CoreApplicationSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ApplicationFilterSet

    def perform_update(self, serializer):
        return serializer.save(status=Application.ApplicationStatuses.EDITED_BY_AIRLINE)

    @swagger_auto_schema(method='get', auto_schema=None, operation_description="GET /api/airline/applications/{id}/approve/")
    @action(methods=["get"], detail=True)
    def approve(self):
        application = self.get_object()
        application.approve_by_airline()
        return Response(status=204)

    @swagger_auto_schema(method='get', auto_schema=None, operation_description="GET /api/airline/applications/{id}/refuse/")
    @action(methods=["get"], detail=True)
    def refuse(self):
        application = self.get_object()
        application.refuse_by_airline()
        return Response(status=204)
