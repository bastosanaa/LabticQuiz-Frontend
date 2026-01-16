# Front-End Introduction
You can access the deployed application
https://polvoapp.netlify.app

Student Login: harry@gmail.com Password: 123

Professor Login: severus@gmail.com Password: 123

(There might have some delay on the login, sorry about that)

## Backend repo
https://github.com/bastosanaa/LabticQuiz-Backend

## About the Project
This project was developed using the concepts of React, but without using the React library (lib). Instead, I used pure JavaScript to build the entire frontend of the software. The goal of this approach was to challenge myself by building the app without frameworks or libraries, in order to deeply understand how a framework simplifies what can be done with pure language.

## Software Objectives
The software is a university platform designed to facilitate academic interaction between students and professors through the centralized management of quizzes and assessments. The platform allows students to view courses, take quizzes, and access their grades and answer keys, while professors can create and manage quizzes. Administrators are responsible for managing students, professors, and courses, ensuring the organization and smooth operation of the platform. The software design aims for future scalability, allowing the addition of new features as needed.

# Backend
https://github.com/bastosanaa/LabticQuiz-Backend

## Features
### Students

View courses for the semester.
Take quizzes posted by professors.
View grades and answer keys for quizzes (if provided by professors).
View grades and answer keys for each attempt in quizzes with multiple attempts.
Change password.

### Professors

Create new quizzes, such as exams, exercises, or mock tests.
Save quizzes as drafts.
Edit draft quizzes.
Delete quizzes.
View who has answered the quizzes.
View grades and answer keys of student responses.
Generate quiz questions using artificial intelligence.
Change password.

### Administrators

Register and manage students, professors, and courses (full CRUD functionality).
Edit or delete quizzes created by professors.
Restrictions
Administrators do not have access to the password set by the student.
Administrators do not create the initial password for the user; it is automatically generated after registration.
Once a professor or student is registered, they cannot switch roles (a professor cannot become a student and vice versa).
If a role change is necessary, a new registration must be created with the desired role.

# Docs

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

