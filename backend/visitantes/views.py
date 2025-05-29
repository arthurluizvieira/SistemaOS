from django.shortcuts import render
from rest_framework.decorators import api_view  #para definir métodos como GET, POST , etc...
from rest_framework.response import Response   # estrutura de respostas HTTP
from rest_framework import status   # 200, 404 entre outros códigos http
from .models import Visitante   # O modelo que estamos trabalhando
from .serializers import VisitanteSerializer  # O serializers que estamos trabalhando

from rest_framework.permissions import IsAuthenticated # Importa permissoes, que exige user autenticado
from rest_framework.decorators import permission_classes    

# Create your views here.


# VIEW que vai lidar com essas duas ações : GET (listar) e POST para criar visitantes  
# As views protegidas do backend foram atualizadas para utilizar o decorador @permission_classes, provenientes
# do Django rest framework para garantir que somente usuários autenticados (com token JWT válido) consigam
# acessar essas rotas.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated]) ## ATUALIZAÇÃO *PARA EXIGIR QUE O USER ESTEJA AUTENTICADO*
def lista_ou_cria_visitantes(request):
     # GET - vai buscar todos visitantes e serializar para JSON
     if request.method == 'GET':
         visitantes = Visitante.objects.all()
         serializer = VisitanteSerializer(visitantes, many=True)
         return Response(serializer.data)
    
    # POST- receber dados, validar eles com o serializer e salvar no BD ,caso seja inválido vai retornar erros
     elif request.method == 'POST':
         serializer = VisitanteSerializer(data=request.data)
         if serializer.is_valid():
             serializer.save()
             return Response(serializer.data, status=201)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View aq lida (edita ou deleta) com um visitante específico (GET, PUT ou DELETE), identificado por pk (ID)
@api_view(['GET', 'PUT', 'DELETE'])
#Esse padrão foi aplicado também às outras rotas (POST, PUT, DELETE) da funcionalidade de visitantes,
#  reforçando a segurança após a implementação do sistema de login com JWT.
@permission_classes([IsAuthenticated]) ## ATUALIZAÇÃO *PARA EXIGIR IGUAL LÁ ENCIMA, EXIGIR AUTENTICATE*
def detalhe_visitante(request, pk):
    # aqui tenta buscar o visitante e caso não encontre, não exista, ele retorna o erro 404
    try:
        visitante = Visitante.objects.get(pk=pk)
    except Visitante.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # o GET retorna os dados do visitante específico
    if request.method == 'GET':
        serializer = VisitanteSerializer(visitante)
        return Response(serializer.data)
    
    # o PUT serve para atualizar (editar) o visitante com os novos dados inseridos
    elif request.method == 'PUT':
        serializer = VisitanteSerializer(visitante, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # o DELETE como nome já diz ele REMOOVE, DELETA o visitante do BD
    elif request.method == 'DELETE':
        visitante.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)