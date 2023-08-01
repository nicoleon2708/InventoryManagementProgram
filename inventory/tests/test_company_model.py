import unittest

from django.test import Client, TestCase

from auth_app.models.user import User
from inventory.models.company import Company

from inventory.tests.test_base_model import BaseModelTestCase


class CompanyTestCase(BaseModelTestCase):

    def test_company_can_be_created(self):
        self.assertIsInstance(self.user.company, Company)
        self.assertEqual(self.user.company.name, "GO")

    def test_company_has_address(self):
        self.assertIsNotNone(self.user.company.address, 'Company does not have address')
