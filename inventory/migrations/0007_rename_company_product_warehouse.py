# Generated by Django 4.2 on 2023-05-26 08:38

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("inventory", "0006_product_company"),
    ]

    operations = [
        migrations.RenameField(
            model_name="product",
            old_name="company",
            new_name="warehouse",
        ),
    ]
