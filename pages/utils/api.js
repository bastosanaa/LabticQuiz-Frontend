
import { getRoleByToken, createUser, getUserbyToken, getUserByID, updateSubjectChanges, updateUserChanges } from "../../scripts/service.js"

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
    return await createUser(token,name,registration,email,password,role)
}

export async function patchUserUpdates(token, nameField, registrationField, emailField, role) {
    const id = getEntityID()
    const name = nameField.value
    const registration = registrationField.value
    const email = emailField.value
    await updateUserChanges(token,id,name,registration,email)
}

export function getEntityID() {
    const url = window.location.search
    const params = new URLSearchParams(url)
    const id = params.get('id')
    return id
}

export async function setUserEditPage(token, nameField, registrationField, emailField){
    const id = getEntityID()
    const user = await getUserByID(token, id)
    console.log(user);
    

    nameField.value = user.name
    registrationField.value = user.registration
    emailField.value = user.email

    //🚧 - setar disciplinas

}