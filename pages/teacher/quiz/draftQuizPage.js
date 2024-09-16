import { Button } from "../../../components/button/button.js"
import { Input } from "../../../components/input/input.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { Select } from "../../../components/select/select.js"
import { createQuiz } from "../../../scripts/service/quizService.js"
import { getAllSubjects } from "../../../scripts/service/subjectService.js"
import { getEntityID, parseSubjectToList } from "../../utils/api.js"

const token = localStorage.getItem('token')
const subject = getEntityID() 

async function setQuizDraftPage() {
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
        back_btn_address: subject?  `http://127.0.0.1:5501/pages/teacher/quiz/quizzesPainel.html?id=${subject}` : 'http://127.0.0.1:5501/pages/teacher/dashboard/dashboardTeacher.html'
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

    const draftButton = Button({
        type:'outline',
        size: 'medium',
        text: 'Salvar Rascunho',
        action: async () => {
            const quiz_id = await SaveQuizDraft()

            window.location.href = 'http://127.0.0.1:5501/pages/teacher/dashboard/dashboardTeacher.html'
        }
    })
    buttonDiv.append(draftButton)
    
    const submitButton = Button({
        size: 'medium',
        text: 'Criar Perguntas',
        action: async () => {

            const quiz_id = await SaveQuizDraft()            

            if (quiz_id) {
                window.location.href = `http://127.0.0.1:5501/pages/teacher/quiz/registerQuizQuestions.html?id=${quiz_id}`
            }

        }
    })
    buttonDiv.append(submitButton)


    main.append(page)

    async function SaveQuizDraft() {
        const quizName = nameField.value
        const quizSubject = subjectField.value
        const quizType = typeField.value
        const quizAttempts = attemptsField.value ? attemptsField.value : 999
        const quizTimeLimit = timeLimitField.value
        const quizInstructions = instructionsTextArea.value
        const quizStartDate = timeStartInput.value
        const quizEndDate = timeEndInput.value
        const questions = []
        const isDraft = true
    
        if (quizName && quizSubject && quizTimeLimit && quizStartDate && quizEndDate && quizInstructions && quizType) {
            const response = await createQuiz(token, quizName, quizSubject, quizTimeLimit, quizAttempts, quizStartDate,quizEndDate, quizInstructions, quizType, questions, isDraft)
            const quiz_id = (await response.json())._id
            return quiz_id
        }
        return none
    }
    

}

setQuizDraftPage()

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


