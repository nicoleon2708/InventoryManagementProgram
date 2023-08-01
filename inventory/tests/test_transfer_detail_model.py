import unittest

from django.test import TestCase

from inventory.models.transfer_detail import TransferDetail
from inventory.tests.test_base_model import BaseModelTestCase


class TransferDetailTestCase(BaseModelTestCase):
    def test_transfer_detail_can_be_created(self):
        self.assertIsInstance(self.transfer_detail, TransferDetail)
        self.assertEqual(self.transfer_detail.transfer, self.transfer)
