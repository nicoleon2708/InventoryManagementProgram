import json

from django.forms.models import model_to_dict
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase, force_authenticate

from inventory.tests.test_base_model import BaseModelTestCase


class TestLocationViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.user)

    def test_get_list_location(self):
        list_url = reverse("inventory:location-list")
        response = self.client_api.get(list_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_location(self):
        detail_url = reverse(
            "inventory:location-detail", kwargs={"pk": self.location1.pk}
        )
        response = self.client_api.get(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_location(self):
        delete_url = reverse(
            "inventory:location-delete-location", kwargs={"pk": self.location2.pk}
        )
        response = self.client_api.delete(delete_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_location(self):
        create_url = reverse("inventory:location-create-location")
        data = {
            "name": "location test",
            "address": "3828 NVL",
            "postal_code": "12332",
            "city": "HCM",
            "district": "2",
            "warehouse": self.warehouse.pk,
        }
        response = self.client_api.post(create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_location(self):
        update_url = reverse(
            "inventory:location-update-location", kwargs={"pk": self.location2.pk}
        )
        data = {
            "name": "location update test",
            "address": "3828 NVL update",
            "postal_code": "12332 update",
            "city": "HCM update",
            "district": "2",
            "warehouse": self.warehouse.pk,
        }
        response = self.client_api.put(update_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
