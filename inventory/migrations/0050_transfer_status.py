# Generated by Django 4.2 on 2023-07-20 10:48

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("inventory", "0049_transfer_total_price"),
    ]

    operations = [
        migrations.AddField(
            model_name="transfer",
            name="status",
            field=models.CharField(
                blank=True,
                choices=[
                    ("PENDING", "On Pending"),
                    ("RECEIVED", "Received"),
                    ("TRANSFER", "On Transfer"),
                    ("COMPLETED", "Completed"),
                    ("FAILED", "Failed"),
                ],
                default="PENDING",
                max_length=255,
            ),
        ),
    ]
