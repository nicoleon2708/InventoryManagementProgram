from django.shortcuts import render
from django.views import generic
from rest_framework.views import APIView


def logout(request):
    context = {
        "logout": "Are you sure you want to logout!"
    }
    render(request, 'inventory/index.html', context)
