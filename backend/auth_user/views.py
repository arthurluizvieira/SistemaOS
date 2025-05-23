from django.shortcuts import render
from django.http.response import HttpResponse
# from django.contrib.admin.models import User
from django.contrib.auth import authenticate, login as login_django
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required
def login(request):
    if request.method == "GET":
        return render(request="Login.jsx")
    else:
        usuario = request.POST.get('usuário')
        senha = request.POST.get('senha')
        user = authenticate(username=usuario, password=senha)
        if user:
            login(request, user)

            return HttpResponse('Login realizado com sucesso')
        else:
            return HttpResponse('Usuário ou senha incorreto.')
        
# def home(request):
#     return HttpResponse('Home')