from django.shortcuts import render

from django.contrib.auth.decorators import login_required

from django.http import HttpResponse
from django.template import loader
from .models import Receita

@login_required
def index(request):
    qtd_receitas = Receita.objects.count()
    template = loader.get_template('AppReceitas/index.html')
    context = {
        'qtd_receitas' : qtd_receitas
    }
    return HttpResponse(template.render(context, request))

