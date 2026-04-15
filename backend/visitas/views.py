from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Visita
from .serializers import VisitaSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def lista_ou_cria_visitas(request):
    if request.method == 'GET':
        visitas = Visita.objects.all()
        serializer = VisitaSerializer(visitas, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = VisitaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(fk_usuario_id_usuario=request.user)  
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def detalhe_visita(request, pk):
    try:
        visita = Visita.objects.get(pk=pk)
    except Visita.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = VisitaSerializer(visita)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = VisitaSerializer(visita, data=request.data)
        if serializer.is_valid():
            serializer.save(fk_usuario_id_usuario=request.user)  # 🔥 AQUI
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        visita.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)