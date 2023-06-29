from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from inventory.api.company_viewset import CompanyViewSet
from inventory.api.group_rule_viewset import GroupRuleViewSet
from inventory.api.location_stock_viewset import LocationStockViewSet
from inventory.api.location_viewset import LocationViewSet
from inventory.api.outcome_detail_viewset import OutcomeDetailViewSet
from inventory.api.outcome_viewset import OutcomeViewSet
from inventory.api.partner_viewset import PartnerViewSet
from inventory.api.product_viewset import ProductViewSet
from inventory.api.rule_viewset import RuleViewSet
from inventory.api.transfer_detail_viewset import TransferDetailViewSet
from inventory.api.transfer_viewset import TransferViewSet
from inventory.api.warehouse_viewset import WarehouseViewSet

router = routers.DefaultRouter()
router.register("warehouse", WarehouseViewSet, basename="warehouse")
router.register("product", ProductViewSet, basename="product")
router.register("location", LocationViewSet, basename="location")
router.register("partner", PartnerViewSet, basename="partner")
router.register("company", CompanyViewSet, basename="company")
router.register("stock", LocationStockViewSet, basename="location_stock")
router.register("rule", RuleViewSet, basename="rule_stocks")
router.register("group_rule", GroupRuleViewSet, basename="group_rule")
router.register("transfer", TransferViewSet, basename="transfer")
router.register("transfer_detail", TransferDetailViewSet, basename="transfer_detail")
router.register("outcome", OutcomeViewSet, basename="outcome")
router.register("outcome_detail", OutcomeDetailViewSet, basename="outcome_detail")


app_name = "inventory"
urlpatterns = []

urlpatterns += router.urls
