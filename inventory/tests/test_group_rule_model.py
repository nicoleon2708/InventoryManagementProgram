import unittest

from django.test import Client, TestCase

from auth_app.models.user import User
from inventory.models.group_rule import GroupRule
from inventory.tests.test_base_model import BaseModelTestCase


class GroupRuleTestCase(BaseModelTestCase):
    def test_group_rule_can_be_created(self):
        self.assertIsInstance(self.group_rule, GroupRule)
        self.assertEqual(self.group_rule.name, "Test Group rule")
