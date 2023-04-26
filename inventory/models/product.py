from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    unit = models.CharField(max_length=100)
    weight = models.FloatField(default=0)
    quantity = models.IntegerField(default=0)
    price = models.FloatField(default=0)
    image = models.ImageField(
        upload_to='./files/product/images/',
        max_length=200,
        blank=True,
        null=True
    )
    description = models.TextField(max_length=500, blank=True)

    class Meta:
        db_table = "product"

    def __str__(self):
        return f"Product{self.name}"
