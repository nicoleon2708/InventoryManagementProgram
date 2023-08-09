import re

import django
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.test import Client, RequestFactory, TestCase
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from auth_app.api.auth_viewset import AuthViewSet
from auth_app.models.role import Role
from auth_app.models.user import User
from inventory.tests.test_base_model import BaseModelTestCase


class TestUserViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()

    def test_register_user(self):
        url = reverse("auth_app:auth-register")
        data = {
            "first_name": "Uyen Nhi",
            "last_name": "On Ha",
            "address": "367 nguyen van luong",
            "postal_code": "700000",
            "city": "Ho Chi Minh",
            "district": "7",
            "phone": "0828098274",
            "company_name": "TESTCOMPANY",
            "username": "onhauyennhi123",
            "email": "onhauyennhi123@gmail.com",
            "password": "onhauyennhi123",
            "confirm_password": "onhauyennhi123",
        }
        response = self.client_api.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertGreaterEqual(User.objects.count(), 1)
        self.assertEqual(
            User.objects.filter(first_name="Uyen Nhi").first().first_name, "Uyen Nhi"
        )

    def test_login_user(self):
        url = reverse("auth_app:auth-login")
        data = {"username": "nicoleon", "password": "admin1234"}
        response = self.client_api.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_info(self):
        url = reverse("auth_app:auth-get")
        self.client_api.force_authenticate(self.user)
        response = self.client_api.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_email_verification_user(self):
        email_token = RefreshToken.for_user(self.user).access_token
        url = reverse("auth_app:email-verification", kwargs={"token": email_token})
        response = self.client_api.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_send_password_recovery_mail(self):
        url = reverse("auth_app:recovery-password")
        data = {"email": "nicole.on.goldenowl@gmail.com"}
        response = self.client_api.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_reset_password_view(self):
        uidb64 = urlsafe_base64_encode(force_bytes(self.user.pk))
        recovery_token = PasswordResetTokenGenerator().make_token(self.user)
        data = {"new_password": "onhauyennhi", "conf_new_password": "onhauyennhi"}
        url = reverse(
            "auth_app:password-reset-confirm",
            kwargs={"uidb64": uidb64, "token": recovery_token},
        )
        response = self.client_api.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
