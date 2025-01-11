from django.urls import path
from . import views

urlpatterns = [
    path('3dckt/', views.get_3d, name='get_3d'),
    path('simulate', views.simulate_custom_circuit, name='simulate'),
    path('chat', views.chat, name='chat'),
]
