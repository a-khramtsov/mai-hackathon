from rest_framework import routers

from dispatcher import views

router = routers.DefaultRouter()

router.register(r"applications", views.ApplicationViewSet)

urlpatterns = [

]
urlpatterns += router.urls
