from django.shortcuts import render
from django.views import generic
from rest_framework.views import APIView
from inventory.serializers.user import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import authenticate


class LoginAPI(APIView):
    """
        login
    """
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            response = {
                "message": "Login successful",
                "token": user.auth_token.key
            }
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            response = {
                "message": "username or password is not correct, try again!"
            }
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        content = {
            'user': str(request.user),
            'auth': str(request.auth),
        }
        return Response(data=content, status=status.HTTP_200_OK)
