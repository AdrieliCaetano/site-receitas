from django.urls import path, include
from rest_framework.routers import DefaultRouter
from receita import views

urlpatterns = [
    path('', views.index, name='index'),
]
