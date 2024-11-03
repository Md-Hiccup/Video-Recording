from django.db import models

class Recording(models.Model):
    video = models.FileField(upload_to='recordings/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Recording {self.id}"

    @property
    def url(self):
        print(self.video.url)
        return self.video.url
