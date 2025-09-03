from django.db import models

# Create your models here.

class Visitante(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, blank=True, null=True)
    rg = models.CharField(max_length=20, blank=True, null=True)
    empresa = models.CharField(max_length=100)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    entrada = models.DateField(null=True, blank=True) # Dia que a pessoa vem renovar/ quando a pessoa renovou




    def __str__(self):
        return self.nome
    

