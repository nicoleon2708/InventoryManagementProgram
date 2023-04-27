# Generated by Django 4.2 on 2023-04-27 02:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0011_alter_rule_types_of_rule'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rule',
            name='group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='rules', to='inventory.grouprule'),
        ),
    ]
