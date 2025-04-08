import ply.lex as lex
from prettytable import PrettyTable

# Define os nomes dos tokens
tokens = (
    'CLASS',
    'PROPERTIES',
    'INDIVIDUALS',
    'RESERVED_WORD',
    'SPECIAL_SYMBOLS',
    'DATA_TYPES',
    'CARDINALITIES',
)

# Define as expressões regulares para os tokens
t_CLASS = r'[A-Z][a-zA-Z]*'
t_PROPERTIES = r'\b((?!(?:some|all|value|min|max|exactly|only|that|not|and|or|Class|EquivalentTo|Individuals|SubClassOf|DisjointClasses)\b)([a-z]+(?:[A-Z][a-zA-Z]*)+)|(has(?:[A-Z][a-zA-Z]*|\bis.*Of)|purchased[A-Z][a-zA-Z]+|mediates|instantiate|enforces|calls|creates|inverse|owns|responds|describes)|([a-z]+(?:[A-Z][a-zA-Z]*)+))\b'
t_RESERVED_WORD = r'\b(some|all|value|min|max|exactly|only|that|not|and|or|Class|EquivalentTo|Individuals|SubClassOf|DisjointClasses)\b'
t_SPECIAL_SYMBOLS = r'[\(\)\[\]{}\[\]<>=,:\.]'
t_DATA_TYPES = r'\b(?:owl:real|rdfs:domain|xsd:(?:integer|string|real)|ssn)\b'
t_CARDINALITIES = r'\b[0-9]+\b'
t_ignore_COMMENT = r'\#.*'
t_ignore = ' \t\n'

def t_INDIVIDUALS(t):
    r'[A-Z][a-zA-Z]*(\d+)'
    return t

def t_error(t):
    print(f"Caractere ilegal '{t.value[0]}'")
    t.lexer.skip(1)

# Construir o lexer
lexer = lex.lex()

print("Analisando o arquivo owl2.txt...")

with open('owl2.txt', 'r') as file:
    data = file.read()

# Definir dados de entrada para o lexer
lexer.input(data)

print("Gerando o arquivo analisador_lexico_output.txt...")

token_count = {}

with open('analisador_lexico_output.txt', 'w') as output_file:
    # Tokenização
    while True:
        tok = lexer.token()
        if not tok:
            break
        
        token_type = tok.type
        token_count[token_type] = token_count.get(token_type, 0) + 1
        
        # Escrever no arquivo de saída
        output_file.write(str(tok) + '\n') 

# Criar tabela para exibir a contagem dos tokens
table = PrettyTable()
table.field_names = ["Token", "Contagem"]

# Adicionar linhas à tabela
for token_type, count in token_count.items():
    table.add_row([token_type, count])

print("Contagem de tokens por tipo:")
print(table)

print("\nANALISADOR LÉXICO FINALIZADO!")
print("O resultado da análise foi atribuído ao arquivo analisador_lexico_output.txt")