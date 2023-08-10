import requests
import sentry_sdk
from django.conf import settings
from rest_framework.views import exception_handler


def send_mail(subject, message, recipient):
    return requests.post(
        settings.MAILGUN_SERVER_URL,
        auth=("api", f"{settings.MAILGUN_ACCESS_KEY}"),
        data={
            "from": f"Admin User <mailgun@{settings.MAILGUN_SERVER_NAME}>",
            "to": [{recipient}],
            "subject": {subject},
            "text": {message},
        },
    )


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        response.data["status_code"] = response.status_code
        sentry_sdk.capture_exception(exc)

    return response
