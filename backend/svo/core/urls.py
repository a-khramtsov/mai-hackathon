from rest_framework.routers import SimpleRouter

from . import views


router = SimpleRouter()
router.register(r"users", views.UserViewSet)
router.register(r"parking-places", views.ParkingPlaceViewSet)

urlpatterns = [

]
urlpatterns += router.urls
