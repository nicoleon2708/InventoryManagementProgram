import json

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from inventory.tests.test_base_model import BaseModelTestCase


class TestTransferViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.user)

    def test_get_list_transfer(self):
        list_url = reverse("inventory:transfer-list")
        response = self.client_api.get(list_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_transfer(self):
        detail_url = reverse("inventory:transfer-detail", kwargs={"pk": self.transfer.pk})
        response = self.client_api.get(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_transfer(self):
        detail_url = reverse(
            "inventory:transfer-delete-transfer", kwargs={"pk": self.transfer.pk}
        )
        response = self.client_api.delete(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def create_purchase_invoice(self):
        purchase_detail = {
            "product": self.product.pk,
            "quantity": 300,
            "price": 20
        }
        data = {
            "user": self.user.pk,
            "source_location": self.location1.pk,
            "destination_location": self.location1.pk,
            "is_import": True,
            "transfer_detail": [purchase_detail]
        }
        create_purchase_url = reverse(
            "inventory:transfer-import_product"
        )
        response = self.client_api.post(create_purchase_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_confirm_transfer(self):
        confirm_transfer = reverse('inventory:transfer-confirm-stock-transfer', kwargs={'pk':self.transfer.pk})
        response = self.client_api.post(confirm_transfer, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_confirm_purchase(self):
        confirm_purchase = reverse('inventory:transfer-confirm-purchase', kwargs={'pk':self.transfer.pk})
        response = self.client_api.put(confirm_purchase, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
