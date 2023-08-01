import unittest

from django.test import TestCase

from auth_app.models.user import User
from inventory.models.warehouse import Warehouse
from inventory.tests.test_base_model import BaseModelTestCase


class WarehouseTestCase(BaseModelTestCase):
    def test_warehouse_can_be_created(self):
        self.assertEqual(self.warehouse, Warehouse)
        self.assertEqual(self.warehouse.name, "Test Warehouse")
