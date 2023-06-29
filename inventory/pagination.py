from rest_framework import pagination
from rest_framework.response import Response


class CustomPagination(pagination.PageNumberPagination):
    page_size = 10
    max_page_size = None
    page_size_query_param = "page_size"

    def get_paginated_response(self, data):
        if self.request.query_params.get("page_size"):
            self.page_size = int(self.request.query_params.get("page_size"))

        return Response(
            {
                "links": {
                    "next": self.get_next_link(),
                    "previous": self.get_previous_link(),
                },
                "page_size": self.page_size,
                "count": self.page.paginator.count,
                "current_page": self.page.number,
                "results": data,
            }
        )
