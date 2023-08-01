import json

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from inventory.tests.test_base_model import BaseModelTestCase


class TestTransferDetailViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.user)

    def test_get_list_transfer_detail(self):
        list_url = reverse("inventory:transfer_detail-list")
        response = self.client_api.get(list_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_transfer(self):
        detail_url = reverse("inventory:transfer_detail-detail", kwargs={"pk": self.transfer.pk})
        response = self.client_api.get(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
