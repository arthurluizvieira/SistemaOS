"""
URL configuration for setup project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from ordem_de_servico import views #add
from rest_framework.routers import DefaultRouter
from auth_user.views import UserViewSet
# Para autenticação: TokenObtainPairView responde a POST /api/token/ com { access, refresh } e
# TokenRefreshView responde a POST /api/token/refresh/ para renovar o access
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
router = DefaultRouter()


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/visitantes/', include('visitantes.urls')),
    path('visitas/', include('visitas.urls')),
    path('empresas/', include('empresas.urls')),
    path('ordem_de_servico/', include('ordem_de_servico.urls')),

    # path('api/visitantes/', include('visitantes.urls')),
    path('api/visitas/', include('visitas.urls')),
    path('api/empresas/', include('empresas.urls')),
    path('api/ordem_de_servico/', include('ordem_de_servico.urls')),
    path('ordem_de_servico/<int:pk>/', views.os_detalhe),
    path('auth/', include('auth_user.urls')),
    path('api/auth', include ('auth_user.urls')),
    path('api/', include(router.urls)),

    # JWT endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]


