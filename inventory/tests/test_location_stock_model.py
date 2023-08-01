import unittest

from inventory.models.location_stock import LocationStock
from inventory.tests.test_base_model import BaseModelTestCase


class LocationStockTestCase(BaseModelTestCase):
    def setUp(self):
        self.location_stock2 = LocationStock.objects.create(
            location=self.location2, product=self.product, quantity=0
        )

    def test_location_stock_can_be_created(self):
        self.assertIsInstance(self.location_stock2, LocationStock)

    def test_location_stock_out_of_stock(self):
        self.assertEqual(self.location_stock2.quantity, 0)
