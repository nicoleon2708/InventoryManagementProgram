from django.forms.models import model_to_dict
from django.test import TestCase
from rest_framework_simplejwt.tokens import RefreshToken

from auth_app.models.role import Role
from auth_app.models.user import User
from inventory.models.group_rule import GroupRule
from inventory.models.location import Location
from inventory.models.location_stock import LocationStock
from inventory.models.outcome import Outcome
from inventory.models.outcome_detail import OutcomeDetail
from inventory.models.partner import Partner
from inventory.models.product import Product
from inventory.models.rule import Rule
from inventory.models.transfer import Transfer
from inventory.models.transfer_detail import TransferDetail
from inventory.models.warehouse import Warehouse


class BaseModelTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        super(BaseModelTestCase, cls).setUpClass()
        cls.role1 = Role.objects.create(
            type_of_roles=Role.TypeChoice.is_superuser,
        )
        cls.role2 = Role.objects.create(
            type_of_roles=Role.TypeChoice.is_admin,
        )
        cls.role3 = Role.objects.create(
            type_of_roles=Role.TypeChoice.is_owner,
        )

        cls.user = User.objects.create(
            first_name="Nicole",
            last_name="On",
            username="nicoleon",
            email="nicole.on.goldenowl@gmail.com",
            is_verified=True,
            company_name="GO",
            role=cls.role3,
        )
        cls.user.set_password("admin1234")
        cls.user.save()

        cls.group_rule = GroupRule.objects.create(
            name="Test Group rule", description="Hello", user=cls.user
        )

        cls.product = Product.objects.create(
            name="iPhone 12 promax",
            price=100,
            unit="per",
            weight=10,
            barcode="123SS",
            company=cls.user.company,
            group_rule=cls.group_rule,
        )

        cls.product2 = Product.objects.create(
            name="Cake",
            price=1002,
            unit="piece",
            weight=10,
            barcode="123S22S",
            company=cls.user.company,
            group_rule=cls.group_rule,
        )

        cls.warehouse = Warehouse.objects.create(
            name="Test Warehouse",
            address="367 nguyen van luong",
            postal_code="12724s",
            city="Ho Chi Minh",
            district="6",
            company=cls.user.company,
        )

        cls.location1 = Location.objects.create(
            name="Test Location1",
            address="254 Phan Anh",
            city="Ho Chi Minh",
            district="Tan Phu",
            postal_code="238211",
            warehouse=cls.warehouse,
        )

        cls.location2 = Location.objects.create(
            name="Test Location2",
            address="254 Nguyen Thi Thap",
            city="Ho Chi Minh",
            district="7",
            postal_code="238211",
            warehouse=cls.warehouse,
        )

        cls.location_stock1 = LocationStock.objects.create(
            location=cls.location1, product=cls.product, quantity=199
        )

        cls.location_stock2 = LocationStock.objects.create(
            location=cls.location2, product=cls.product, quantity=100
        )

        cls.rule1 = Rule.objects.create(
            name="Test rule",
            description="Hello",
            group=cls.group_rule,
            source_location=cls.location1,
            destination_location=cls.location2,
            types_of_rule=Rule.TypeChoice.get_stock_directly,
            user=cls.user,
        )
        location_external = Location.objects.get(
            name__contains="External Outcome", warehouse=cls.warehouse
        )

        cls.rule2 = Rule.objects.create(
            name="Test rule 2",
            description="hello",
            group=cls.group_rule,
            source_location=cls.location2,
            destination_location=location_external,
            types_of_rule=Rule.TypeChoice.get_stock_or_pull_from_location,
            user=cls.user,
        )

        cls.partner = Partner.objects.create(
            company_name="Golden Owl",
            contact_name="Nicole",
            contact_phone="0908742789",
            address="466 Nguyen Thi Thap",
            postal_code="398128",
            city="Ho Chi Minh",
            district="7",
            user=cls.user,
        )
        location_external.partner = cls.partner
        location_external.save()

        cls.outcome = Outcome.objects.create(
            user=cls.user, partner=cls.partner, warehouse=cls.warehouse
        )

        cls.outcome_detail = OutcomeDetail.objects.create(
            outcome=cls.outcome,
            product=cls.product,
            quantity=20,
            price=cls.product.price,
            unit=cls.product.unit,
        )

        cls.transfer = Transfer.objects.create(
            user=cls.user,
            outcome=cls.outcome,
            source_location=cls.location1,
            destination_location=cls.location2,
        )

        cls.transfer_detail = TransferDetail.objects.create(
            transfer=cls.transfer,
            product=cls.product,
            quantity=20,
            price=cls.product.price,
        )
