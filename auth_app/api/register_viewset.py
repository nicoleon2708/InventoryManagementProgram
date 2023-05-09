from inventory.models.user import User
from django.http import JsonResponse
from rest_framework import viewsets
from auth_app.serializers.register_serializer import RegisterSerializer
from rest_framework import status


class RegisterUserViewSet(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        user_data = request.data
        data = {}
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid():
            serializer.save()
            data['status'] = "Registration succesful"
            data['user'] = serializer.data
            return JsonResponse(
                data=data,
                status=status.HTTP_201_CREATED,
                safe=False
            )

