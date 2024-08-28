import { Alternatives } from "../../../components/alternatives/alternatives.js"
import { Button } from "../../../components/button/button.js"
import { Input } from "../../../components/input/input.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { Select } from "../../../components/select/select.js"

async function setRegisterQuizQuestionsPage() {
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
        title_text: 'Nome do Quiz',
        subtitle_text: 'Nome da disciplina',
        // subtitle_size: 'small',
        back_btn: true,
    })
    page.append(header)

    const registerForm = document.createElement('div')
    registerForm.classList.add('register-form')
    page.append(registerForm)

    const inputDiv = document.createElement('div')
    inputDiv.classList.add('crud-input-div')
    registerForm.appendChild(inputDiv)

    const question = Input({
        placeholder: 'Digite aqui a pergunta...',
        title: 'Pergunta 1',

    })
    inputDiv.append(question)

    const alternatives = Alternatives()
    inputDiv.append(alternatives)

    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('button-div')
    registerForm.append(buttonDiv)

    const draftButton = Button({
        type: 'outline',
        text: 'Guardar Rascunho',
        size: 'medium'
    })
    buttonDiv.append(draftButton)

    const postButton = Button({
        text: 'Postar',
        size: 'medium'
    })
    buttonDiv.append(postButton)

    main.append(page)

}


setRegisterQuizQuestionsPage()