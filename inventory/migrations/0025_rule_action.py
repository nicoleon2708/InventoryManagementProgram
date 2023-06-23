# Generated by Django 4.2 on 2023-06-05 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0024_remove_locationstock_rule'),
    ]

    operations = [
        migrations.AddField(
            model_name='rule',
            name='action',
            field=models.CharField(choices=[('PULL', 'Pull From'), ('PUSH', 'Push To'), ('PUSH_AND_PULL', 'Push and Pull')], default='PULL', max_length=255),
        ),
    ]