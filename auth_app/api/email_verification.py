import threading
from django.core.mail import EmailMessage
from django.core.mail import send_mail
from django.conf import settings
from auth_app.models.user import User
import random
from django.contrib.sites.shortcuts import get_current_site


def send_otp_via_email(user, request):
    current_site = get_current_site(request)
    email_subject = 'Activate your account'
