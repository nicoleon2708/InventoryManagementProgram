from rest_framework.exceptions import APIException


class BadRequest400(APIException):
    status_code = 400
    default_detail = "An 400 request error occurred."
