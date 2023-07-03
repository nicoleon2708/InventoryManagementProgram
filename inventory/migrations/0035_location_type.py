# Generated by Django 4.2 on 2023-06-19 07:40

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("inventory", "0034_remove_rule_action_alter_product_group_rule"),
    ]

    operations = [
        migrations.AddField(
            model_name="location",
            name="type",
            field=models.CharField(
                blank=True,
                choices=[
                    ("('INTERNAL', 'Internal Location')", "Internal Location"),
                    ("PARTNER", "Partner Location"),
                ],
                default="('INTERNAL', 'Internal Location')",
                max_length=255,
            ),
        ),
    ]