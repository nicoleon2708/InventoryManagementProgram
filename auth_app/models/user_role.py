from auth_app.models.user import User


class UserRole(User):
    class Meta:
        proxy = True

    def has_permission(self, permission):
        # customize this method to implement your own permission rules
        if self.role:
            return permission in self.role.permissions.all()
        return False
