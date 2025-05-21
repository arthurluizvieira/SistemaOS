from django.urls import path
from visitantes.views import lista_ou_cria_visitantes, detalhe_visitante

urlpatterns = [
     path('', lista_ou_cria_visitantes),
     path('<int:pk>/', detalhe_visitante)
 ]
