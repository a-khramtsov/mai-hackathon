from django.urls import path

from rest_framework import routers

from . import views

router = routers.SimpleRouter()
router.register(r"applications", views.ApplicationViewSet)


urlpatterns = [
    path(r"resources/", views.ResourceListAPI.as_view())
]
urlpatterns += router.urls