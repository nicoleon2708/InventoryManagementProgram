from typing import Any, Dict

from django.http import HttpResponse
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone
from django.views import generic

from inventory.forms.user import RegisterForm
from inventory.models.user import User


class RegistrationView(generic.CreateView):
    model = User
    template_name = "inventory/register.html"
    form_class = RegisterForm
