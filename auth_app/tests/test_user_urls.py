from django.test import TestCase
from django.urls import resolve, reverse

from auth_app.api.auth_viewset import AuthViewSet


class UserTestUrls(TestCase):
    def test_register_url(self):
        pass
