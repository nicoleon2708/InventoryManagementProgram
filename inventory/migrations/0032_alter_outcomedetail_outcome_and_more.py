# Generated by Django 4.2 on 2023-06-08 04:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("inventory", "0031_remove_transfer_warehouse_transfer_warehouse"),
    ]

    operations = [
        migrations.AlterField(
            model_name="outcomedetail",
            name="outcome",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="order_detail",
                to="inventory.outcome",
            ),
        ),
        migrations.RemoveField(
            model_name="outcomedetail",
            name="product",
        ),
        migrations.AddField(
            model_name="outcomedetail",
            name="product",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="outcomes",
                to="inventory.product",
            ),
        ),
    ]
