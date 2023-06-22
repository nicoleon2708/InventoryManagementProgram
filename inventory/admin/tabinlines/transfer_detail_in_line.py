from typing import Any
from django import forms
from django.contrib import admin
from django.forms.models import BaseInlineFormSet
from django.urls import resolve
from django.db.models.query import QuerySet
from django.http.request import HttpRequest
from inventory.models.transfer_detail import TransferDetail
from inventory.models.transfer import Transfer


class TransferDetailInLine(admin.TabularInline):
    model = TransferDetail
    fields = ['product', 'quantity', 'status']
    extra = 0

    def get_formset(self, request, obj, **kwargs):
        self.transfer = obj
        return super(TransferDetailInLine, self).get_formset(request, obj, **kwargs)
    