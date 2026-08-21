from django.db import models
from visitantes.models import Visitante
from empresas.models import Empresas
from django.contrib.auth.models import User

class Visita(models.Model):
    id_visitante = models.ForeignKey('visitantes.Visitante', on_delete=models.CASCADE)
    id_empresa = models.ForeignKey('empresas.Empresas', on_delete=models.CASCADE)

    data = models.DateField()
    hora_entrada = models.TimeField()
    hora_saida = models.TimeField(null=True, blank=True)

    numero_os = models.CharField(max_length=50)

    fk_usuario_id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    # --- IMPLEMENTAÇÃO SOFT DELETE ---
    is_deleted = models.BooleanField(default=False)

    def delete(self, *args, **kwargs):
        self.is_deleted = True
        self.save()
    # ---------------------------------

    def __str__(self):
        return f"Visita {self.id}"