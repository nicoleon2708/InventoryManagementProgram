import unittest

from django.test import Client, TestCase

from auth_app.models.role import Role


class RoleTestCase(TestCase):
    def setUp(self):
        self.role1 = Role.objects.create(
            type_of_roles=Role.TypeChoice.is_superuser,
        )
        self.role2 = Role.objects.create(
            type_of_roles=Role.TypeChoice.is_admin,
        )
        self.role3 = Role.objects.create(
            type_of_roles=Role.TypeChoice.is_owner,
        )

    def test_role_superuser_can_be_created(self):
        self.assertEqual(self.role1.type_of_roles, "SUPERUSER")

    def test_role_admin_can_be_created(self):
        self.assertEqual(self.role2.type_of_roles, "ADMIN")

    def test_role_admin_can_be_created(self):
        self.assertEqual(self.role3.type_of_roles, "OWNER")

    def tearDown(self):
        self.role1.delete()
        self.role2.delete()
        self.role3.delete()
