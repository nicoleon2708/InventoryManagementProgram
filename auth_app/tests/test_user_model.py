import unittest

from django.contrib.auth import authenticate
from django.test import Client, TestCase

from auth_app.models.user import User
from inventory.tests.test_base_model import BaseModelTestCase


class UserTestCase(BaseModelTestCase):
    def test_user_can_be_created(self):
        self.assertTrue(isinstance(self.user, User))
        self.assertEqual(self.user.first_name, "Nicole")

    def test_user_is_verified(self):
        self.assertTrue(self.user.is_verified, True)

    def test_user_is_not_verified(self):
        self.assertTrue(self.user.is_verified, False)
