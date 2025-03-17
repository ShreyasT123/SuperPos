from django.urls import path
from . import views

urlpatterns = [
    path('rsa_generate_keys/',views. rsa_generate_keys, name='rsa_generate_keys'),
    path('rsa_encrypt/', views.rsa_encrypt, name='rsa_encrypt'),
    path('rsa_decrypt/', views.rsa_decrypt, name='rsa_decrypt'),
    path('3dckt', views.get_3d, name='get_3d'),
    path('simulate', views.simulate_custom_circuit, name='simulate'),
    path('chat', views.chat, name='chat'),
    path('run_fault_tolerance/', views.run_fault_tolerance, name='fault_tolerance'),

]
