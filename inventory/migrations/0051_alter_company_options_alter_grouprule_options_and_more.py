# Generated by Django 4.2 on 2023-08-03 08:28

import django.db.models.deletion
from django.db import migrations, models

import inventory.models.product


class Migration(migrations.Migration):
    dependencies = [
        ("inventory", "0050_transfer_status"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="company",
            options={
                "ordering": ["-id"],
                "verbose_name": "company",
                "verbose_name_plural": "companies",
            },
        ),
        migrations.AlterModelOptions(
            name="grouprule",
            options={
                "ordering": ["-id"],
                "verbose_name": "group of rules",
                "verbose_name_plural": "groups of rules",
            },
        ),
        migrations.AlterModelOptions(
            name="location",
            options={
                "ordering": ["-id"],
                "verbose_name": "Location",
                "verbose_name_plural": "Locations",
            },
        ),
        migrations.AlterModelOptions(
            name="locationstock",
            options={
                "ordering": ["-id"],
                "verbose_name": "Location Stock",
                "verbose_name_plural": "Location Stocks",
            },
        ),
        migrations.AlterModelOptions(
            name="outcome",
            options={
                "ordering": ["-created_date"],
                "verbose_name": "Outcome",
                "verbose_name_plural": "Outcomes",
            },
        ),
        migrations.AlterModelOptions(
            name="outcomedetail",
            options={
                "ordering": ["-id"],
                "verbose_name": "Outcome detail",
                "verbose_name_plural": "Outcome details",
            },
        ),
        migrations.AlterModelOptions(
            name="partner",
            options={
                "ordering": ["-id"],
                "verbose_name": "Partner",
                "verbose_name_plural": "Partners",
            },
        ),
        migrations.AlterModelOptions(
            name="product",
            options={
                "ordering": ["-id"],
                "verbose_name": "Product",
                "verbose_name_plural": "Products",
            },
        ),
        migrations.AlterModelOptions(
            name="rule",
            options={
                "ordering": ["-id"],
                "verbose_name": "Rule",
                "verbose_name_plural": "Rules",
            },
        ),
        migrations.AlterModelOptions(
            name="transfer",
            options={
                "ordering": ["-id"],
                "verbose_name": "Transfer",
                "verbose_name_plural": "Transfers",
            },
        ),
        migrations.AlterModelOptions(
            name="transferdetail",
            options={
                "ordering": ["-id"],
                "verbose_name": "Transfer Detail",
                "verbose_name_plural": "Transfer Details",
            },
        ),
        migrations.AlterModelOptions(
            name="warehouse",
            options={
                "ordering": ["-id"],
                "verbose_name": "Warehouse",
                "verbose_name_plural": "Warehouses",
            },
        ),
        migrations.AlterField(
            model_name="location",
            name="partner",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="locations",
                to="inventory.partner",
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="image",
            field=models.ImageField(
                blank=True,
                default="images/no_image_product.png",
                max_length=200,
                null=True,
                upload_to=inventory.models.product.Product.upload_to,
            ),
        ),
    ]