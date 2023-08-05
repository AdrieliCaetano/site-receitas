from django.db import models

class Receita(models.Model):
    id_receita = models.AutoField(primary_key=True)
    nome_receita = models.CharField(max_length=100)
    modo_preparo = models.TextField(default='*',blank=False)
    tempo_preparo = models.IntegerField(default=0)
    autor = models.ForeignKey('auth.User', related_name='Receitas', on_delete=models.SET_NULL, null=True)
    categoria = models.ForeignKey('Categoria', on_delete=models.SET_NULL, null=True)
    link_youtube  = models.URLField(max_length=200, null=True)
    ingredientes = models.ManyToManyField('Ingrediente', through='IngredientesReceita')

    def __str__(self):
        return f"{self.nome_receita} ({self.id_receita})"
        
    

class Ingrediente(models.Model):
    nome_ingrediente = models.CharField(max_length=100,primary_key=True)

    def __str__(self):
        return self.nome_ingrediente


class IngredientesReceita(models.Model):
    id = models.AutoField(primary_key=True)
    receita = models.ForeignKey('Receita', on_delete=models.RESTRICT)
    ingrediente = models.ForeignKey('Ingrediente', on_delete=models.RESTRICT)
    qtd = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.receita.nome_receita} - {self.ingrediente}"


class Categoria(models.Model):
    nome = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.nome



