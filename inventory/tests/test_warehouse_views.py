import json

from django.urls import reverse
from rest_framework import status
from rest_framework.test import (APIClient, APIRequestFactory, APITestCase,
                                 force_authenticate)

from auth_app.models.user import User
from inventory.api.warehouse_viewset import WarehouseViewSet
from inventory.tests.test_base_model import BaseModelTestCase


class TestWarehouseViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.user)

    def test_get_list_warehouse(self):
        list_url = reverse("inventory:warehouse-list")
        response = self.client_api.get(list_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_warehouse(self):
        detail_url = reverse(
            "inventory:warehouse-detail", kwargs={"pk": self.warehouse.pk}
        )
        response = self.client_api.get(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_warehouse(self):
        detail_url = reverse(
            "inventory:warehouse-delete-warehouse", kwargs={"pk": self.warehouse.pk}
        )
        response = self.client_api.delete(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_warehouse(self):
        create_url = reverse("inventory:warehouse-create-warehouse")
        data = {
            "name": "Test warehouse2",
            "address": "377 HHH",
            "postal_code": "92811",
            "city": "Ha Noi",
            "district": "6",
            "company": self.user.company.pk,
        }
        response = self.client_api.post(create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_warehouse(self):
        update_url = reverse(
            "inventory:warehouse-update-warehouse", kwargs={"pk": self.warehouse.pk}
        )
        data = {
            "name": "Test warehouse2 update",
            "address": "377 HHH update",
            "postal_code": "92811 update",
            "city": "Ha Noi update",
            "district": "6",
            "company": self.user.company.pk,
        }
        response = self.client_api.put(update_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
