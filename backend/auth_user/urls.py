from setup.urls import path, include 
from auth_user import views 

#Add Django site authentication urls (for login, logout, password management)

urlpatterns = [
    path('login/', views.login, name="login")

]
