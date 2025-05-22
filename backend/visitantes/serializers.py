from rest_framework import serializers
from .models import Visitante
from validate_docbr import CPF

class VisitanteSerializer(serializers.ModelSerializer):
    class Meta:
         model = Visitante
         fields = '__all__'

    def validate(self, data):
        cpf = data.get('cpf', '')
        rg = data.get('rg', '')

        if not cpf and not rg:
            raise serializers.ValidationError("Preencha pelo menos CPF ou RG.")

        if cpf:
            validador = CPF()
            if not validador.validate(cpf):
                raise serializers.ValidationError("CPF inválido.")

        return data