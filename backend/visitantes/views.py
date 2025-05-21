from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Visitante
from .serializers import VisitanteSerializer

# Create your views here.

@api_view(['GET', 'POST'])
def lista_ou_cria_visitantes(request):
     if request.method == 'GET':
         visitantes = Visitante.objects.all()
         serializer = VisitanteSerializer(visitantes, many=True)
         return Response(serializer.data)
    
     elif request.method == 'POST':
         serializer = VisitanteSerializer(data=request.data)
         if serializer.is_valid():
             serializer.save()
             return Response(serializer.data, status=201)
         return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def detalhe_visitante(request, pk):
    try:
        visitante = Visitante.objects.get(pk=pk)
    except Visitante.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = VisitanteSerializer(visitante)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = VisitanteSerializer(visitante, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        visitante.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)