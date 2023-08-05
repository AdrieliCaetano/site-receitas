from django.contrib import admin

from .models import Receita, Ingrediente, IngredientesReceita, Categoria


class IngredientesInline(admin.TabularInline):
    model = IngredientesReceita
    extra = 1

class ReceitaAdmin(admin.ModelAdmin):
    inlines = [IngredientesInline]

admin.site.register(Receita, ReceitaAdmin)
admin.site.register(Ingrediente)
admin.site.register(IngredientesReceita)
admin.site.register(Categoria)
