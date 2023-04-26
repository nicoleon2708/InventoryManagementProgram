# Generated by Django 4.2 on 2023-04-26 09:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0005_rename_logistics_transfer_outcome_outcome_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rule',
            name='group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='rules', to='inventory.grouprule'),
        ),
        migrations.AlterField(
            model_name='transfer',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transfers', to='inventory.user'),
        ),
    ]
