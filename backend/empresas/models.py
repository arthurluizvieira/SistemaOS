from django.db import models

# Create your models here.

class Empresas(models.Model):
    Nome = models.CharField(max_length=100)
    cnpj = models.CharField(max_length=50)
    Contato = models.CharField(max_length=100)

    def __str__(self):
        return self.Nome