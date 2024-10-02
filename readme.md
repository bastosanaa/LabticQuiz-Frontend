> ### Teste o Software!
> - Você pode testar o software através da url = https://polvoapp.netlify.app
> ##### Para entrar como administrador:
> - email: adm@email.com
> - password: 123
> (por padrão todo usuário criado recebe a senha 123)

# Polvo - Quiz Feature Frontend
Este repositório consiste no frontend do projeto Polvo, gerenciador de instituição educacional, juntamente a nova feature de realizar quizzes na plataforma

## Arquivos

### /components 
componentes personalizados usados para criar as páginas da aplicação

### /assets
imagens e icones da aplicação

### /pages 
páginas da aplicação, seccionadas entre os 3 tipos de usuário, com exceção da página inicial de login

1. página inícial ou dashboard do usuario

- professor e aluno:
    2.  pagínas de interação e manipulação do quizzes
- adm:
    2. paineis de vizualização de todas as entidades
        - funções de formatação dos dados
    3. páginas de CRUD das entidades

    #### /utils
    __api.js__: algumas funções que serão usadas nas páginas da aplicação

### /scripts /service
funções de requisição para o backend das respectivas entidades da aplicação
    (funções para a entidade respostas no QuizService)

### /styles
arquivos de estilização das páginas onde main recebe as importações dos estilos dos componentes

