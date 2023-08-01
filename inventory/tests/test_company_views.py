from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from inventory.tests.test_base_model import BaseModelTestCase


class TestCompanyViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.user)

    def test_get_detail_company(self):
        detail_url = reverse(
            "inventory:company-detail", kwargs={"pk": self.user.company.pk}
        )
        response = self.client_api.get(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_company(self):
        delete_url = reverse(
            "inventory:company-delete-company", kwargs={"pk": self.user.company.pk}
        )
        response = self.client_api.delete(delete_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
