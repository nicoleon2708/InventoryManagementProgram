from django.contrib import admin


class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "date_joined", "is_verified", "role"]
