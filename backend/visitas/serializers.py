from rest_framework import serializers
from .models import Visita

class VisitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visita
        fields = '__all__'

    #nn precisa registrar nem atualizar data do dia para nenhum tipo de verificação/update logo deixar assim.
    
    