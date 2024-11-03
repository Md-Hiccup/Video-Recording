from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Recording
from .serializers import RecordingSerializer
from django.shortcuts import render


def index(request):
    return render(request, 'recorder/index.html')

class RecordingUploadView(APIView):
    def post(self, request):
        serializer = RecordingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecordingListView(APIView):
    def get(self, request):
        recordings = Recording.objects.all()
        serializer = RecordingSerializer(recordings, many=True)
        return Response(serializer.data)


class PlaybackView(APIView):
    def get(self, request, pk):
        recording = Recording.objects.get(pk=pk)
        return render(request, 'recorder/playback.html', {'recording': recording})
