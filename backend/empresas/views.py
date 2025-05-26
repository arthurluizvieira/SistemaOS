from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from empresas.models import Empresas
from empresas.serializers import EmpresasSerializer
from rest_framework import status


# Create your views here.

@api_view(['GET', 'POST'])
def ver_empresas(request):
     if request.method == 'GET':
         empresas = Empresas.objects.all()
         serializer = EmpresasSerializer(empresas, many=True)
         return Response(serializer.data)
    
     elif request.method == 'POST':
         serializer = EmpresasSerializer(data=request.data)
         if serializer.is_valid():
             serializer.save()
             return Response(serializer.data, status=201)
         return Response(serializer.errors, status=400)



@api_view(['GET', 'PUT', 'DELETE'])
def detalhe_empresa(request, pk):
    try:
        visitante = Empresas.objects.get(pk=pk)
    except Empresas.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = EmpresasSerializer(visitante)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = EmpresasSerializer(visitante, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        visitante.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)