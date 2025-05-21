from django.urls import path
from .views import lista_ou_cria_visitas

urlpatterns = [
    path('', lista_ou_cria_visitas),
]
