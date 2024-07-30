import { AuthCard } from "./components/authCard/authCard.js"
import { Input } from "./components/input/input.js"
import { Button } from "./components/button/button.js"
import { Logo } from "./components/logo/logo.js"

import { userLogin } from "../scripts/service.js";
import { getRoleByToken } from "../scripts/service.js"

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
            text: 'butao',
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
            inputClass: 'login-user-input'
        }),
        Input({
            placeholder: 'placeholder',
            required: true,
            title: 'Senha',
            errorMessage: 'este campo deve ser preenchido',
            type: 'password',
            inputClass: 'login-password-input'

        })],
        extraAnchor: {
            text: 'anchora extra pra mudar senha',
            href: ''
        },
    })
    body.appendChild(loginCard)
    
}

async function tryLogin() {
    const userData = await sendUserDataToFetch()
    console.log(userData);
        if (!userData.ok) {
            //enviar mensagem de erro de login
            // sendLoginErrorMessage()
            console.log('erro de login');
            
            return
        }
        const data = await userData.json()
        const token = data.token
        console.log(token);
        localStorage.setItem('token', token)
        // verifica qual a role do usuario pelo token
        const user_role = await getRoleByToken(token)
        if (user_role == "estudante") {
            window.location.href = `${url}/dashboardStudent.html`
        }
        if (user_role == "administrador") {
            window.location.href = `${url}/dashboardAdm.html`
        }
}

async function sendUserDataToFetch() {
    
    const userInput = document.getElementsByClassName('login-user-input')[0].value
    const passwordInput = document.getElementsByClassName('login-password-input')[0].value

    const loginStatus = await userLogin(userInput, passwordInput)
    return loginStatus
}



LoginPage()