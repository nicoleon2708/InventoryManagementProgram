import unittest

from django.test import TestCase

from inventory.models.outcome import Outcome
from inventory.tests.test_base_model import BaseModelTestCase


class OutcomeTestCase(BaseModelTestCase):
    def test_outcome_can_be_created(self):
        self.assertIsInstance(self.outcome, Outcome)
        self.assertEqual(self.outcome.user, self.user)
