from inventory.models.location_stock import LocationStock


class LocationStockService:

    @staticmethod
    def substract_stock(location_stock, sub_quantity):
        location_stock.quantity -= sub_quantity
        location_stock.save()
        location_stock.product.quantity -= sub_quantity
        location_stock.product.save()
    
    @staticmethod
    def transfer_stock(location_stock, location, quantity):
        product = location_stock.product
        try:
            exist_stock = LocationStock.objects.get(product=product, location=location)
            exist_stock.quantity += quantity
            exist_stock.save()
        except LocationStock.DoesNotExist:
            new_location_stock = LocationStock.objects.create(
                product=product,
                location=location,
                quantity=quantity
            )
        location_stock.quantity -= quantity
        location_stock.save()

            
