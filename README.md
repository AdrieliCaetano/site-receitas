# Chef na Web - Site de Receitas

Este projeto consiste em um sistema web voltado para a criação e publicação de receitas, sendo desenvolvido com propósitos acadêmicos, visando a aplicação dos conhecimentos em modelagem de banco de dados e linguagem SQL.

## Documentação
- [PT-BR](docs/pt-br/README.md)

  ## How to run

   ### Server-side (back-end)  
    Necessário ter o PostgreSQL instalado e criar um banco de dados PostgreSQL com o nome 'receitadb'  
    Código SQL para criar o banco de dados:
    
    `CREATE DATABASE  receitadb`

    Instalar os [requirements](ProjetoBD/back/requirements.txt)  
    Alterar informações sobre o banco de dados no arquivo [`app.py`](ProjetoBD/back/app.py) (linha 66)  
    No diretório do back-end (site-receitas/ProjetoBD/back) aplicar o comando:

  ```bash
  # Rodando o servidor
  python app.py
  ```
  
  ### Client-Side (front-end)
  No diretório do front-end (site-receitas/ProjetoBD/front) aplicar o comando:  
   ```bash
  # Instalando as dependências
  npm install

  # Rodando a aplicação
  npm run dev
