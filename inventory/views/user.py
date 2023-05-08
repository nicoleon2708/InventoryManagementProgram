from typing import Any, Dict
from django.shortcuts import render
from django.utils import timezone
from django.urls import reverse
from django.views import generic
from django.http import HttpResponse
from inventory.forms.user import RegisterForm
from inventory.models.user import CustomUser


class RegistrationView(generic.CreateView):
    model = CustomUser
    template_name = 'inventory/register.html'
    form_class = RegisterForm
