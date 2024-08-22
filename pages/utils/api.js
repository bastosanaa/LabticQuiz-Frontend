
import { registerStudentToSubject, deleteStudentSubject, getSubjectsbyStudent } from '../../scripts/service/studentSubjecService.js';
import {createSubject, updateSubjectChanges, deleteSubject, getSubjectByID, getAllSubjects} from '../../scripts/service/subjectService.js'
import {userLogin, createUser, deleteUserByID, updateUserChanges, getUserIDbyToken, getUserByID, getRoleByToken, getAllTeachers, getAllStudents} from '../../scripts/service/userService.js'

const url = "http://localhost:3333/api"

async function AuthUser(role_access) {
    const token = localStorage.getItem('token')
    user_role = getRoleByToken(token)
    if (user_role === role_access) {
        return true
    }
    return
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
    const subjectsRegistered = await getSubjectsbyStudent(token, id)
    

    nameField.value = user.name
    registrationField.value = user.registration
    emailField.value = user.email

    //🚧 - setar disciplinas
}

export async function getSubjectsRegistered(token) {
    const id = getEntityID()
    return await getSubjectsbyStudent(token, id)
}

export function mapToOnlyEntityID(objects) {
    return objects.map(object => object._id)
    
}

function compareArrays(arrayOriginal, arrayNovo) {
    const removidos = arrayOriginal.filter(item => !arrayNovo.includes(item));
    const adicionados = arrayNovo.filter(item => !arrayOriginal.includes(item));
    
    return {
        removidos,
        adicionados
    };
}

export function subjectParser(subjectList) {
    
    const parsedSubjectList = []
    subjectList.forEach(subject => {
        const parsedSubject = {
            _id: subject._id? subject._id : subject.subject_id ,
            name: subject.name? subject.name : subject.subject_name
        }
        parsedSubjectList.push(parsedSubject)
    })

    console.log(parsedSubjectList);
    
    return parsedSubjectList
}