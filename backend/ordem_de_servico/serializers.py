from rest_framework import serializers
from ordem_de_servico.models import OrdemServico

class OrdemDeServicoSerializer(serializers.ModelSerializer):
    class Meta:
         model = OrdemServico
         fields = '__all__'