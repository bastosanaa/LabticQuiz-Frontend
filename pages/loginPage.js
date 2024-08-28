import { AuthCard } from "../components/authCard/authCard.js"
import { Input } from "../components/input/input.js"
import { Button } from "../components/button/button.js"
import { Logo } from "../components/logo/logo.js"

import { getRoleByToken, userLogin } from "../scripts/service/userService.js"

const url = 'http://127.0.0.1:5501'
export function LoginPage() {

    const body = document.querySelector('body')
    body.style.position = 'relative'

    body.style.backgroundImage = 'url("../assets/bg.svg")'

    const logo = Logo({text: true, mode: 'dark'})

    logo.style.position = 'absolute'
    logo.style.top = '26px'
    logo.style.left = '23px'

    body.append(logo)

    const loginCard = AuthCard({
        title: 'Faça Login',
        buttonParams: Button({
            text: 'Entrar',
            size: 'medium',
            action: () => {
                try {
                    tryLogin()
                } catch(error) {
                    console.log(error);
                    alert('Login Falhou')
                }
            }
        }),
        inputs: [Input({
            placeholder: 'usuario@gmai.com',
            required: true,
            title: 'Matricula ou Email',
            errorMessage: 'este campo deve ser preenchido',
            inputClass: 'login-user-input',
            style: 'grey'
        }),
        Input({
            placeholder: 'placeholder',
            required: true,
            title: 'Senha',
            errorMessage: 'este campo deve ser preenchido',
            type: 'password',
            inputClass: 'login-password-input',
            style: 'grey'

        })],
        extraAnchor: {
            text: 'Esqueceu a senha ou deseja trocar?',
            href: ''
        },
    })
    body.appendChild(loginCard)
    
}

LoginPage()

const userInput = document.querySelector('.login-user-input')
console.log(userInput);
const passwordInput = document.querySelector('.login-password-input')

async function tryLogin() {
    const userData = await sendUserDataToFetch()

        if (!userData.ok) {
            //mostrar mensagem de erro de login na tela
            sendLoginErrorMessage()
            console.log('erro de login');
            return
        }
        const data = await userData.json()
        const token = data.token
        localStorage.setItem('token', token)
        await redirectUserPage(token)
        
}

//refatorar utilizando dicionario
async function redirectUserPage(token) {
    const user_role = await getRoleByToken(token)
    if (user_role == "estudante") {
        window.location.href = `${url}/pages/student/dashboard/dashboardStudent.html`
    }
    if (user_role == "administrador") {
        window.location.href = `${url}/pages/adm/dashboard/dashboardAdm.html`
    }
    if (user_role == "professor"){
        window.location.href = `${url}/pages/teacher/dashboard/dashboardTeacher.html`
    }
}

async function sendUserDataToFetch() {
    
    const userValue =  userInput.value
    const passwordValue = passwordInput.value

    if (userValue && passwordValue) {
        const loginStatus = await userLogin(userValue, passwordValue)
        return loginStatus
    }
}


async function sendLoginErrorMessage() {

    const lastErrorMessage = document.getElementsByClassName('error-message')[1]
    console.log(lastErrorMessage);
    lastErrorMessage.innerHTML = 'senha e/ou usuário incorretos'
    lastErrorMessage.classList.remove('hidden')

    userInput.style.borderColor = '#EF4444'
    passwordInput.style.borderColor = '#EF4444'
}