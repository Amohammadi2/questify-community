from rest_framework import serializers
from .models import File

class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['file']


class FileUploadResponse(serializers.Serializer):
    file_url = serializers.CharField()
    