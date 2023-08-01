import unittest

from django.test import TestCase

from inventory.models.partner import Partner
from inventory.tests.test_base_model import BaseModelTestCase


class PartnerTestCase(BaseModelTestCase):
    def test_partner_can_be_created(self):
        self.assertIsInstance(self.partner, Partner)

    def test_partner_has_address(self):
        self.assertIsNotNone(self.partner.address, 'Partner does not have address')
