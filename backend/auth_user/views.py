from rest_framework import viewsets, permissions
from auth_user.serializers import UserSerializer
from django.contrib.auth.models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]  # Apenas admin pode cadastrar
