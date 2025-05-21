from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from empresas.models import Empresas
from empresas.serializers import EmpresasSerializer

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



