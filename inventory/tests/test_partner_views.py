from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from inventory.models.location import Location
from inventory.tests.test_base_model import BaseModelTestCase


class TestPartnerViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.user)

    def test_get_list_partner(self):
        list_url = reverse("inventory:partner-list")
        response = self.client_api.get(list_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_partner(self):
        detail_url = reverse("inventory:partner-detail", kwargs={"pk": self.partner.pk})
        response = self.client_api.get(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_partner(self):
        detail_url = reverse(
            "inventory:partner-delete-partner", kwargs={"pk": self.partner.pk}
        )
        response = self.client_api.delete(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_register_partner(self):
        register_url = reverse("inventory:partner-register-partner")
        data = {
            "company_name": "test partner",
            "contact_name": "naomi",
            "contact_phone": "0828098274",
            "address": "23",
            "postal_code": "1233",
            "city": "hn",
            "district": "312",
            "company": self.user.company.pk,
        }
        response = self.client_api.post(register_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_partner(self):
        update_url = reverse(
            "inventory:partner-update-partner", kwargs={"pk": self.partner.pk}
        )
        data = {
            "company_name": "test partner update",
            "contact_name": "naomi update",
            "contact_phone": "0828098274",
            "address": "23 update",
            "postal_code": "1233 update",
            "city": "hn",
            "district": "312",
            "company": self.user.company.pk,
        }
        response = self.client_api.put(update_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_external_location_warehouse_of_partner(self):
        url = reverse(
            "inventory:partner-update-external-location", kwargs={"pk": self.partner.pk}
        )
        location_external = Location.objects.get(
            name__contains="External Outcome", warehouse=self.warehouse
        )
        data = {"location": location_external.pk}
        response = self.client_api.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
