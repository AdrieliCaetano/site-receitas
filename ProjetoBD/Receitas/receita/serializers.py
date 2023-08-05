from rest_framework import serializers
from .models import Receita, Ingrediente, IngredientesReceita, Categoria
from django.contrib.auth.models import User


class IngredienteSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Ingrediente
        fields = '__all__'


class IngredientesReceitaSerializer(serializers.ModelSerializer):
    #ingrediente = IngredienteSerializer() #

    class Meta:
        model = IngredientesReceita
        fields = ('ingrediente', 'qtd')

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class ReceitaSerializer(serializers.ModelSerializer):
    #categoria = CategoriaSerializer() # 
    ingredientes = IngredientesReceitaSerializer(source='ingredientesreceita_set', many=True)

    class Meta:
        model = Receita
        fields = ('id_receita', 'nome_receita','tempo_preparo','ingredientes', 'modo_preparo', 'link_youtube', 'categoria')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')