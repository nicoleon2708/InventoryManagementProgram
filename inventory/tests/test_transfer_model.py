import unittest

from django.test import TestCase

from inventory.models.transfer import Transfer
from inventory.tests.test_base_model import BaseModelTestCase


class TransferTestCase(BaseModelTestCase):
    def test_transfer_can_be_created(self):
        self.assertIsInstance(self.transfer, Transfer)
        self.assertEqual(self.transfer.user, self.user)
