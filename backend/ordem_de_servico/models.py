from django.db import models

# Create your models here.

# class OrdemDeServico(models.Model):
#     from django.db import models

class OrdemServico(models.Model):
    Numero_OS = models.CharField(max_length=20, unique=True)
    Nome_OS = models.CharField(max_length=50)
    Descricao_OS = models.TextField()
    Profissional_responsavel = models.CharField(max_length=100)
    Empresa_responsável = models.CharField(max_length=100)
    data_servico = models.DateField()
    hora_entrada = models.TimeField()
    hora_saida = models.TimeField()

    def __str__(self):
        return f"Ordem #{self.Numero_OS} - {self.Profissional_responsavel}"

    

    def __str__(self):
        return self.Nome
    

