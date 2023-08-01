import unittest

from django.test import TestCase

from auth_app.models.user import User
from inventory.models.group_rule import GroupRule
from inventory.models.rule import Rule
from inventory.tests.test_base_model import BaseModelTestCase


class RuleTestCase(BaseModelTestCase):
    def test_rule_can_be_created(self):
        self.assertIsInstance(self.rule, Rule)
        self.assertEqual(self.rule.name, "Test rule")
