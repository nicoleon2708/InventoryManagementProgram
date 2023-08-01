import re

import django
from django.test import Client, RequestFactory, TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

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

    def test_logout_user(self):
        url = reverse('auth_app:auth-logout')
        self.client_api.force_authenticate(self.user)
        response = self.client_api.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_info(self):
        url = reverse('auth_app:auth-get')
        self.client_api.force_authenticate(self.user)
        response = self.client_api.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_email_verification_user(self):
        pass
        # url = reverse('auth_app:email-verification')
        # data = {
        #     "first_name": "Uyen Nhi",
        #     "last_name": "On Ha",
        #     "address": "367 nguyen van luong",
        #     "postal_code": "700000",
        #     "city": "Ho Chi Minh",
        #     "district": "7",
        #     "phone": "0828098274",
        #     "company_name": "TESTCOMPANY",
        #     "username": "onhauyennhi123",
        #     "email": "onhauyennhi123@gmail.com",
        #     "password": "onhauyennhi123",
        #     "confirm_password": "onhauyennhi123",
        # }
        # response = self.client.post(url, data, format='json')
        # self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # # Get token from email
        # token_regex = r"email-verification/([A-Za-z0-9:\-]+)\/"
        # email_content = django.core.mail.outbox[0].body
        # match = re.search(token_regex, email_content)
        # assert match.groups(), "Could not find the token in the email" # You might want to use some other way to raise an error for this
        # token = match.group(1)

        # # Verify
        # response = self.client.post(url, {'key': token})
        # print(f"email verification {response.content.decode()}")
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
