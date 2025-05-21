from django.urls import path
from empresas.views import ver_empresas

urlpatterns = [
     path('', ver_empresas),
 ]
