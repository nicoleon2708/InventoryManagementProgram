from copy import deepcopy

from rest_framework.validators import ValidationError

from inventory.models.location import Location
from inventory.models.outcome_detail import OutcomeDetail
from inventory.models.rule import Rule


class OutcomeService:
    @staticmethod
    def get_list_outcome_detail_of_outcome(outcome):
        try:
            list_outcome_detail = outcome.order_detail.all()
        except OutcomeDetail.DoesNotExist:
            list_outcome_detail = None
        return list_outcome_detail

    @staticmethod
    def calculate_add_more_quantity(outcome, outcome_detail, quantity):
        total_price = outcome.total_price
        price = outcome_detail.price
        total_price += price * quantity
        return total_price

    @staticmethod
    def calculate_total_price(outcome):
        list_outcome_detail = OutcomeService.get_list_outcome_detail_of_outcome(outcome)
        total_price = outcome.total_price
        if list_outcome_detail:
            for outcome_detail in list_outcome_detail:
                quantity = outcome_detail.quantity
                price = outcome_detail.price
                total_price += quantity * price
        else:
            total_price = 0
        return total_price

    @staticmethod
    def calculate_remove_product_quantity(outcome, outcome_detail, quantity):
        total_price = outcome.total_price
        price = outcome_detail.price
        total_price -= price * quantity
        return total_price

    @staticmethod
    def get_partner_location(outcome):
        partner = outcome.partner
        try:
            partner_location = Location.objects.get(partner=partner.id)
        except Location.DoesNotExist:
            partner_location = None
        return partner_location

    @staticmethod
    def get_all_location_of_warehouse(outcome):
        warehouse = outcome.warehouse
        try:
            list_location = Location.objects.filter(warehouse=warehouse)
        except Location.DoesNotExist:
            list_location = None
        return list_location

    @staticmethod
    def get_external_location_of_partner(outcome):
        list_location = OutcomeService.get_all_location_of_warehouse(outcome)
        partner = outcome.partner
        try:
            external_outcome = list_location.get(partner=partner)
        except Location.DoesNotExist:
            external_outcome = None
        return external_outcome

    @staticmethod
    def check_status_transfer_detail(outcome):
        for transfer in outcome.transfers.all():
            transfer_detail_list = transfer.transfer_detail.all()
            if not all(
                detail.status in ["COMPLETED", "Completed"]
                for detail in transfer_detail_list
            ):
                return False
        return True
