import requests
from django.conf import settings


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
