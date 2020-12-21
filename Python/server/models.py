from django.db import models

class Analysis(models.Model):
    text = models.CharField(max_length=2000)

    def __str__(self):
        return self.text

    class Meta:
        ordering = ('text',)


