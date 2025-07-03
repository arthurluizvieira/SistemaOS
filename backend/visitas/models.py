from django.db import models
from visitantes.models import Visitante

class Visita(models.Model):
    visitante = models.ForeignKey(Visitante, on_delete=models.CASCADE, related_name='visitas')
    data = models.DateField()
    hora_entrada = models.TimeField()
    hora_saida = models.TimeField(null=True, blank=True)
    empresa = models.CharField(max_length=100)
    ordem_de_servico = models.CharField(max_length=100)
    


    def __str__(self):
        return f"{self.visitante.nome} - {self.data}"
