"""inventorymanagement URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from inventory.views.user import RegistrationView
from inventory.api.user import ListUser
from inventory.api.register import RegisterAPI
from inventory.api.login import LoginAPI

urlpatterns = [
    # path('', index.index, name="index"),
    path('api/users/', ListUser.as_view(), name="users"),
    # user creation and authentication
    path('api/users/register/', RegisterAPI.as_view(), name="api-register"),
    path('api/users/login/', LoginAPI.as_view(), name="api-login"),
    path('register/', RegistrationView.as_view(), name="register"),
]
