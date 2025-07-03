from django.db import models

# Create your models here.

class Empresas(models.Model):
    Nome = models.CharField(max_length=100, blank=False, null=False)
    cnpj = models.CharField(max_length=50, blank=False, null=False)
    Contato = models.CharField(max_length=100, blank=False, null=False)
    endereco = models.CharField(max_length=150, blank=True, null=True)
    responsavel = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.Nome