# Generated by Django 4.2 on 2023-05-29 09:21

from django.db import migrations, models
import inventory.models.product


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0010_product_company'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, max_length=200, null=True, upload_to=inventory.models.product.Product.upload_to),
        ),
    ]