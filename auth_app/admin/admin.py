from django.contrib import admin

from auth_app.admin.role import RoleAdmin
from auth_app.admin.user import UserAdmin
from auth_app.models.role import Role
from auth_app.models.user import User

admin.site.register(User, UserAdmin)
admin.site.register(Role, RoleAdmin)
