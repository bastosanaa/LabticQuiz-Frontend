import { Alternatives } from "../../../../../components/alternatives/alternatives.js"
import { Button } from "../../../../../components/button/button.js"
import { Input } from "../../../../../components/input/input.js"
import { NavBar } from "../../../../../components/navBar/navBar.js"
import { PageHeader } from "../../../../../components/pageHeader/pageHeader.js"
import { Select } from "../../../../../components/select/select.js"
import { createQuiz, getQuizByID, updateQuiz } from "../../../../../scripts/service/quizService.js"
import { getAllSubjects } from "../../../../../scripts/service/subjectService.js"
import { getEntityID, parseSubjectToList } from "../../../../utils/api.js"

const token = localStorage.getItem('token')
const quiz_id = getEntityID()
console.log(quiz_id);

const quiz = quiz_id ? await(await getQuizByID(token,quiz_id)).json() : null
console.log(quiz);


async function setEditQuizPage() {
    const subjects = await getAllSubjects(token)
    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                anchor: 'http://127.0.0.1:5501/pages/teacher/dashboard/dashboardTeacher.html',
            },
            {
                imgSrc: '/assets/books.svg',
                title: 'Disciplinas',
                dropdownItems: parseSubjectToList(subjects,'http://127.0.0.1:5501/pages/teacher/quiz/quizzesPainel.html')        
            },
            {
                imgSrc: '/assets/register.svg',
                title: 'Criar Quiz',
                selected: true,
                anchor: 'http://127.0.0.1:5501/pages/teacher/quiz/registerQuiz.html'
            }
        ]
    }

    )
    main.appendChild(navBar)
    
    const page = document.createElement('div')
    page.classList.add('page')
    
    const header = PageHeader({
        title_text: 'Informações do Quiz',
        back_btn: true,
        back_btn_address: 'http://127.0.0.1:5501/pages/adm/painel/subject/painelSubject.html'
    })

    page.append(header)
    
    const registerForm = document.createElement('div')
    registerForm.classList.add('register-form')

    const inputDiv = document.createElement('div')
    inputDiv.classList.add('crud-input-div')
    registerForm.appendChild(inputDiv)

    page.append(registerForm)

    const nameInput = Input({
        placeholder: 'Nome do quiz',
        type: 'text'
    })
    inputDiv.append(nameInput)
        
    
    const subjectSelect = Select({
        options: [{
            text: 'Selecione a disciplina',
            value: ''
        },
        ...parseSubjectsToSelect(subjects)
    ]
    })
    if (quiz) {
        subjectSelect.disabled = true
    }
    subjectSelect.classList.add('crud-input')
    inputDiv.append(subjectSelect)

    const quizTypeSelect = Select({
        options: [{
            text: 'Selecione o tipo de Quiz',
            value: ''
        },
        {
            text: 'Avaliação',
            value: 'avaliacao'
        },
        {
            text: 'Atividade',
            value: 'atividade'
        }
    ]
    })
    quizTypeSelect.classList.add('crud-input')
    inputDiv.append(quizTypeSelect)

    const attemptsInput = Input({
        placeholder: 'Tentativas para realizar o quiz',
        type: 'text'
    })
    attemptsInput.classList.add('crud-input')
    inputDiv.append(attemptsInput)

    const timeLimitSelect = Select({
        options: [{
            text: 'Tempo máximo do Quiz',
            value: ''
        },
        ...generateTimeOptions()

    ]
    })
    timeLimitSelect.classList.add('crud-input')
    inputDiv.append(timeLimitSelect)

    const timeStartInput = document.createElement('input')
    timeStartInput.type = 'date'
    timeStartInput.classList.add('crud-input')
    inputDiv.append(timeStartInput)

    const timeEndInput = document.createElement('input')
    timeEndInput.type = 'date'
    timeEndInput.classList.add('crud-input')
    inputDiv.append(timeEndInput)

    const instructionsTextArea = document.createElement('textarea')
    instructionsTextArea.cols = 220
    instructionsTextArea.rows = 10
    instructionsTextArea.placeholder = 'Escreva aqui as orientacoes para o aluno...'
    inputDiv.append(instructionsTextArea)

    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('button-div')
    registerForm.append(buttonDiv)

    const nameField = nameInput.querySelector('input')
    const subjectField = subjectSelect.querySelector('select')
    const typeField = quizTypeSelect.querySelector('select')
    const timeLimitField = timeLimitSelect.querySelector('select')
    const attemptsField = attemptsInput.querySelector('input')

    //questions div
    for (let i = 1; i < 11; i++) {
        const questionDiv = document.createElement('div')
        questionDiv.classList.add('question-div')
        questionDiv.style.width = '100%'
        questionDiv.style.display = 'flex'
        questionDiv.style.flexDirection = 'column'
        questionDiv.style.gap = '1rem'
        const question = Input({
            placeholder: 'Digite aqui a pergunta...',
            title: `Pergunta ${i}`,
            
        })
        question.classList.add('question')
        questionDiv.append(question)
        
        const alternatives = Alternatives()
        alternatives.style.pointerEvents = 'none'
        questionDiv.append(alternatives)
        
        inputDiv.append(questionDiv)
        
    }
    
    const submitButton = Button({
        size: 'medium',
        text: 'Salvar alterações',
        action: async () => {

            // const quiz_id = await SaveQuizDraft()
            const questionDivs = document.querySelectorAll('.question-div')
            console.log(questionDivs);

            const questions = []

            questionDivs.forEach(questionDiv => {
                const questionInputContainer = questionDiv.querySelector('.question')
                const questionInput = questionInputContainer.querySelector('input')

                const correctAlt = document.querySelector('#correct-alt')

                const wrongAlt1 = document.querySelector('#wrong-alt1')
                const wrongAlt2 = document.querySelector('#wrong-alt2')
                const wrongAlt3 = document.querySelector('#wrong-alt3')

                
                questions.push({
                    title: questionInput.value,
                    alternatives: [
                        {
                            correct: true,
                            content: correctAlt.value
                        },
                        {
                            correct: false,
                            content: wrongAlt1.value
                        },
                        {
                            correct: false,
                            content: wrongAlt2.value
                        },
                        {
                            correct: false,
                            content: wrongAlt3.value
                        }
                    ]
                })
            })

            const quizName = nameField.value
            const quizSubject = subjectField.value
            const quizType = typeField.value
            const quizAttempts = attemptsField.value ? attemptsField.value : 999
            const quizTimeLimit = timeLimitField.value
            const quizInstructions = instructionsTextArea.value
            const quizStartDate = timeStartInput.value
            const quizEndDate = timeEndInput.value
        
            if (quizName && quizTimeLimit && quizStartDate && quizEndDate && quizInstructions && quizType) { 
                if (quiz) {
                    
                    const quiz_id = getEntityID()

                    const quizNewInfo = {
                        title:quizName,
                        time: quizTimeLimit,
                        attempts: quizAttempts,
                        date_start: quizStartDate,
                        date_end: quizEndDate,
                        instructions: quizInstructions,
                        type: quizType,
                        is_draft: false,
                        questions:questions
                        
                    }
            await updateQuiz(token,quizNewInfo,quiz_id)
            console.log(questions);
            console.log(quiz_id);
            

            if (quiz_id) {
                window.location.href = `http://127.0.0.1:5501/pages/teacher/quiz/registerQuizQuestions.html?id=${quiz_id}`
            }

        }}
        }
    })
    buttonDiv.append(submitButton)


    main.append(page)

    
    if (quiz) {
        nameField.value = quiz.title
        subjectField.value = quiz.subject_id._id
        typeField.value = quiz.type
        attemptsField.value = quiz.attempts
        timeLimitField.value = quiz.time
        instructionsTextArea.value = quiz.instructions

        timeStartInput.value = quiz.date_start.split('T')[0]        
        timeEndInput.value = quiz.date_end.split('T')[0]
    }
}

setEditQuizPage()

function generateTimeOptions() {
    const options = [];
    let time = 30;  

    while (time <= 240) {  
        const hours = Math.floor(time / 60);  
        const minutes = time % 60;  

        let text;
        if (hours > 0 && minutes > 0) {
            text = `${hours}h ${minutes}min`;
        } else if (hours > 0) {
            text = `${hours}h`;
        } else {
            text = `${minutes}min`;
        }

        options.push({
            text: text,
            value: time
        });

        time += 30; 
    }

    return options;
}

function parseSubjectsToSelect(subjects) {
    const parsedSubjects = []
    subjects.forEach(subject => {
        const parsedSubject = {
            text: subject.name,
            value: subject._id    
        }
        parsedSubjects.push(parsedSubject)
    })
    return parsedSubjects
}


