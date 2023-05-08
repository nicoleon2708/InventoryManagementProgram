from django.shortcuts import render
from django.views import generic
from inventory.serializers.user import UserSerializer, RegisterSerializer
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import status


class RegisterAPI(CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            response = {

                "status": "Successful",
                "user": UserSerializer(user, context=self.get_serializer_context()).data,

            }
            return Response(
                data=response,
                status=status.HTTP_201_CREATED,
            )
        return Response(
            data=serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
