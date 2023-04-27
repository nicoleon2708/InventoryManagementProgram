from django.contrib import admin


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'company', 'created_date']
