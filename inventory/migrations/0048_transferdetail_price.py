# Generated by Django 4.2 on 2023-07-14 03:17

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("inventory", "0047_transfer_is_import"),
    ]

    operations = [
        migrations.AddField(
            model_name="transferdetail",
            name="price",
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]