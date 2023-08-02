from django.db import models

class Receita(models.Model):
    nome = models.CharField(max_length=100, blank=False)
    modo_preparo = models.TextField(default='*')
    tempo_preparo = models.IntegerField(default=0)
    autor = models.ForeignKey('auth.User', related_name='Receitas', on_delete=models.SET_NULL, null=True)
    categoria = models.ForeignKey('Categoria', on_delete=models.SET_NULL, null=True)
    

class Ingrediente(models.Model):
    nome = models.CharField(max_length=100)


class Ingredientes_receitas(models.Model):
    receita_id = models.ForeignKey('Receita', on_delete=models.RESTRICT)
    ingrediente_id = models.ForeignKey('Ingrediente', on_delete=models.RESTRICT)
    qtd = models.CharField(max_length=100)


class Categoria(models.Model):
    nome = models.CharField(max_length=100)



