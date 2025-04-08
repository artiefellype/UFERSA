import ply.lex as lex
import ply.yacc as yacc
from prettytable import PrettyTable


# Define os nomes dos tokens
tokens = (
    'CLASS',
    'PROPERTIES',
    'INDIVIDUALS',
    'SIZE_OF',
    'RESERVED_WORD',
    'RESERVED_CLASSES',
    'BRACES',
    'SPECIAL_SYMBOLS',
    'DATA_TYPES',
    'CARDINALITIES',
)

# Define as expressões regulares para os tokens
def t_SIZE_OF(t):
    r'\b(max|exactly|only|min)\b'
    t.type = 'SIZE_OF'
    return t

def t_RESERVED_CLASSES(t):
    r'\b(SubClassOf|Class|EquivalentTo|Individuals|DisjointClasses)\b'
    t.type = 'RESERVED_CLASSES'
    return t

def t_RESERVED_WORD(t):
    r'\b(some|all|value|that|not|and|or)\b'
    t.type = 'RESERVED_WORD'
    return t

def t_PROPERTIES(t):
    r'\b(([a-z]+(?:[A-Z][a-zA-Z]*)+)|(has(?:[A-Z][a-zA-Z]*|\bis.*Of)|purchased[A-Z][a-zA-Z]+|mediates|instantiate|enforces|calls|creates|inverse|owns|responds|describes)|([a-z]+(?:[A-Z][a-zA-Z]*)+))\b'
    t.type = 'PROPERTIES'
    return t

def t_DATA_TYPES(t):
    r'\b(?:owl:real|rdfs:domain|xsd:(?:integer|string|real)|ssn)\b'
    t.type = 'DATA_TYPES'
    return t

def t_INDIVIDUALS(t):
    r'[A-Z][a-zA-Z]*\d+\b'
    t.type = 'INDIVIDUALS'
    return t

def t_CARDINALITIES(t):
    r'\b[0-9]+\b'
    t.type = 'CARDINALITIES'
    return t

def t_CLASS(t):
    r'[A-Z][a-zA-Z]*'
    t.type = 'CLASS'
    return t

def t_BRACES(t):
    r'[{}]'
    t.type = 'BRACES'
    return t

def t_SPECIAL_SYMBOLS(t):
    r'[\(\)\[\]\[\]<>=,:\.]'
    t.type = 'SPECIAL_SYMBOLS'
    return t

def t_ignore_COMMENT(t):
    r'\#.*'
    return t


def t_newline(t):
    r' \n'
    t.lexer.lineno += len(t.value)

t_ignore = ' \t'



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

print("\n")

print("INICIANDO ANALISE SINTÁTICA E SEMÂNTICA...")

class_info = {
    'classes': {},
    'disjoint_classes': set(),
    'individuals': set()
}

# Estado inicial
current_state = 'class'  # Começamos com o termo "Class"

# Função para adicionar informações semânticas
def add_semantic_info(info_type, *args):
    global current_state, class_info

    if current_state == 'class' and info_type != 'class':
        print(f"Erro semântico: O termo 'Class' deve ser o primeiro a ser definido.")
        return
    
    if current_state == 'class' and info_type == 'class':
        class_name = args[0]
        if class_name in class_info['classes']:
            print(f"Erro semântico: Classe '{class_name}' já foi definida anteriormente.")
        else:
            class_info['classes'][class_name] = {'equivalentTo': [], 'subClassOf': [], 'disjointWith': [], 'properties': []}
            current_state = 'equivalent'
    
    if current_state in ('equivalent', 'subclass'):
        if info_type == 'equivalent':
            class_name, equivalent_name = args
            
            if class_name not in class_info['classes']:
                print(f"Erro semântico: Classe equivalente '{class_name}' não foi definida anteriormente")
            else:
                class_info['classes'][class_name]['equivalentTo'].append(equivalent_name)
                current_state = 'end'
        elif info_type == 'subclass':
            class_name, superclass_name = args

            if class_name not in class_info['classes']:
                print(f"Aviso: Subclasse '{class_name}' não foi definida anteriormente. Será criada agora.")
                class_info['classes'][class_name] = {'equivalentTo': [], 'subClassOf': [], 'disjointWith': [], 'properties': []}

            class_info['classes'][class_name]['subClassOf'].append(superclass_name)
            current_state = 'end'
    
    if current_state == 'end':
        if info_type == 'individual':
            individual_name, class_name = args
            if class_name not in class_info['classes']:
                print(f"Erro semântico: Indivíduo '{individual_name}' pertence a uma classe não definida '{class_name}'")
            else:
                class_info['individuals'].add((individual_name, class_name))
        elif info_type == 'disjoint':
            disjoint_classes = args
            for class_name in disjoint_classes:
                if class_name not in class_info['classes']:
                    print(f"Erro semântico: Classe '{class_name}' não foi definida para disjoint.")
                else:
                    class_info['classes'][class_name]['disjointWith'] = disjoint_classes
        else:
            print(f"Erro semântico: Informação '{info_type}' não pode ser adicionada nesta etapa.")
# Definição das regras gramaticais
def p_statement(p):
    '''statement : primitive_class_declaration statement
                | enumerated_class_declaration statement
                | primitive_class_declaration
                | enumerated_class_declaration
                '''
    for key, value in class_info.items():
        print(f"{key}: {value}")

#  -----------  CLASSES -----------------
# PRIMITIVE 
def p_primitive_class_declaration(p):
    '''primitive_class_declaration : valid_class_declaration valid_equivalent_to_nested valid_subclass_of valid_disjoint_classes valid_individuals
                                    | valid_class_declaration valid_equivalent_to_nested valid_subclass_of valid_disjoint_classes 
                                    | valid_class_declaration valid_equivalent_to_nested valid_subclass_of
                                    | valid_class_declaration valid_subclass_of valid_equivalent_to_nested
                                    | valid_class_declaration valid_equivalent_to_nested
                                    | valid_class_declaration valid_subclass_of valid_disjoint_classes
                                    | valid_class_declaration valid_subclass_of valid_disjoint_classes valid_individuals
                                    | valid_class_declaration valid_subclass_of valid_equivalent_to_nested valid_disjoint_classes valid_individuals
                                    | valid_class_declaration valid_subclass_of valid_equivalent_to_nested valid_disjoint_classes
                                    | valid_class_declaration valid_subclass_of 
                                    | valid_class_declaration
                                    
    '''
    class_name = p[1]
    print('\033[93m' +"tokens retornados: " + '\033[0m', *p)
    if len(p) > 5:
        add_semantic_info('class', p[1])
        add_semantic_info('equivalent', p[1], p[2])
        add_semantic_info('subclass', p[3], p[1])
        add_semantic_info('disjoint', p[1], p[4])
        add_semantic_info('individual', p[1], p[4])
    elif len(p) > 4:
        add_semantic_info('class', p[1])
        add_semantic_info('equivalent', p[1], p[2])
        add_semantic_info('subclass', p[1], p[3])
        add_semantic_info('disjoint', p[1], p[4])
    elif len(p) > 3:
        add_semantic_info('class', p[1])
        add_semantic_info('equivalent', p[1], p[2])
        add_semantic_info('subclass', p[1], p[3])
    elif len(p) > 1:
        print('\033[93m' + "Erro semântico: Definição incompleta da classe." + '\033[0m')
    else:
        print('\033[93m' + "Erro semântico: Definição incompleta da classe." + '\033[0m')
    

# ENUMERATED 

def p_enumerated_class_declaration(p):
    '''enumerated_class_declaration : valid_class_declaration valid_equivalent_to_enum'''
    p[0] = p[1]


# ------------- EQUIVALENTs ---------------------

# equivalent_to_enumerated

def p_valid_equivalent_to_enum(p):
    '''valid_equivalent_to_enum : reserved_classes_declaration special_symbols_declaration equivalent_to_enum_conjunt'''

def p_equivalent_to_enum_conjunt(p): 
    '''equivalent_to_enum_conjunt : braces_declaration recursive_equivalent_to_enum_conjunt 
    '''

def p_recursive_equivalent_to_enum_conjunt (p):
    '''recursive_equivalent_to_enum_conjunt :  class_declaration special_symbols_declaration recursive_equivalent_to_enum_conjunt
                                            | class_declaration braces_declaration
    '''

    
# equivalent_to_nested

def p_valid_equivalent_to_nested(p):
    '''valid_equivalent_to_nested : reserved_classes_declaration special_symbols_declaration equivalent_to_nested
                                    | reserved_classes_declaration special_symbols_declaration equivalent_to_c_classes'''
    p[0] = p[1]
    
#equivalent_to_coberto

def p_equivalent_to_c_classes(p):
    '''equivalent_to_c_classes : class_declaration
                                | class_declaration reserved_word_declaration equivalent_to_c_classes
                                 '''

def p_equivalent_to_nested(p):
    '''equivalent_to_nested : class_declaration equivalent_to_nested_separated
    ''' 
    
def p_equivalent_to_nested_separated(p):
    '''equivalent_to_nested_separated : reserved_word_declaration equivalent_to_nested_conjunt
    '''

def p_equivalent_to_nested_conjunt(p): 
    '''equivalent_to_nested_conjunt : special_symbols_declaration recursive_equivalent_to_nested_conjunt 
                                    | special_symbols_declaration equivalent_to_conjunt_cardi
    '''

def p_recursive_equivalent_to_nested_conjunt(p):            
    '''recursive_equivalent_to_nested_conjunt :  properties_declaration reserved_word_declaration recursive_equivalent_to_nested_conjunt_end
                                                | properties_declaration reserved_word_declaration equivalent_to_conjunt_cardi
                                                | properties_declaration size_of_declaration cardinalities_declaration class_declaration special_symbols_declaration equivalent_to_nested_separated
                                                | properties_declaration size_of_declaration cardinalities_declaration class_declaration special_symbols_declaration 
    '''

def p_recursive_equivalent_to_nested_conjunt_end(p): 
    '''recursive_equivalent_to_nested_conjunt_end : class_declaration special_symbols_declaration
                                                 | parenthesized_expression
    '''

def p_parenthesized_expression(p):
    '''parenthesized_expression : special_symbols_declaration recursive_equivalent_to_nested_conjunt special_symbols_declaration
    '''




def p_equivalent_to_conjunt_cardi(p):
    '''equivalent_to_conjunt_cardi : data_types_declaration special_symbols_declaration special_symbols_declaration special_symbols_declaration cardinalities_declaration special_symbols_declaration special_symbols_declaration 

    |  data_types_declaration special_symbols_declaration special_symbols_declaration cardinalities_declaration special_symbols_declaration special_symbols_declaration

    | data_types_declaration special_symbols_declaration special_symbols_declaration special_symbols_declaration cardinalities_declaration special_symbols_declaration special_symbols_declaration special_symbols_declaration recursive_equivalent_to_nested_conjunt

    |  data_types_declaration special_symbols_declaration special_symbols_declaration cardinalities_declaration special_symbols_declaration special_symbols_declaration special_symbols_declaration recursive_equivalent_to_nested_conjunt
    
    '''

# DISJOINTCLASS

def p_valid_disjoint_class(p):
    '''valid_disjoint_classes : reserved_classes_declaration special_symbols_declaration valid_disjoint_list'''
    p[0] = p[1]

def p_valid_disjoint_list(p):
    '''valid_disjoint_list : class_declaration 
                        | class_declaration special_symbols_declaration valid_disjoint_list
    '''
# SUBCLASSOF
    
def p_valid_subclass_of(p):
    '''valid_subclass_of : reserved_classes_declaration special_symbols_declaration valid_subclass_of_list
                        | reserved_classes_declaration special_symbols_declaration class_declaration
                        '''
    p[0] = p[1]

def p_valid_subclass_of_list(p):
    '''valid_subclass_of_list : class_declaration special_symbols_declaration valid_subclass_of_list
                            | properties_declaration reserved_word_declaration class_declaration special_symbols_declaration valid_subclass_of_list
                            | properties_declaration reserved_word_declaration class_declaration
                            | properties_declaration reserved_word_declaration data_types_declaration special_symbols_declaration valid_subclass_of_list
                            | properties_declaration reserved_word_declaration data_types_declaration


                            | properties_declaration size_of_declaration cardinalities_declaration class_declaration special_symbols_declaration valid_subclass_of_list
                            | properties_declaration size_of_declaration cardinalities_declaration class_declaration


                            | properties_declaration size_of_declaration special_symbols_declaration subclass_of_classes special_symbols_declaration
                            
                            '''
    
def p_subclass_of_classes(p):
    '''subclass_of_classes : class_declaration
                        | class_declaration reserved_word_declaration subclass_of_classes
    '''

# INDIVIDUALS
def p_valid_individuals(p):
    '''valid_individuals : reserved_classes_declaration special_symbols_declaration valid_individuals_list'''
    p[0] = p[1]

def p_valid_individuals_list(p):
    '''valid_individuals_list : individuals_declaration
                            | individuals_declaration special_symbols_declaration valid_individuals_list
    '''
    p[0] = p[1]
# ---------


def p_valid_class_declaration(p):
    '''valid_class_declaration : reserved_classes_declaration special_symbols_declaration class_declaration'''
    p[0] =  p[1]
    

                                         
def p_class_declaration(p):
    '''class_declaration : CLASS'''
    p[0] = p[1]
   
   

def p_properties_declaration(p):
    '''properties_declaration : PROPERTIES'''
    p[0] = p[1]

def p_individuals_declaration(p):
    '''individuals_declaration : INDIVIDUALS'''
    p[0] = p[1]

def p_reserved_classes_declaration(p):
    '''reserved_classes_declaration : RESERVED_CLASSES'''
    p[0] = p[1]
    
def p_reserved_word_declaration(p):
    '''reserved_word_declaration : RESERVED_WORD'''
    p[0] = p[1]

def p_braces(p):
    '''braces_declaration : BRACES'''
    p[0] = p[1]
    

def p_special_symbols_declaration(p):
    '''special_symbols_declaration : SPECIAL_SYMBOLS'''
    p[0] = p[1]

def p_data_types_declaration(p):
    '''data_types_declaration : DATA_TYPES'''
    p[0] = p[1]

def p_size_of_declaration(p):
    '''size_of_declaration : SIZE_OF'''
    p[0] = p[1]

def p_cardinalities_declaration(p):
    '''cardinalities_declaration : CARDINALITIES'''
    p[0] = p[1]
                      

def p_error(p):
    if p is None:
        print('\033[91m' +"Erro sintático no fim do arquivo" + '\033[0m')
    else:
        print('\033[91m'+ "Erro sintático próximo a '{}'".format( p.value) + '\033[0m')

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