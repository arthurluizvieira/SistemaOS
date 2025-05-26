from django.urls import path
from .views import lista_ou_cria_visitas, detalhe_visita

urlpatterns = [
    path('', lista_ou_cria_visitas),
    path('<int:pk>/', detalhe_visita)
]
