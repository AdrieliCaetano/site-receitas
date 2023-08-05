#from django.shortcuts import render
#from django.contrib.auth.decorators import login_required
#from django.http import HttpResponse
#from django.template import loader

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from .models import Receita, Ingrediente, IngredientesReceita, Categoria
from .serializers import ReceitaSerializer, IngredienteSerializer, IngredientesReceitaSerializer, CategoriaSerializer

class ReceitaViewSet(ModelViewSet):
    queryset = Receita.objects.all()
    serializer_class = ReceitaSerializer

class IngredienteViewSet(ModelViewSet):
    queryset = Ingrediente.objects.all()
    serializer_class = IngredienteSerializer

class Ingredientes_receitaViewSet(ModelViewSet):
    queryset = IngredientesReceita.objects.all()
    serializer_class = IngredientesReceitaSerializer

class CategoriaViewSet(ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer




#@login_required
#def index(request):
#    qtd_receitas = Receita.objects.count()
#    template = loader.get_template('receita/index.html')
#    context = {
#        'qtd_receitas' : qtd_receitas
#    }
#    return HttpResponse(template.render(context, request))

