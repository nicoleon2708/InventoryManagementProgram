# Generated by Django 4.2 on 2023-06-22 02:43

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("inventory", "0042_remove_outcome_destination_location_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="transferdetail",
            name="status",
            field=models.CharField(
                blank=True,
                choices=[
                    ("('PENDING', 'On Pending')", "On Pending"),
                    ("('RECEIVED', 'Received')", "Received"),
                    ("('TRANSFER', 'On Transfer')", "On Transfer"),
                    ("('COMPLETED', 'Completed')", "Completed"),
                    ("FAILED", "Failed"),
                ],
                default="('PENDING', 'On Pending')",
                max_length=255,
            ),
        ),
    ]
