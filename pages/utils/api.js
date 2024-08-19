
import { getRoleByToken, createUser } from "../../scripts/service.js"

const url = "http://localhost:3333/api"

async function AuthUser(role_access) {
    const token = localStorage.getItem('token')
    user_role = getRoleByToken(token)
    if (user_role === role_access) {
        return true
    }
    return
}

async function getAllTeachers(token) {
    const response = await fetch (`${url}/users/teachers`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        }
    })

    const teachers = await response.json()
    return teachers
}

export function checkIfEmpty(input) {
    const errorMessageParagraph = input.parentNode.querySelector('.error-message')
    if (input.value == "") {
        input.style.border = "1px solid red"
        errorMessageParagraph.textContent = 'este campo deve ser preenchido'
        errorMessageParagraph.classList.remove('hidden')
    } else {
        input.style.border = ""
        errorMessageParagraph.classList.add('hidden')
    }
}

export function checkIfAllInputsFiled() {
    const inputs = document.querySelectorAll('input')
    let emptyInputs = 0
    inputs.forEach(input => {
        if (!input.value) {
            checkIfEmpty(input)
            emptyInputs++
        }
    })
    if (emptyInputs > 0) {
        return false
    }
    return true
}

export async function postNewUser(token, nameField, registrationField, emailField, role) {
    const name = nameField.value
    const registration = registrationField.value
    const email = emailField.value
    const password = '123'
    await createUser(token,name,registration,email,password,role)
}