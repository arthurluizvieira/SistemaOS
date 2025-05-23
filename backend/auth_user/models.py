from django.db import models

# Create your models here.

class Login(models.Model):
    usuario = models.CharField(max_length=100, blank=False, null=False)
    senha = models.CharField(max_length=20, blank=False, null=False)

    def __str__(self):
        return self.nome
    