# Generated by Django 4.2 on 2023-05-17 05:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0002_company_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='company',
            old_name='contact_name',
            new_name='last_name',
        ),
        migrations.AddField(
            model_name='company',
            name='first_name',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]