from django.db import models

# Create your models here.

class OrdemServico(models.Model):
    Numero_OS = models.CharField(max_length=20, unique=True)
    Nome_OS = models.CharField(max_length=50)
    Descricao_OS = models.TextField()
    Profissional_responsavel = models.CharField(max_length=100)
    Empresa_responsável = models.CharField(max_length=100)
    data_servico = models.DateField()
    hora_entrada = models.TimeField()
    hora_saida = models.TimeField()

    # --- IMPLEMENTAÇÃO SOFT DELETE ---
    is_deleted = models.BooleanField(default=False)

    def delete(self, *args, **kwargs):
        self.is_deleted = True
        self.save()
    # ---------------------------------

    def __str__(self):
        return f"Ordem #{self.Numero_OS} - {self.Nome_OS}"