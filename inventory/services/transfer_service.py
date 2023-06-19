from inventory.models.location_stock import LocationStock
from inventory.models.rule import Rule
from rest_framework.validators import ValidationError
from copy import deepcopy


class TransferService:  
    @staticmethod
    def action_pull_from(stock_source_location, stock_destination_location, quantity):
        stock_source_location.quantity -= quantity
        stock_source_location.save()
        stock_destination_location.quantity += quantity
        stock_destination_location.save()
    
    @staticmethod
    def get_stock_directly(rule, stock_source_location, stock_destination_location, product, quantity):        
        if stock_destination_location is None:
            stock_destination_location = LocationStock.objects.create(
                location=rule.destination_location,
                product=product,
                quantity=0
            )
            stock_destination_location.save()
        else:
            if rule.action == 'PULL':
                TransferService.action_pull_from(
                    stock_source_location,
                    stock_destination_location,
                    quantity
                )

    @staticmethod
    def get_location_stock_of_product_at_location(location, product):
        location_stocks = location.location_stocks.all()
        try:
            product_stock = location_stocks.get(product=product.id, location=location.id)
        except LocationStock.DoesNotExist:
            product_stock = None
        return product_stock

    def get_rule_match_destination(destination, list_rule):
        list_match_rule = list(filter(lambda x: x.destination_location==destination, list_rule))
        if list_match_rule:
            rule = list_match_rule[0]
            list_rule.remove(rule)
        else:
            rule = None
        return rule

    @staticmethod
    def logistic(destination, product, quantity):
        list_rule = list(deepcopy(product.group_rule.rules.all()))
        match_rule = TransferService.get_rule_match_destination(destination, list_rule)
        while match_rule:
            print(f"current rule: {match_rule}")
            print(f"list rule: {list_rule}" )
            stock_source_location = TransferService.get_location_stock_of_product_at_location(match_rule.source_location, product)
            stock_destination_location = TransferService.get_location_stock_of_product_at_location(match_rule.destination_location, product)

            if match_rule.types_of_rule == 'STRAIGHT':
                if stock_source_location is None or stock_source_location.quantity == 0 or stock_source_location.quantity < quantity:
                    raise ValidationError("This product is out of stock!")
                else:
                    TransferService.get_stock_directly(match_rule, stock_source_location, stock_destination_location, product, quantity)
                    break

            if match_rule.types_of_rule == 'ANT_LC':
                if stock_source_location is None or stock_source_location.quantity == 0 or stock_source_location.quantity < quantity:
                    if stock_source_location.quantity < quantity:
                        quantity = quantity - stock_source_location.quantity
                    match_rule = TransferService.get_rule_match_destination(match_rule.source_location, list_rule)
                else:
                    TransferService.get_stock_directly(match_rule, stock_source_location, stock_destination_location, product, quantity)
                    break
        else:
            raise ValidationError("No suitable rules")
        