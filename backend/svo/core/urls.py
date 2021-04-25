from rest_framework.routers import SimpleRouter

from . import views


router = SimpleRouter()
router.register(r"users", views.UserViewSet)
router.register(r"parking-places", views.ParkingPlaceViewSet)
router.register(r'device/fcm', views.FCMDeviceAuthorizedViewSet)

urlpatterns = [

]
urlpatterns += router.urls
