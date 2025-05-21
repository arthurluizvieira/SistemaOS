from django.db import models

# Create your models here.

class Visitante(models.Model):
    nome = models.CharField(max_length=100)
    documento = models.CharField(max_length=50)
    empresa = models.CharField(max_length=100)
    telefone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.nome
    

