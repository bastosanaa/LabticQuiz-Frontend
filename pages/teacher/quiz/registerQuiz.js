import { Button } from "../../../components/button/button.js"
import { Input } from "../../../components/input/input.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { Select } from "../../../components/select/select.js"
import { createQuiz, getQuizByID, updateQuiz } from "../../../scripts/service/quizService.js"
import { getAllSubjects } from "../../../scripts/service/subjectService.js"
import { checkDate, checkIfEmpty, getEntityID, parseSubjectToList } from "../../utils/api.js"
import { urlPage } from "../../../config/url-config.js"
import { hideLoader, showLoader } from "../../utils/loaderManipulation.js"


const token = localStorage.getItem('token')
const quiz_id = getEntityID()
const quiz = quiz_id ? await(await getQuizByID(token,quiz_id)).json() : null

async function setRegisterQuizPage() {
    const subjects = await getAllSubjects(token)
    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                anchor: `${urlPage}/pages/teacher/dashboard/dashboardTeacher.html`,
            },
            {
                imgSrc: '/assets/books.svg',
                title: 'Disciplinas',
                dropdownItems: parseSubjectToList(subjects,`${urlPage}/pages/teacher/quiz/quizzesPainel.html`)        
            },
            {
                imgSrc: '/assets/register.svg',
                title: 'Criar Quiz',
                selected: true,
                anchor: `${urlPage}/pages/teacher/quiz/registerQuiz.html`
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
        back_btn_address: `${urlPage}/pages/teacher/dashboard/dashboardTeacher.html`
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
        type: 'text',
        required: true
    })
    inputDiv.append(nameInput)
        
    
    const subjectSelect = Select({
        options: [{
            text: 'Selecione a disciplina',
            value: ''
        },
        ...parseSubjectsToSelect(subjects)
    ],
    required: true
    })
    if (quiz) {
        const select = subjectSelect.querySelector('select')
        select.disabled = true
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
    ],
    required:true
    })
    quizTypeSelect.classList.add('crud-input')
    inputDiv.append(quizTypeSelect)

    const attemptsInput = Input({
        placeholder: 'Tentativas para realizar o quiz',
        type: 'text',

    })
    attemptsInput.classList.add('crud-input')
    inputDiv.append(attemptsInput)

    const timeLimitSelect = Select({
        options: [{
            text: 'Tempo máximo do Quiz',
            value: '',
        },
        ...generateTimeOptions()
        
    ],
    required: true
    })
    timeLimitSelect.classList.add('crud-input')
    inputDiv.append(timeLimitSelect)

    //startDateDiv
    const dateStartDiv = document.createElement('div')
    dateStartDiv.style.position = 'relative'
    dateStartDiv.classList.add('date-div')

    const timeStartInput = document.createElement('input')
    timeStartInput.type = 'date'
    timeStartInput.classList.add('crud-input', 'date-start')
    dateStartDiv.append(timeStartInput)

    const timeStartInputLabel = document.createElement('p')
    timeStartInputLabel.textContent = 'Data de Início'

    const errorDateStart = document.createElement('p')
    errorDateStart.classList.add('error-message', 'hidden')
    errorDateStart.textContent = 'Data inválida'
    errorDateStart.style.bottom = '-1rem'

    dateStartDiv.append(timeStartInputLabel)
    dateStartDiv.append(errorDateStart)
    inputDiv.append(dateStartDiv)
    
    //endDateDiv
    const dateEndDiv = document.createElement('div')
    dateEndDiv.style.position = 'relative'
    dateEndDiv.classList.add('date-div')

    const timeEndInput = document.createElement('input')
    timeEndInput.type = 'date'
    timeEndInput.classList.add('crud-input', 'date-end')
    dateEndDiv.append(timeEndInput)
    inputDiv.append(dateEndDiv)

    const timeEndInputLabel = document.createElement('p')
    timeEndInputLabel.textContent = 'Data de Término'
    dateEndDiv.append(timeEndInputLabel)
    const errorDateEnd = document.createElement('p')
    errorDateEnd.classList.add('error-message', 'hidden')
    errorDateEnd.textContent = 'Data inválida'
    errorDateEnd.style.bottom = '-1rem'

    dateEndDiv.append(errorDateEnd)
    inputDiv.append(dateEndDiv)

    

    //textArea
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

            if (quiz_id) {
                window.location.href = `${urlPage}/pages/teacher/dashboard/dashboardTeacher.html`
            }
        }
    })
    buttonDiv.append(draftButton)
    
    const submitButton = Button({
        size: 'medium',
        text: 'Criar Perguntas',
        action: async () => {

            const quiz_id = await SaveQuizDraft()            

            if (quiz_id) {
                window.location.href = `${urlPage}/pages/teacher/quiz/registerQuizQuestions.html?id=${quiz_id}`
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
    

        checkIfEmpty(nameField)
        checkIfEmpty(subjectField)
        checkIfEmpty(typeField)
        checkIfEmpty(timeLimitField)
        if (quizName && quizTimeLimit && quizStartDate && quizEndDate  && quizType) {
            const data = checkDate()

            if (data && !isNaN(quizAttempts)) {
                
                //check if its a draft quiz
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
                        is_draft: true,
                        
                    }
                    const response = await updateQuiz(token, quizNewInfo, quiz_id )
                    
                    const updatedQuiz = (await response.json())._id                
                    return updatedQuiz
                }
                const response = await createQuiz(token, quizName, quizSubject, quizTimeLimit, quizAttempts, quizStartDate,quizEndDate, quizInstructions, quizType, questions, isDraft)
                
                const quiz_id = (await response.json())._id
                return quiz_id
            } else {
                alert('Preencha os campos corretamente')
            }

        }
        return null
    }
    
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

async function loadPage() {
    showLoader()
    try {
        await setRegisterQuizPage()

    } finally {
        hideLoader()
    }
}
await loadPage()


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


