import { userLogin } from "./service.js";
import { getRoleByToken } from "./service.js"
const formFields = document.querySelectorAll('[required]');
const submitBtn = document.getElementById('login-submit-button');
const dashboardLocation = 'http://127.0.0.1:5500/dashboard.html'


formFields.forEach(field => {
    field.addEventListener("blur", () => {
        checkIfEmpty(field)
    })
})

function checkIfEmpty(field) {
    const errorMessage = field.parentNode.querySelector('#error-msg')
    const errorMessageText = field.parentNode.querySelector('#error-msg-text')
        if (field.value == "") {
            errorMessageText.textContent = "este campo deve ser preenchido"
            field.style.border = "1px solid red"
            errorMessage.classList.remove('hidden')
        } else {
            field.style.border = ""
            errorMessage.classList.add('hidden')
        }
}

// Login - req
submitBtn.addEventListener('click', async (event) => {
    event.preventDefault()
    try {
        const userData = await sendUserDataToFetch()
        if (!userData.ok) {
            sendLoginErrorMessage()
            
            return
        }
        const data = await userData.json()
        const token = data.token
        localStorage.setItem('token', token)
        // verifica qual a role do usuario pelo token
        const user_role = await getRoleByToken(token)
        if (user_role == "estudante") {
            window.location.href = "http://127.0.0.1:5500/dashboardStudent.html"
        }

    } catch (error) {
        console.log(error);
        alert('Login Falhou')
    }
})

async function sendUserDataToFetch() {
    
    const userInput = document.getElementById('login-user-input').value

    const passwordInput = document.getElementById('login-password-input').value

    const loginStatus = await userLogin(userInput, passwordInput)
    return loginStatus
}

function sendLoginErrorMessage() {
    formFields.forEach(field => {
        field.style.border = "1px solid red"
    })
    const lastFieldErrorMessage = formFields[formFields.length - 1].parentNode.querySelector('#error-msg')
    const lastFieldErrorMessageText = lastFieldErrorMessage.querySelector('#error-msg-text') 
    lastFieldErrorMessageText.textContent = "usuário ou senha incorretos"
    lastFieldErrorMessage.classList.remove('hidden')

    formFields.forEach(field => {
        field.addEventListener("click", () => {
            lastFieldErrorMessage.classList.add('hidden')
            formFields.forEach(field => {
                field.style.border = ""
            })
        })
    })
}

async function fetchUserAutorization() {
    const token = localStorage.getItem('token')
}