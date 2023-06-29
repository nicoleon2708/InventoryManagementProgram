# Generated by Django 4.2 on 2023-06-02 10:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("inventory", "0017_remove_locationstock_stock_items"),
    ]

    operations = [
        migrations.AddField(
            model_name="locationstock",
            name="product",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="location_stocks",
                to="inventory.product",
            ),
        ),
        migrations.AddField(
            model_name="locationstock",
            name="stock",
            field=models.IntegerField(default=0),
        ),
        migrations.DeleteModel(
            name="Stock",
        ),
    ]
