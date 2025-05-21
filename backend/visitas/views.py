from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Visita
from .serializers import VisitaSerializer

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
