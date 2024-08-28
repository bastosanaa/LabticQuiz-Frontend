import { Button } from "../../../components/button/button.js"
import { Input } from "../../../components/input/input.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { Select } from "../../../components/select/select.js"

async function setRegisterQuizPage() {
    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                selected: true,
                anchor: 'http://127.0.0.1:5501/pages/adm/dashboard/dashboardAdm.html',
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
        back_btn_address: 'http://127.0.0.1:5501/pages/teacher/dashboard/dashboardTeacher.html'
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
        }]
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

    const InstructionsTextArea = document.createElement('textarea')
    InstructionsTextArea.cols = 220
    InstructionsTextArea.rows = 10
    InstructionsTextArea.placeholder = 'Escreva aqui as orientacoes para o aluno...'
    inputDiv.append(InstructionsTextArea)

    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('button-div')
    registerForm.append(buttonDiv)

    const draftButton = Button({
        type:'outline',
        size: 'medium',
        text: 'Salvar Rascunho',
        action: ''
    })
    buttonDiv.append(draftButton)
    
    const submitButton = Button({
        size: 'medium',
        text: 'Criar Perguntas',
        action: () => {
            window.location.href = 'http://127.0.0.1:5501/pages/teacher/quiz/registerQuizQuestions.html'
        }
    })
    buttonDiv.append(submitButton)


    main.append(page)

}

function setTimeOptions() {
    return
}

setRegisterQuizPage()