# Create your models here.
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from core.models import Application
from core.serializers import CoreApplicationSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    pagination_class = None
    queryset = Application.objects.all()
    serializer_class = CoreApplicationSerializer

    def perform_update(self, serializer):
        return serializer.save(status=Application.ApplicationStatuses.EDITED_BY_DISPATCHER)

    @action("POST", detail=True)
    def approve(self):
        application = self.get_object()
        application.approve_by_dispatcher()
        return Response(status=204)

    @action("POST", detail=True)
    def refuse(self):
        application = self.get_object()
        application.refuse_by_dispatcher()
        return Response(status=204)
