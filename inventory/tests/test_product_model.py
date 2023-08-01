import unittest

from django.test import Client, TestCase

from inventory.models.product import Product
from inventory.tests.test_base_model import BaseModelTestCase


class ProductTestCase(BaseModelTestCase):
    def test_product_can_be_created(self):
        self.assertIsInstance(self.product, Product)
        self.assertEqual(self.product.name, "iPhone 12 promax")
