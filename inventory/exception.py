import sentry_sdk
from rest_framework import status
from rest_framework.exceptions import APIException


class CustomBadRequest(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "An 400 request error occured"


class CustomUnauthorizedRequest(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = "An 401 request error occurred."


class CustomPaymentRequiredRequest(APIException):
    status_code = status.HTTP_402_PAYMENT_REQUIRED
    default_detail = "An 402 request error occurred."


class CustomForbiddenRequest(APIException):
    status_code = status.HTTP_403_FORBIDDEN
    default_detail = "An 403 request error occured"


class Custom404NotFoundRequest(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "An 404 request error occured"


class Custom405NotFoundRequest(APIException):
    status_code = status.HTTP_405_METHOD_NOT_ALLOWED
    default_detail = "An 405 request error occured"
