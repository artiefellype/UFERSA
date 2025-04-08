# Análise Semântica do OWL

Este script Python implementa um analisador semantico para a linguagem de descrição de ontologias OWL 2. Ele utiliza a biblioteca Ply (Python Lex-Yacc) para realizar a analise léxica, sintática e posteriormente se utiliza dos tokens analisados para fazer a análise semântica.


# A análise

- Para a análise semântica são definidas regras para lidar com as declarações de Classe (_Class_), Equivalencia (_EquivalentTo_), sub classe (_SubClassOf_), classe disjunta (DisjointClasses) e de indivíduos (_Individuals_)

- A função **_add_semantic_info()_** é chamada para adicionar informações semânticas ao dicionário _**class_info**_.

    ```
    class_info = {
        'classes': {},
        'disjoint_classes': set(),
        'individuals': set()
    }
    ```

    **_classes: {}_** : É um dicionário vazio que será preenchido à medida que as informações sobre as classes forem processadas. Cada chave neste dicionário será o nome de uma classe, e o valor correspondente será um dicionário contendo informações adicionais sobre essa classe, como _equivalências_, _subclasse_, _classes disjuntas_ e _individuos_ (ou properties).

    **_disjoint_classes: set()_**: É um conjunto vazio que será usado para armazenar as classes que são declaradas como disjuntas umas das outras durante a análise semântica. Por exemplo, se houver uma declaração como "DisjointClasses:ClasseA, ClasseB", então ambos os nomes das classes (ClasseA e ClasseB) seriam adicionados a este conjunto.

    **_individuals: set()_**: Este é um conjunto vazio que será usado para armazenar os indivíduos que são encontrados durante a análise semântica.

    **Ex:**
    ```
    {
        'classes': {
            'ClasseA': {
                'equivalentTo': ['ClasseB', 'ClasseC'],
                'subClassOf': ['ClasseD'],
                'disjointWith': ['ClasseE'],
                'properties': ['propriedade1', 'propriedade2']
            },
            'ClasseB': {
                'equivalentTo': ['ClasseA'],
                'subClassOf': [],
                'disjointWith': [],
                'properties': []
            },
        },
        'disjoint_classes': set(),
        'individuals': set()
    }
    ```

- Cada vez que uma declaração de classe é encontrada no código, a função **_p_primitive_class_declaration(p)_** é chamada. Essa função interpreta os tokens retornados pelo _parser_ e chama **_add_semantic_info_** para adicionar informações semânticas ao dicionário **_class_info_**.

- **_add_semantic_info_** é feito a verificação se a adição da informação semântica está ocorrendo no estado correto e atualiza o estado atual conforme as informações semânticas são adicionadas. Por exemplo, a informação sobre a classe deve ser a primeira a ser adicionada **_(current_state = 'class')_**.

- Dependendo dos argumentos passados para **_p_primitive_class_declaration_**, diferentes tipos de informações semânticas são adicionados ( equivalentes, subclasses, classes disjuntas e indivíduos).



## Uso

- Requisitos: 
    - certifique-se de ter o python (^3.10) instalado
    - Certifique-se de ter as bibliotecas Ply (pip install ply) e prettyTable (pip install prettyTable) instaladas  antes de executar o script.

- Entrada: 
    - Coloque seu código OWL2 no arquivo owl2.txt.

- Execução: 
    - Execute o script Python (python nome_do_script.py).
    - python main.py
    
- Saída: 
    - A contagem de tokens reconhecidos será exibida no console e registrada no arquivo analisador_lexico_output.txt.
    - Os erros sintáticos e semânticos serão impressos no terminal
    - Os tokens reconhecidos serão impressos no arquivo analisador_lexico_output.txt
    - As derivações serão mostradas no arquivo parse.out após a execução do script
    - O terminal também irá imprimir o dicionario referente a análise semântica das classes com os atributos preenchidos pelos tokens encontrados (Tendo a análise semântica apresentado erro ou não)
