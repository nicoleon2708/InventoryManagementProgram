from django.test import TestCase

from auth_app.models.user import User

# Create your tests here.


class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(
            first_name="User",
            last_name="Test",
            username="usertest1",
            password="123456",
            is_owner=True,
        )
        User.objects.create(
            first_name="User",
            last_name="Test",
            username="usertest2",
            password="123457",
            is_superuser=True,
        )
