from collections import defaultdict
from copy import deepcopy

from rest_framework.validators import ValidationError

from inventory.models.location_stock import LocationStock
from inventory.models.transfer import Transfer
from inventory.models.transfer_detail import TransferDetail


class TransferService:
    @staticmethod
    def action_pull_from(stock_source_location, stock_destination_location, quantity):
        stock_source_location.quantity -= quantity
        stock_source_location.save()
        stock_destination_location.quantity += quantity
        stock_destination_location.save()

    @staticmethod
    def get_stock_directly(
        rule, stock_source_location, stock_destination_location, product, quantity
    ):
        if stock_destination_location is None:
            stock_destination_location = LocationStock.objects.create(
                location=rule.destination_location, product=product, quantity=0
            )
            stock_destination_location.save()
        TransferService.action_pull_from(
            stock_source_location, stock_destination_location, quantity
        )

    @staticmethod
    def get_location_stock_of_product_at_location(location, product):
        location_stocks = location.location_stocks.all()
        try:
            product_stock = location_stocks.get(
                product=product.id, location=location.id
            )
        except LocationStock.DoesNotExist:
            product_stock = None
        return product_stock

    @staticmethod
    def get_rule_match_destination(destination, list_rule):
        list_match_rule = list(
            filter(lambda x: x.destination_location == destination, list_rule)
        )
        if list_match_rule:
            rule = list_match_rule[0]
            list_rule.remove(rule)
        else:
            rule = None
        return rule

    @staticmethod
    def get_list_transfer_detail_of_transfer(transfer):
        try:
            list_transfer_detail = transfer.transfer_detail.all()
        except TransferDetail.DoesNotExist:
            list_transfer_detail = None
        return list_transfer_detail

    @staticmethod
    def get_transfer_based_on_current_rule(rule):
        try:
            transfer = Transfer.objects.get(
                source_location=rule.source_location,
                destination_location=rule.destination_location,
                # transfer_detail__product=product
            )
        except Transfer.DoesNotExist:
            transfer = None
        return transfer

    @staticmethod
    def get_transfer_detail_of_transfer(transfer, product):
        try:
            transfer_detail = TransferDetail.objects.get(
                transfer=transfer, product=product
            )
        except TransferDetail.DoesNotExist:
            transfer_detail = None
        return transfer_detail

    @staticmethod
    def create_transfer(
        user, outcome, source_location, destination_location, *args, **kwargs
    ):
        transfer = Transfer(
            user=user,
            outcome=outcome,
            source_location=source_location,
            destination_location=destination_location,
            *args,
            **kwargs
        )
        transfer.save()
        return transfer

    @staticmethod
    def create_transfer_detail(transfer, product, quantity, status, *args, **kwargs):
        transfer_detail = TransferDetail(
            transfer=transfer,
            product=product,
            quantity=quantity,
            status=status,
            *args,
            **kwargs
        )
        transfer_detail.save()
        return transfer_detail

    @staticmethod
    def check_match_transfer(transfer_list, match_rule):
        for transfer in transfer_list:
            if (
                transfer.source_location == match_rule.source_location
                and transfer.destination_location == match_rule.destination_location
            ):
                return transfer
        return None

    @staticmethod
    def check_match_transfer_detail(transfer, product):
        try:
            transfer_detail = TransferDetail.objects.get(
                transfer=transfer, product=product
            )
        except TransferDetail.DoesNotExist:
            transfer_detail = None
        return transfer_detail

    @staticmethod
    def create_transfer_and_transfer_detail_while_valid(
        match_rule, product, quantity, transfer_list, outcome, status, note=""
    ):
        transfer = TransferService.check_match_transfer(transfer_list, match_rule)
        transfer_detail = TransferService.check_match_transfer_detail(transfer, product)
        if not transfer:
            transfer = TransferService.create_transfer(
                user=outcome.user,
                outcome=outcome,
                source_location=match_rule.source_location,
                destination_location=match_rule.destination_location,
            )
        if not transfer_detail:
            transfer_detail = TransferService.create_transfer_detail(
                transfer=transfer,
                product=product,
                quantity=quantity,
                status=status,
                note=note,
            )
        transfer_list.append(transfer)

    @staticmethod
    def logistic(destination, product, quantity, outcome, transfer_list):
        list_rule = list(deepcopy(product.group_rule.rules.all()))
        match_rule = TransferService.get_rule_match_destination(destination, list_rule)
        while match_rule:
            stock_source_location = (
                TransferService.get_location_stock_of_product_at_location(
                    match_rule.source_location, product
                )
            )
            stock_destination_location = (
                TransferService.get_location_stock_of_product_at_location(
                    match_rule.destination_location, product
                )
            )
            if match_rule.types_of_rule == "STRAIGHT":
                if (
                    stock_source_location is None
                    or stock_source_location.quantity == 0
                    or stock_source_location.quantity < quantity
                ):
                    TransferService.create_transfer_and_transfer_detail_while_valid(
                        match_rule=match_rule,
                        product=product,
                        quantity=quantity,
                        transfer_list=transfer_list,
                        outcome=outcome,
                        status=TransferDetail.StatusChoice.failed,
                        note="Product is out of stock!",
                    )
                    break
                else:
                    TransferService.get_stock_directly(
                        match_rule,
                        stock_source_location,
                        stock_destination_location,
                        product,
                        quantity,
                    )
                    TransferService.create_transfer_and_transfer_detail_while_valid(
                        match_rule=match_rule,
                        product=product,
                        quantity=quantity,
                        transfer_list=transfer_list,
                        outcome=outcome,
                        status=TransferDetail.StatusChoice.completed,
                    )
                    break
            original_quantity = quantity
            if match_rule.types_of_rule == "ANT_LC":
                if (
                    stock_source_location is None
                    or stock_source_location.quantity == 0
                    or stock_source_location.quantity < quantity
                ):
                    TransferService.create_transfer_and_transfer_detail_while_valid(
                        match_rule=match_rule,
                        product=product,
                        quantity=quantity,
                        transfer_list=transfer_list,
                        outcome=outcome,
                        status=TransferDetail.StatusChoice.on_transfer,
                    )
                    if (
                        stock_source_location
                        and stock_source_location.quantity < quantity
                    ):
                        quantity = original_quantity - stock_source_location.quantity
                    match_rule = TransferService.get_rule_match_destination(
                        match_rule.source_location, list_rule
                    )
                else:
                    TransferService.get_stock_directly(
                        match_rule,
                        stock_source_location,
                        stock_destination_location,
                        product,
                        quantity,
                    )
                    TransferService.create_transfer_and_transfer_detail_while_valid(
                        match_rule=match_rule,
                        product=product,
                        quantity=quantity,
                        transfer_list=transfer_list,
                        outcome=outcome,
                        status=TransferDetail.StatusChoice.completed,
                    )
                    break
        else:
            raise ValidationError("No suitable rules")
