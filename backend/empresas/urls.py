from django.urls import path
from empresas.views import ver_empresas, detalhe_empresa

urlpatterns = [
     path('', ver_empresas),
     path('<int:pk>/', detalhe_empresa)
 ]
