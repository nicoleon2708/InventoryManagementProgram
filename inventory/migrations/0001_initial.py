# Generated by Django 4.2 on 2023-05-15 09:47

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Company",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(blank=True, max_length=255)),
                ("contact_name", models.CharField(blank=True, max_length=255)),
                ("phone", models.CharField(blank=True, max_length=255)),
                ("address", models.CharField(blank=True, max_length=255)),
                ("postal_code", models.CharField(blank=True, max_length=255)),
                ("city", models.CharField(blank=True, max_length=255)),
                ("district", models.CharField(blank=True, max_length=255)),
            ],
            options={
                "verbose_name": "company",
                "verbose_name_plural": "companies",
                "db_table": "company",
            },
        ),
        migrations.CreateModel(
            name="GroupRule",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(blank=True, max_length=255)),
                ("description", models.TextField(blank=True, max_length=255)),
            ],
            options={
                "verbose_name": "group of rules",
                "verbose_name_plural": "groups of rules",
                "db_table": "group_rule",
            },
        ),
        migrations.CreateModel(
            name="Location",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("address", models.CharField(blank=True, max_length=255)),
                ("postal_code", models.CharField(blank=True, max_length=255)),
                ("city", models.CharField(blank=True, max_length=255)),
                ("district", models.CharField(blank=True, max_length=255)),
            ],
            options={
                "verbose_name": "Location",
                "verbose_name_plural": "Locations",
                "db_table": "location",
            },
        ),
        migrations.CreateModel(
            name="Outcome",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("total_price", models.FloatField(blank=True, default=0, null=True)),
                ("created_date", models.DateTimeField(auto_now_add=True, null=True)),
                (
                    "status",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("('PENDING', 'On Pending')", "On Pending"),
                            ("('RECEIVED', 'Received')", "Received"),
                            ("('SHIPPING', 'On Shipping')", "On Shipping"),
                            ("COMPLETED", "Completed"),
                        ],
                        default="('PENDING', 'On Pending')",
                        max_length=255,
                    ),
                ),
            ],
            options={
                "verbose_name": "Outcome",
                "verbose_name_plural": "Outcomes",
                "db_table": "outcome",
                "ordering": ["created_date"],
            },
        ),
        migrations.CreateModel(
            name="Partner",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("company_name", models.CharField(blank=True, max_length=255)),
                ("contact_name", models.CharField(blank=True, max_length=255)),
                ("contact_phone", models.CharField(blank=True, max_length=255)),
                ("address", models.CharField(blank=True, max_length=255)),
                ("postal_code", models.CharField(blank=True, max_length=255)),
                ("city", models.CharField(blank=True, max_length=255)),
                ("district", models.CharField(blank=True, max_length=255)),
            ],
            options={
                "verbose_name": "Partner",
                "verbose_name_plural": "Partners",
                "db_table": "partner",
            },
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(blank=True, max_length=255)),
                ("unit", models.CharField(blank=True, max_length=255)),
                ("weight", models.FloatField(blank=True, default=0, null=True)),
                ("quantity", models.IntegerField(blank=True, default=0, null=True)),
                ("price", models.FloatField(blank=True, default=0, null=True)),
                (
                    "image",
                    models.ImageField(
                        blank=True,
                        max_length=200,
                        null=True,
                        upload_to="./inventory/static/inventory/images/products/",
                    ),
                ),
                ("description", models.TextField(blank=True, max_length=255)),
            ],
            options={
                "verbose_name": "Product",
                "verbose_name_plural": "Products",
                "db_table": "product",
            },
        ),
        migrations.CreateModel(
            name="Transfer",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "outcome",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="transfers",
                        to="inventory.outcome",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="transfers",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Transfer",
                "verbose_name_plural": "Transfers",
                "db_table": "transfer",
            },
        ),
        migrations.CreateModel(
            name="Warehouse",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(blank=True, max_length=100)),
            ],
            options={
                "db_table": "warehouse",
            },
        ),
        migrations.CreateModel(
            name="TransferDetail",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("status", models.CharField(blank=True, max_length=100)),
                ("method", models.CharField(blank=True, max_length=100)),
                ("scheduled_time", models.DateTimeField(auto_now_add=True, null=True)),
                ("note", models.TextField(blank=True, max_length=500)),
                ("transportation_type", models.CharField(blank=True, max_length=100)),
                ("product", models.ManyToManyField(to="inventory.product")),
                (
                    "transfer",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="transfer_detail",
                        to="inventory.transfer",
                    ),
                ),
            ],
            options={
                "verbose_name": "Transfer Detail",
                "verbose_name_plural": "Transfer Details",
                "db_table": "transfer_detail",
            },
        ),
        migrations.AddField(
            model_name="transfer",
            name="warehouse",
            field=models.ManyToManyField(to="inventory.warehouse"),
        ),
        migrations.CreateModel(
            name="Rule",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(blank=True, max_length=255)),
                ("description", models.TextField(blank=True, max_length=255)),
                (
                    "types_of_rule",
                    models.CharField(
                        choices=[
                            (
                                "STRAIGHT",
                                "If location A of Warehouse A have, get straight",
                            ),
                            ("ANT_LC", "If location A don't have, get from location B"),
                        ],
                        default="STRAIGHT",
                        max_length=255,
                    ),
                ),
                (
                    "group",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="rules",
                        to="inventory.grouprule",
                    ),
                ),
            ],
            options={
                "verbose_name": "Rule",
                "verbose_name_plural": "Rules",
                "db_table": "rule",
            },
        ),
        migrations.CreateModel(
            name="OutcomeDetail",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("quantity", models.IntegerField(blank=True, default=0, null=True)),
                ("price", models.FloatField(blank=True, default=0, null=True)),
                ("unit", models.CharField(blank=True, max_length=255)),
                (
                    "outcome",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="order_detail",
                        to="inventory.outcome",
                    ),
                ),
                ("product", models.ManyToManyField(to="inventory.product")),
            ],
            options={
                "verbose_name": "Outcome detail",
                "verbose_name_plural": "Outcome details",
                "db_table": "outcome_detail",
            },
        ),
        migrations.AddField(
            model_name="outcome",
            name="partner",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="partner_outcome",
                to="inventory.partner",
            ),
        ),
        migrations.AddField(
            model_name="outcome",
            name="user",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="partner_outcome",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.CreateModel(
            name="LocationStock",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("stock", models.IntegerField(blank=True, default=0, null=True)),
                (
                    "location",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="location_stocks",
                        to="inventory.location",
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="stocked_at",
                        to="inventory.product",
                    ),
                ),
            ],
            options={
                "verbose_name": "Location Stock",
                "verbose_name_plural": "Location Stocks",
                "db_table": "location_stock",
            },
        ),
        migrations.AddField(
            model_name="location",
            name="warehouse",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="locations",
                to="inventory.warehouse",
            ),
        ),
    ]
