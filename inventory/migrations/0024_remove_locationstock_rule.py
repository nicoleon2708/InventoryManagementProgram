# Generated by Django 4.2 on 2023-06-05 10:23

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("inventory", "0023_locationstock_rule_alter_rule_group"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="locationstock",
            name="rule",
        ),
    ]
