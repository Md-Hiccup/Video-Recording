# recorder/serializers.py
from rest_framework import serializers
from .models import Recording

class RecordingSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='video.url', read_only=True)

    class Meta:
        model = Recording
        fields = ['id', 'video', 'url', 'created_at']
