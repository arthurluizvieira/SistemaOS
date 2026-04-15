from rest_framework import serializers
from .models import Visita

class VisitaSerializer(serializers.ModelSerializer):
    visitante_nome = serializers.CharField(source='id_visitante.nome', read_only=True)
    empresa_nome = serializers.CharField(source='id_empresa.Nome', read_only=True)

    class Meta:
        model = Visita
        fields = '__all__'