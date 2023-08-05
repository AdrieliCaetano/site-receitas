from rest_framework import serializers
from .models import Receita, Ingrediente, IngredientesReceita, Categoria

class ReceitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receita
        fields = ('id_receita', 'nome_receita', 'modo_preparo', 'tempo_preparo', 'autor', 'categoria', 'link_youtube')

class IngredienteSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Ingrediente
        fields = ('nome_ingrediente')

class IngredientesReceitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientesReceita
    
        fields = ('id', 'receita', 'ingrediente', 'qtd')

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ('nome')
