from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Visita
from .serializers import VisitaSerializer
from rest_framework import status

@api_view(['GET', 'POST'])
def lista_ou_cria_visitas(request):
    if request.method == 'GET':
        visitas = Visita.objects.all()
        serializer = VisitaSerializer(visitas, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = VisitaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def detalhe_visita(request, pk):
    try:
        visitante = Visita.objects.get(pk=pk)
    except Visita.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = VisitaSerializer(visitante)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = VisitaSerializer(visitante, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        visitante.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)