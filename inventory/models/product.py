from django.db import models
from inventory.models.company import Company

class Product(models.Model):
    def upload_to(instance, filename):
        return 'images/{filename}'.format(filename=filename)
    
    name = models.CharField(max_length=255, blank=True)
    unit = models.CharField(max_length=255, blank=True)
    weight = models.FloatField(default=0, blank=True, null=True)
    quantity = models.IntegerField(default=0, blank=True, null=True)
    price = models.FloatField(default=0, blank=True, null=True)
    image = models.ImageField(
        upload_to=upload_to,
        max_length=200,
        blank=True,
        null=True
    )
    description = models.TextField(max_length=255, blank=True)
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='products',
        null=True,
        blank=True
    )

    class Meta:
        db_table = "product"
        verbose_name = "Product"
        verbose_name_plural = "Products"



    def __str__(self):
        return f"Product{self.name}"
