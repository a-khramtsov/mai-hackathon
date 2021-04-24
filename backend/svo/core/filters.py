from django_filters import rest_framework as filters

from core.models import Application


class ApplicationFilterSet(filters.FilterSet):
    class Meta:
        model = Application
        fields = {
            'status': ('exact', 'in'),
        }
