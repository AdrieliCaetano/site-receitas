from django.urls import path, include
from rest_framework.routers import DefaultRouter
from receita.views import ReceitaViewSet, IngredienteViewSet, Ingredientes_receitaViewSet, CategoriaViewSet, UserViewSet

router  = DefaultRouter()
router.register('receita', ReceitaViewSet)
router.register('ingrediente', IngredienteViewSet)
router.register('ingredientes_receitas', Ingredientes_receitaViewSet)
router.register('categoria', CategoriaViewSet)
router.register('user', UserViewSet)

urlpatterns = [
    #path('', views.index, name='index'),
    path('', include(router.urls)),
]
