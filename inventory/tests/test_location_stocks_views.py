from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from inventory.tests.test_base_model import BaseModelTestCase


class TestLocationStockViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.user)

    def test_get_list_location_stock(self):
        list_url = reverse("inventory:location_stock-list")
        response = self.client_api.get(list_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_location_stock(self):
        detail_url = reverse(
            "inventory:location_stock-detail", kwargs={"pk": self.location_stock1.pk}
        )
        response = self.client_api.get(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_location_stock(self):
        detail_url = reverse(
            "inventory:location_stock-delete-stock-location",
            kwargs={"pk": self.location_stock2.pk},
        )
        response = self.client_api.delete(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_add_stock_product_to_location(self):
        add_stock_url = reverse("inventory:location_stock-add-stock")
        data = {
            "location": self.location1.pk,
            "product": self.product2.pk,
            "quantity": 100,
        }
        response = self.client_api.post(add_stock_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
