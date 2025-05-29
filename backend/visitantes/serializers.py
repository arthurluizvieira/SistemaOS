from rest_framework import serializers # transforma modelos em JSON e valida dados
from .models import Visitante   # o Model que será serializado
from validate_docbr import CPF  # Biblioteca para validação de CPF
from datetime import date, datetime   # para trabalhar com DATAS

class VisitanteSerializer(serializers.ModelSerializer):
    class Meta:
         model = Visitante
         fields = '__all__'
         read_only_fields = ['entrada'] #para o front não enviar o campo entrada , apenas receber como resposta
    

    def validate(self, data):
        # recuperar os dados de CPF e RG (caso forem enviados)
        cpf = data.get('cpf')
        rg = data.get('rg')
        
        # pelo menos um campo entre CPF e RG deve estar preenchido
        if not cpf and not rg:
            raise serializers.ValidationError("Deve ser preenchido algum dos campos entre CPF ou RG.")

    # aqui a biblioteca que nois importou entra em ação, o validate-docbr vai realizar a verificação e ver
    # se o CPF é válido, se não for vai dar erro, caso seja válido irá return data (retornar dados validados)
        if cpf:
            validador = CPF()
            if not validador.validate(cpf):
                raise serializers.ValidationError("CPF inválido.")

        return data
    
    # o campo entrada será preenchido automaticamente com a data de hoje ao criar um novo Visitante
    def create(self, validated_data):
        validated_data['entrada'] = date.today()
        return super().create(validated_data)

    # quando atualizada também vai renovar a data de entrada , vai servir pique uma "renovação"
    def update(self, instance, validated_data):
        validated_data['entrada'] = date.today()
        return super().update(instance, validated_data)
    
    # def update(self, instance, validated_data):
    # # Renova a entrada só se for um parâmetro explícito
    # if 'renovar' in self.context.get('request').data:
    #     validated_data['entrada'] = date.today()
    # return super().update(instance, validated_data)
