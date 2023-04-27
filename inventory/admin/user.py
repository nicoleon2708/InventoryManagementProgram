from django.contrib import admin


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'company', 'date_joined']
