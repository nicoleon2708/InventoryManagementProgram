import unittest

from django.test import TestCase

from auth_app.models.user import User
from inventory.models.location import Location
from inventory.models.warehouse import Warehouse
from inventory.tests.test_base_model import BaseModelTestCase


class LocationTestCase(BaseModelTestCase):

    def test_location_can_be_created(self):
        self.assertIsInstance(self.location1, Location)
        self.assertEqual(self.location1.name, "Test Location1")
