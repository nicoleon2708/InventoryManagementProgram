from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from inventory.api.product_viewset import ProductViewSet
from inventory.api.warehouse_viewset import WarehouseViewSet
from inventory.api.location_viewset import LocationViewSet
from inventory.api.location_stock_viewset import LocationStockViewSet

router = routers.DefaultRouter()
router.register('warehouse', WarehouseViewSet, basename='warehouse')
router.register('product', ProductViewSet, basename='product')
router.register('location', LocationViewSet, basename='location')
router.register('stock', LocationStockViewSet, basename='location_stock')

app_name = "inventory"
urlpatterns = [
]
urlpatterns += router.urls
