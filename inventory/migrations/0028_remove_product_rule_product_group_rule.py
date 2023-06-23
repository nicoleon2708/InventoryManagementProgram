# Generated by Django 4.2 on 2023-06-06 02:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0027_alter_rule_types_of_rule'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='rule',
        ),
        migrations.AddField(
            model_name='product',
            name='group_rule',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='products', to='inventory.grouprule'),
        ),
    ]