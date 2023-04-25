from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    unit = models.CharField(max_length=100)
    weight = models.FloatField(default=0)
    quantity = models.IntegerField(default=0)
    price = models.FloatField(default=0)
    sku = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    image = models.ImageField(
        upload_to='products/% Y/% m/% d/',
        max_length=200,
        blank=False
    )
    description = models.TextField(max_length=500, blank=False)

    def __str__(self):
        return f"Product{self.name}"
