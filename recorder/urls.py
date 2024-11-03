from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import RecordingListView, RecordingUploadView, PlaybackView, index

urlpatterns = [
    path('', index, name='index'),
    path('upload/', RecordingUploadView.as_view(), name='upload_recording'),
    path('recordings/', RecordingListView.as_view(), name='list_recordings'),
    path('playback/<int:pk>/', PlaybackView.as_view(), name='playback'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
