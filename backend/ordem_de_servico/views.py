# from django.shortcuts import render
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from ordem_de_servico.models import OrdemDeServico
# from ordem_de_servico.serializers import OrdemDeServicoSerializer

# # Create your views here.

# @api_view(['GET', 'POST'])
# def visualizar_ou_criar_os(request):
#      if request.method == 'GET':
#          ordem_de_servico = OrdemDeServico.objects.all()
#          serializer = OrdemDeServicoSerializer(ordem_de_servico, many=True)
#          return Response(serializer.data)
    
#      elif request.method == 'POST':
#          serializer = OrdemDeServicoSerializer(data=request.data)
#          if serializer.is_valid():
#              serializer.save()
#              return Response(serializer.data, status=201)
#          return Response(serializer.errors, status=400)


from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ordem_de_servico.models import OrdemServico
from ordem_de_servico.serializers import OrdemDeServicoSerializer

@api_view(['GET', 'POST'])
def visualizar_ou_criar_os(request):
    if request.method == 'GET':
        ordem_de_servico = OrdemServico.objects.all()
        serializer = OrdemDeServicoSerializer(ordem_de_servico, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = OrdemDeServicoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
def os_detalhe(request, pk):
    try:
        ordem = OrdemServico.objects.get(pk=pk)
    except OrdemServico.DoesNotExist:
        return Response({'erro': 'Ordem de Serviço não encontrada.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = OrdemDeServicoSerializer(ordem)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = OrdemDeServicoSerializer(ordem, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        ordem.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
