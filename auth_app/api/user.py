from inventory.models.user import CustomUser
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from auth_app.serializers.user import UserSerializer, RegisterSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import authenticate
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from auth_app.api.authentication import ExpiringTokenAuthentication
import datetime
import pytz


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [ExpiringTokenAuthentication]


class RegisterUserViewSet(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    queryset = CustomUser.objects.all()

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


# class RegisterAPI(APIView):
#     """
#         Register user
#     """

#     def post(self, request, *args, **kwargs):
#         serializer = RegisterSerializer(data=request.data)
#         data = {}
#         if serializer.is_valid():
#             user = serializer.save()
#             data['status'] = "Registration successful"
#             data['user'] = serializer.data
#             return JsonResponse(
#                 data=data,
#                 status=status.HTTP_201_CREATED,
#                 safe=False
#             )
#         else:
#             data = serializer.errors
#             return JsonResponse(
#                 data=data,
#                 status=status.HTTP_400_BAD_REQUEST,
#                 safe=False
#             )


class CustomAuthTokenLogin(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        utc_now = datetime.datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.utc)
        result = Token.objects.filter(
            user=user, created__lt=utc_now-datetime.timedelta(days=1)).delete()
        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'username': user.username,
        })
