from django.urls import include
from rest_framework.routers import SimpleRouter
from rest_framework.urls import path

from . import views

router = SimpleRouter()
router.register('movie', views.MovieApiView)

urlpatterns = [
    path('', include(router.urls)),
]