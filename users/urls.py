"""
URL configuration for webApp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path
from django.urls import re_path, include
from . import views
urlpatterns = [
    path('', views.handle_moves),
    path('test/', views.test, name='test' ),
    path('mcts_moves/', views.mcts_moves, name='mcts_moves'),
    path('reset_board/', views.reset_board, name='reset_board'),
    path('match_moves/', views.match_moves, name='match_moves')
]

