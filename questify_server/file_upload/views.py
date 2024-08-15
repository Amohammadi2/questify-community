from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from drf_spectacular.types import OpenApiTypes
from .serializers import FileUploadSerializer, FileUploadResponse

class FileUploadView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={
            status.HTTP_201_CREATED: FileUploadResponse,
            status.HTTP_400_BAD_REQUEST: OpenApiResponse()
        },
        request={
        'multipart/form-data': {
            'type': 'object',
            'properties': {
                'file': {
                    'type': 'string',
                    'format': 'binary'
                    }
                }
            }
        },
    )
    def post(self, request):
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            serialized_response = FileUploadResponse(data={"file_url": request.build_absolute_uri(serializer.instance.file.url)})
            serialized_response.is_valid()
            return Response(serialized_response.data, status=201)
        return Response(serializer.errors, status=400)