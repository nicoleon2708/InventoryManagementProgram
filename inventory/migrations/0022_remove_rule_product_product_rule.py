# Generated by Django 4.2 on 2023-06-05 09:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("inventory", "0021_rule_product"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="rule",
            name="product",
        ),
        migrations.AddField(
            model_name="product",
            name="rule",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.DO_NOTHING,
                related_name="products",
                to="inventory.rule",
            ),
        ),
    ]
