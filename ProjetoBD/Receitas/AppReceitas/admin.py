from django.contrib import admin

from .models import Receita, Ingrediente, Ingredientes_receitas, Categoria

admin.site.register(Receita)
admin.site.register(Ingrediente)
admin.site.register(Ingredientes_receitas)
admin.site.register(Categoria)
