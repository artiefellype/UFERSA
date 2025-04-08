import ply.lex as lex
import ply.yacc as yacc
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
t_PROPERTIES = r'\b(([a-z]+(?:[A-Z][a-zA-Z]*)+)|(has(?:[A-Z][a-zA-Z]*|\bis.*Of)|purchased[A-Z][a-zA-Z]+|mediates|instantiate|enforces|calls|creates|inverse|owns|responds|describes)|([a-z]+(?:[A-Z][a-zA-Z]*)+))\b'
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
    owl_linguage = file.read()

# Definir dados de entrada para o lexer
lexer.input(owl_linguage)

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

print("\n\n\n")

print("INICIANDO ANALISE SINTÁTICA...")


# Definição das regras gramaticais
def p_statement(p):
    '''statement : primitive_class_declaration statement
                | defined_class_declaration statement
                | cobert_class_declaration statement
                | primitive_class_declaration
                | defined_class_declaration
                | cobert_class_declaration
                '''

# PRIMITIVE 
def p_primitive_class_declaration(p):
    '''primitive_class_declaration : valid_class_declaration valid_subclass_of valid_disjoint_classes valid_individuals'''
  

# DEFINED

def p_defined_class_declaration(p):
    '''defined_class_declaration : valid_class_declaration valid_equivalent_to valid_individuals
                                | valid_class_declaration valid_equivalent_to '''
  
# COBERTA

def p_cobert_class_declaration(p):
    '''cobert_class_declaration : valid_class_declaration valid_equivalent_to_c'''
    



#equivalent_to_coberto
def p_valid_equivalent_to_c(p):
    '''valid_equivalent_to_c :  reserved_word_declaration special_symbols_declaration equivalent_to_c'''
    
def p_equivalent_to_c(p):
    '''equivalent_to_c :  equivalent_to_c_classes '''

def p_equivalent_to_c_classes(p):
    '''equivalent_to_c_classes : class_declaration reserved_word_declaration equivalent_to_c_classes 
                                | class_declaration '''


# EQUIVALENT_TO
def p_valid_equivalent_to(p):
    '''valid_equivalent_to :  reserved_word_declaration special_symbols_declaration equivalent_to'''
    
def p_equivalent_to(p):
    '''equivalent_to : class_declaration reserved_word_declaration equivalent_to_conjunt 
                        | class_declaration reserved_word_declaration equivalent_to_conjunt_cardi '''

def p_equivalent_to_conjunt_cardi(p):
    '''equivalent_to_conjunt_cardi : special_symbols_declaration properties_declaration  reserved_word_declaration data_types_declaration special_symbols_declaration special_symbols_declaration special_symbols_declaration cardinalities_declaration special_symbols_declaration special_symbols_declaration
    | special_symbols_declaration properties_declaration  reserved_word_declaration data_types_declaration special_symbols_declaration special_symbols_declaration cardinalities_declaration special_symbols_declaration special_symbols_declaration'''

def p_equivalent_to_conjunt(p):
    '''equivalent_to_conjunt : special_symbols_declaration properties_declaration  reserved_word_declaration class_declaration  special_symbols_declaration'''

# DISJOINTCLASS

def p_valid_disjoint_class(p):
    '''valid_disjoint_classes : reserved_word_declaration special_symbols_declaration valid_disjoint_list'''

def p_valid_disjoint_list(p):
    '''valid_disjoint_list : class_declaration special_symbols_declaration valid_disjoint_list
                            | class_declaration '''

# SUBCLASSOF
    
def p_valid_subclass_of(p):
    '''valid_subclass_of : reserved_word_declaration special_symbols_declaration valid_subclass_of_list'''

def p_valid_subclass_of_list(p):
    '''valid_subclass_of_list : properties_declaration reserved_word_declaration class_declaration special_symbols_declaration valid_subclass_of_list
                            | properties_declaration reserved_word_declaration class_declaration
                            
                            | properties_declaration reserved_word_declaration data_types_declaration special_symbols_declaration valid_subclass_of_list
                            
                            | properties_declaration reserved_word_declaration data_types_declaration'''


# INDIVIDUALS
def p_valid_individuals(p):
    '''valid_individuals : reserved_word_declaration special_symbols_declaration valid_individuals_list'''

def p_valid_individuals_list(p):
    '''valid_individuals_list : individuals_declaration special_symbols_declaration valid_individuals_list
    | individuals_declaration'''

# ---------


def p_valid_class_declaration(p):
     '''valid_class_declaration : reserved_word_declaration special_symbols_declaration class_declaration'''
     print("coberta:", p[2])
                                         
def p_class_declaration(p):
    '''class_declaration : CLASS'''

def p_properties_declaration(p):
    '''properties_declaration : PROPERTIES'''

def p_individuals_declaration(p):
    '''individuals_declaration : INDIVIDUALS'''

def p_reserved_word_declaration(p):
    '''reserved_word_declaration : RESERVED_WORD'''

def p_special_symbols_declaration(p):
    '''special_symbols_declaration : SPECIAL_SYMBOLS'''

def p_data_types_declaration(p):
    '''data_types_declaration : DATA_TYPES'''

def p_cardinalities_declaration(p):
    '''cardinalities_declaration : CARDINALITIES'''
                      

def p_error(p):
    print("Erro sintático em '%s'" % p.value)

# Construção do parser
parser = yacc.yacc(write_tables=False)

# Leitura do arquivo .txt e processamento dos tokens pelo parser
def process_txt_file():
    success = True  # Indicador de sucesso

    result = parser.parse(owl_linguage)
    
    if result is not None:
        success = False  # Houve um erro de parsing
                
    if success:
        print("Análise finalizada")
    else:
        print("Algo de errado aconteceu")
        
        
process_txt_file()