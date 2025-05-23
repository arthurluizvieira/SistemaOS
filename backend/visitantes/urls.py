# importar as views que vai ser ligadas as URLS
from django.urls import path
from visitantes.views import lista_ou_cria_visitantes, detalhe_visitante


urlpatterns = [
     path('', lista_ou_cria_visitantes), # rota padrão (ex: /api/visitantes/) que lida com lista ou criação
     #rota para ações em um visitante específico, por ID
     path('<int:pk>/', detalhe_visitante) # para editar cada visitante por ID. 
 ]
