from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from inventory.models.rule import Rule
from inventory.tests.test_base_model import BaseModelTestCase


class TestRuleViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.user)

    def test_get_list_rule(self):
        list_url = reverse("inventory:rule_stocks-list")
        response = self.client_api.get(list_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_rule(self):
        detail_url = reverse(
            "inventory:rule_stocks-detail", kwargs={"pk": self.rule1.pk}
        )
        response = self.client_api.get(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_rule(self):
        detail_url = reverse(
            "inventory:rule_stocks-delete-rule", kwargs={"pk": self.rule1.pk}
        )
        response = self.client_api.delete(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_set_up_rule_for_product(self):
        set_up_url = reverse("inventory:rule_stocks-set-up-rule")
        data = {
            "name": "test rule",
            "types_of_rule": Rule.TypeChoice.get_stock_directly,
            "source_location": self.location1.pk,
            "destination_location": self.location2.pk,
            "group": self.group_rule.pk,
            "description": "for testing",
            "user": self.user.pk,
        }
        response = self.client_api.post(set_up_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_rule(self):
        update_url = reverse(
            "inventory:rule_stocks-update-rule", kwargs={"pk": self.rule1.pk}
        )
        data = {
            "name": "test update rule",
            "types_of_rule": Rule.TypeChoice.get_stock_or_pull_from_location,
            "source_location": self.location2.pk,
            "destination_location": self.location1.pk,
            "group": self.group_rule.pk,
            "description": "update",
            "user": self.user.pk,
        }
        response = self.client_api.put(update_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
