from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from inventory.tests.test_base_model import BaseModelTestCase


class TestProductViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.user)

    def test_get_list_product(self):
        list_url = reverse("inventory:product-list")
        response = self.client_api.get(list_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_product(self):
        detail_url = reverse(
            "inventory:product-detail", kwargs={"pk": self.product2.pk}
        )
        response = self.client_api.get(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_product(self):
        delete_url = reverse(
            "inventory:product-delete-product", kwargs={"pk": self.product2.pk}
        )
        response = self.client_api.delete(delete_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_product(self):
        create_url = reverse("inventory:product-create-product")
        data = {
            "name": "iphone",
            "price": 1000,
            "group_rule": self.group_rule.pk,
            "unit": "per",
            "weight": 10,
            "barcode": "1231221",
            "company": self.user.company.pk,
        }
        response = self.client_api.post(create_url, data, format="multipart")
        print(f"{response.content.decode()}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_product(self):
        update_url = reverse(
            "inventory:product-update-product", kwargs={"pk": self.product2.pk}
        )
        data = {
            "name": "iphone test u",
            "price": 1000,
            "group_rule": self.group_rule.pk,
            "company": self.user.company.pk,
            "unit": "per u",
            "weight": 10,
            "barcode": "1231221u",
        }
        response = self.client_api.put(update_url, data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
