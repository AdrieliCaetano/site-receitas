from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


class Database:
    def __init__(self,dbname, user,password, host, port) -> None:
        self.conn = psycopg2.connect(
            dbname = dbname,
            user = user,
            password = password,
            host = host,
            port = port
        )
        self.conn.autocommit = True
        self.cur = self.conn.cursor()
    
    def criar_tabelas(self):
        query = """ 
        CREATE TABLE IF NOT EXISTS categoria(
            nome_categoria VARCHAR(50) PRIMARY KEY
        );

        CREATE TABLE IF NOT EXISTS usuario (
            id SERIAL PRIMARY KEY,
            username VARCHAR(20) NOT NULL,
            email  VARCHAR(100),
            nome VARCHAR(50) NOT NULL,
            sobrenome VARCHAR(50) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS receita(
            id SERIAL PRIMARY KEY,
            nome_receita VARCHAR(50) NOT NULL,
            tempo_preparo INTEGER NOT NULL,
            modo_preparo VARCHAR(1000) NOT NULL,
            porcoes INTEGER,
            link_imagem VARCHAR(100),
            categoria_id VARCHAR(50),
            autor_id INTEGER,
            FOREIGN KEY (categoria_id) REFERENCES categoria (nome_categoria) ON UPDATE CASCADE,
            FOREIGN KEY (autor_id) REFERENCES usuario (id) ON DELETE SET NULL ON UPDATE CASCADE

        );

        CREATE TABLE IF NOT EXISTS ingrediente_receita(
            receita_id INTEGER NOT NULL,
            ingrediente VARCHAR(50) NOT NULL,
            quantidade VARCHAR(50) NOT NULL,
            PRIMARY KEY (receita_id, ingrediente),
            FOREIGN KEY (receita_id) REFERENCES receita (id) ON DELETE CASCADE ON UPDATE CASCADE
        );
        """
        self.cur.execute(query=query)
        self.conn.commit()

    def close(self):
        self.cur.close()
        self.conn.close()

db = Database(dbname='receitadb', user='postgres', password='010203',host='localhost', port='5432')

@app.route('/categorias', methods=['GET'])
def get_categorias():
    query = "SELECT * FROM categoria;"
    db.cur.execute(query)
    categorias = db.cur.fetchall()
    categorias_formatadas = []
    for categoria in categorias:
        categoria_formatada = {
            'nome_categoria': categoria[0],
        }
        categorias_formatadas.append(categoria_formatada)
    return jsonify(categorias_formatadas)

@app.route('/categorias/<string:nome_categoria>', methods=['GET'])
def get_categoria(nome_categoria):
    query = "SELECT * FROM categoria WHERE nome_categoria = %s;"
    db.cur.execute(query, (nome_categoria,))
    categoria = db.cur.fetchone()
    if not categoria:
        return jsonify({'error': 'Categoria não encontrada'}), 404
    return jsonify({'nome_categoria': categoria[0]})

@app.route('/categorias', methods=['POST'])
def create_categoria():
    if not request.json or 'nome_categoria' not in request.json:
        return jsonify({'error': 'Dados inválidos'}), 400
    nome_categoria = request.json['nome_categoria']
    query = "INSERT INTO categoria (nome_categoria) VALUES (%s);"
    db.cur.execute(query, (nome_categoria,))
    return jsonify({'message': 'Categoria criada com sucesso'}), 201

@app.route('/categorias/<string:nome_categoria>', methods=['PUT'])
def update_categoria(nome_categoria):
    if not request.json or 'nome_categoria' not in request.json:
        return jsonify({'error': 'Dados inválidos'}), 400
    novo_nome_categoria = request.json['nome_categoria']
    query = "UPDATE categoria SET nome_categoria = %s WHERE nome_categoria = %s;"
    db.cur.execute(query, (novo_nome_categoria, nome_categoria))
    return jsonify({'message': 'Categoria atualizada com sucesso'})

@app.route('/categorias/<string:nome_categoria>', methods=['DELETE'])
def delete_categoria(nome_categoria):
    query = "DELETE FROM categoria WHERE nome_categoria = %s RETURNIG *;"
    db.cur.execute(query, (nome_categoria,))
    excluidos = db.cur.fetchall()
    if excluidos:
        return jsonify({'message': 'Categoria excluída com sucesso'})
    else:
        return jsonify({'error: Categoria nao encontrada'}), 404

@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    query = "SELECT * FROM usuario;"
    db.cur.execute(query)
    usuarios = db.cur.fetchall()
    usuarios_formatados = []
    for usuario in usuarios:
        usuario_formatado = {
            'id': usuario[0],
            'username' : usuario[1],
            'email' : usuario[2],
            'nome' : usuario[3],
            'sobrenome': usuario[4]
        }
        usuarios_formatados.append(usuario_formatado)
    return jsonify(usuarios_formatados)

@app.route('/usuarios/<int:usuario_id>', methods=['GET'])
def get_usuario(usuario_id):
    query = "SELECT * FROM usuario WHERE id = %s;"
    db.cur.execute(query, (usuario_id,))
    usuario = db.cur.fetchone()
    if not usuario:
        return jsonify({'error': 'Usuário não encontrado'}), 404
    usuario_formatado = {
        'id': usuario[0],
        'username' : usuario[1],
        'email' : usuario[2],
        'nome' : usuario[3],
        'sobrenome': usuario[4]
    }
    return jsonify(usuario_formatado)

@app.route('/usuarios', methods=['POST'])
def create_usuario():
    if not request.json or 'username' not in request.json or 'nome' not in request.json or 'sobrenome' not in request.json:
        return jsonify({'error': 'Dados inválidos'}), 400
    username = request.json['username']
    email = request.json.get('email')
    nome = request.json['nome']
    sobrenome = request.json['sobrenome']
    query = "INSERT INTO usuario (username, email, nome, sobrenome) VALUES (%s, %s, %s, %s) RETURNING id;"
    db.cur.execute(query, (username, email, nome, sobrenome))
    user_id = db.cur.fetchone()[0]
    return jsonify({'message': "Usuario inserido com sucesso",'id': user_id,}), 201

@app.route('/usuarios/<int:usuario_id>', methods=['PUT'])
def update_usuario(usuario_id):
    if not request.json:
        return jsonify({'error': 'Dados inválidos'}), 400
    username = request.json.get('username')
    email = request.json.get('email')
    nome = request.json.get('nome')
    sobrenome = request.json.get('sobrenome')
    query = "UPDATE usuario SET username = %s, email = %s, nome = %s, sobrenome = %s WHERE id = %s;"
    db.cur.execute(query, (username, email, nome, sobrenome, usuario_id))
    return jsonify({'message': 'Usuário atualizado com sucesso'}), 200

@app.route('/usuarios/<int:usuario_id>', methods=['DELETE'])
def delete_usuario(usuario_id):
    query = "DELETE FROM usuario WHERE id = %s RETURNING *;"
    db.cur.execute(query, (usuario_id,))
    excluidos = db.cur.fetchall()
    if excluidos:
        return jsonify({'message': 'Usuário excluído com sucesso'}), 200
    else:
        return jsonify({'error': 'Usuario nao encontrado'}), 404

def get_ingredientes_receita(receita_id):
    query = """
        SELECT ingrediente, quantidade
        FROM ingrediente_receita
        WHERE receita_id = %s;
    """
    db.cur.execute(query, (receita_id,))
    ingredientes = db.cur.fetchall()
    ingredientes_formatados = [{'ingrediente': ingrediente, 'quantidade': quantidade} for ingrediente, quantidade in ingredientes]
    return ingredientes_formatados

@app.route('/receitas', methods=['GET'])
def get_receitas():
    query = "SELECT * FROM receita;"
    db.cur.execute(query)
    receitas = db.cur.fetchall()

    receitas_formatadas = []
    for receita in receitas:
        receita_formatada = {
            'id': receita[0],
            'nome_receita': receita[1],
            'tempo_preparo': receita[2],
            'modo_preparo': receita[3],
            'porcoes': receita[4],
            'link_imagem': receita[5],
            'categoria': receita[6],
            'autor': receita[7],
            'ingredientes': get_ingredientes_receita(receita[0])
        }
        receitas_formatadas.append(receita_formatada)

    return jsonify(receitas_formatadas)

@app.route('/receitas/<int:receita_id>', methods=['GET'])
def get_receita(receita_id):
    query = "SELECT * FROM receita WHERE id = %s"
    db.cur.execute(query, (receita_id,))
    receita = db.cur.fetchone()

    if not receita:
        return jsonify({'error': 'Receita não encontrada'}), 404

    receita_formatada = {
        'id': receita[0],
        'nome_receita': receita[1],
        'tempo_preparo': receita[2],
        'modo_preparo': receita[3],
        'porcoes': receita[4],
        'link_imagem': receita[5],
        'categoria': receita[6],
        'autor': receita[7],
        'ingredientes': get_ingredientes_receita(receita_id) 
    }

    return jsonify(receita_formatada)


@app.route('/receitas', methods = ['POST'])
def create_receita():
    if not request.json or 'nome_receita' not in request.json or 'tempo_preparo' not in request.json or 'modo_preparo' not in request.json:
        return jsonify({'error': 'Dados inválidos'}), 400
    
    nome_receita = request.json['nome_receita']
    tempo_preparo = request.json['tempo_preparo']
    modo_preparo = request.json['modo_preparo']
    porcoes = request.json.get('porcoes')
    link_imagem = request.json.get('link_imagem')
    categoria_id =  request.json.get('categoria')
    autor_id = request.json.get('autor_id')
    ingredientes = request.json['ingredientes']

    query =  """INSERT INTO  receita (nome_receita, tempo_preparo, modo_preparo, porcoes, link_imagem,             categoria_id, autor_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id;"""
    
    db.cur.execute(query, (nome_receita, tempo_preparo, modo_preparo, porcoes, link_imagem,             categoria_id, autor_id),)
    id_receita = db.cur.fetchone()[0]
    
    for ingrediente in ingredientes:
        ingrediente_nome = ingrediente['ingrediente']
        quantidade = ingrediente['quantidade']
        query_ingredientes = """INSERT INTO ingrediente_receita (receita_id, ingrediente, quantidade)
                                VALUES (%s, %s, %s);"""
        db.cur.execute(query_ingredientes, (id_receita, ingrediente_nome, quantidade),)

    return jsonify({'message': 'Receita criada com sucesso', 'id': id_receita}), 201

@app.route('/receitas/<int:id_receita>', methods=['PUT'])
def update_receita(id_receita):
    if not request.json:
        return jsonify({'error': 'Dados inválidos'}), 400

    nome_receita = request.json.get('nome_receita')
    tempo_preparo = request.json.get('tempo_preparo')
    modo_preparo = request.json.get('modo_preparo')
    porcoes = request.json.get('porcoes')
    link_imagem = request.json.get('link_imagem')
    categoria_id = request.json.get('categoria_id')
    autor_id = request.json.get('autor_id')
    ingredientes = request.json.get('ingredientes')

    query_receita = """
        UPDATE receita
        SET nome_receita = %s, tempo_preparo = %s, modo_preparo = %s, porcoes = %s, link_imagem = %s, categoria_id = %s, autor_id = %s
        WHERE id = %s;
    """
    db.cur.execute(query_receita, (nome_receita, tempo_preparo, modo_preparo, porcoes, link_imagem, categoria_id, autor_id, id_receita))

    query_deletar_ingredientes = """
        DELETE FROM ingrediente_receita
        WHERE receita_id = %s;
    """
    db.cur.execute(query_deletar_ingredientes, (id_receita,))

    for ingrediente in ingredientes:
        ingrediente_nome = ingrediente['ingrediente']
        quantidade = ingrediente['quantidade']
        query_ingredientes = """INSERT INTO ingrediente_receita (receita_id, ingrediente, quantidade)
                                VALUES (%s, %s, %s);"""
        db.cur.execute(query_ingredientes, (id_receita, ingrediente_nome, quantidade))

    return jsonify({'message': 'Receita atualizada com sucesso', 'id': id_receita}), 200

@app.route('/receitas/<int:receita_id>', methods=['DELETE'])
def delete_receita(receita_id):
    query = """
        DELETE FROM receita
        WHERE id = %s
        RETURNIG *;
    """
    db.cur.execute(query, (receita_id,))
    excluidos = db.cur.fetchall()
    if excluidos:
        return jsonify({'message': 'Receita excluída com sucesso'}), 200
    else:
        return jsonify({'message': 'Receita não encontrada'}), 404

@app.route('/receitas/categoria/<nome_categoria>', methods=['GET'])
def get_receitas_por_categoria(nome_categoria):
    query = "SELECT * FROM receita WHERE categoria_id = %s;"
    db.cur.execute(query,(nome_categoria,))
    receitas = db.cur.fetchall()
    if not receitas:
        return jsonify({'error': 'Nenhuma receita encontrada para esta categoria.'}), 404
    
    receitas_formatadas = []
    for receita in receitas:
        receita_formatada = {
            'id': receita[0],
            'nome_receita': receita[1],
            'tempo_preparo': receita[2],
            'modo_preparo': receita[3],
            'porcoes': receita[4],
            'link_imagem': receita[5],
            'categoria_id': receita[6],
            'autor_id': receita[7],
            'ingredientes': get_ingredientes_receita(receita[0])
        }
        receitas_formatadas.append(receita_formatada)

    return jsonify(receitas_formatadas)



if __name__ == '__main__':
    db.criar_tabelas()
    app.run(debug=True)
