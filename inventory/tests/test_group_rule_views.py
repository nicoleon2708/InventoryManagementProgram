from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from inventory.tests.test_base_model import BaseModelTestCase


class TestRuleViews(APITestCase, BaseModelTestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.user)

    def test_get_list_group_rule(self):
        list_url = reverse("inventory:group_rule-list")
        response = self.client_api.get(list_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_group_rule(self):
        detail_url = reverse(
            "inventory:group_rule-detail", kwargs={"pk": self.group_rule.pk}
        )
        response = self.client_api.get(detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_group_rule(self):
        create_url = reverse("inventory:group_rule-create-group-rule")
        data = {"name": "test group rule", "description": "new"}
        response = self.client_api.post(create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_group_rule(self):
        update_url = reverse(
            "inventory:group_rule-update-group-rule", kwargs={"pk": self.group_rule.pk}
        )
        data = {"name": "test group rule update", "description": "new update"}
        response = self.client_api.put(update_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_delete_group_rule(self):
        delete_url = reverse(
            "inventory:group_rule-delete-group-rule", kwargs={"pk": self.group_rule.pk}
        )
        response = self.client_api.delete(delete_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
