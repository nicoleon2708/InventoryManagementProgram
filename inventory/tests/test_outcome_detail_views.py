from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from inventory.tests.test_base_model import BaseModelTestCase


class TestOutcomeDetailViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.user)

    def test_get_list_outcome_detail(self):
        list_url = reverse("inventory:outcome_detail-list")
        response = self.client_api.get(list_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_outcome_detail(self):
        detail_url = reverse("inventory:outcome_detail-detail", kwargs={"pk": self.outcome_detail.pk})
        response = self.client_api.get(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_add_product_outcome(self):
        data = {
            "outcome": self.outcome.pk,
            "product": self.product.pk,
            "quantity": 300,
        }
        add_product_url = reverse(
            "inventory:outcome_detail-add-product-outcome"
        )
        response = self.client_api.post(add_product_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_create_outcome(self):
    #     create_outcome_url = reverse("inventory:outcome-create-outcome")
    #     data = {
    #         "partner": self.partner.pk,
    #         "warehouse": self.warehouse.pk,
    #         "order_detail": self.outcome_detail.pk
    #     }
    #     response = self.client_api.post(create_outcome_url, data, format="json")
    #     print(f"{response.content.decode()}")
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
