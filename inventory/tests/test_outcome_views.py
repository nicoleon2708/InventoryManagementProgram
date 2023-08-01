from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from inventory.tests.test_base_model import BaseModelTestCase


class TestOutcomeViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.user)

    def test_get_list_outcome(self):
        list_url = reverse("inventory:outcome-list")
        response = self.client_api.get(list_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_outcome(self):
        detail_url = reverse("inventory:outcome-detail", kwargs={"pk": self.outcome.pk})
        response = self.client_api.get(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_outcome(self):
        detail_url = reverse(
            "inventory:outcome-delete-outcome", kwargs={"pk": self.outcome.pk}
        )
        response = self.client_api.delete(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_outcome(self):
        create_outcome_url = reverse("inventory:outcome-create-outcome")
        detail = {
            "id": self.outcome_detail.pk,
            "outcome": self.outcome_detail.outcome.pk,
            "product": self.outcome_detail.product.pk,
            "quantity": self.outcome_detail.quantity,
            "price": self.outcome_detail.price,
            "unit": self.outcome_detail.product.unit
        }
        order_detail = [
            detail
        ]
        data = {
            "partner": self.partner.pk,
            "warehouse": self.warehouse.pk,
            "order_detail": order_detail
        }
        response = self.client_api.post(create_outcome_url, data, format="json")
        print(f"{response.content.decode()}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
