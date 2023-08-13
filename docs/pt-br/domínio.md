# Domínio

O domínio dessa aplicação se baseia em um sistema web voltado para a criação e publicação de receitas.

## Requisitos

 - O sistema permite a criação de usuários, receitas e categorias
 - As receitas criadas irão referenciar um usuário, indicando que este usuário criou a receita
 - As receitas poderão ser editadas e excluídas
 - Cada receita possui vários ingredientes, que poderão ser adicionados e editados
 - Cada receita possui uma categoria, sendo uma das categorias criadas no site
 - As receitas poderão ser filtradas pela sua categoria
 - As receitas serão exibidas com uma imagem, caso tenha, e todas as outras informações, exceto o id
 - Para fins de simplicação,o banco de dados irá armazenar apenas um link para a imagem da receita, e não a imagem em si


## Modelagem dos dados

- [Diagrama ER](diagrama_er.jpg)
- [Modelo Relacional](Modelo-relacional.jpg)
