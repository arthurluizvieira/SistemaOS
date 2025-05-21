from django.urls import path
from ordem_de_servico.views import visualizar_ou_criar_os
from ordem_de_servico import views

urlpatterns = [
    path('', visualizar_ou_criar_os),
     #path('ordem_de_servico/', views.visualizar_ou_criar_os, name='visualizar_ou_criar_os'),
     path('ordens/<int:pk>/', views.os_detalhe, name='os_detalhe')
 ]

