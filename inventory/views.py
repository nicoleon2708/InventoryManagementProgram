from django.shortcuts import render
from django.views import generic
from rest_framework.views import APIView

# Create your views here.


def index(request):
    context = {
        "context": "hello"
    }
    return render(request, 'inventory/index.html', context)
