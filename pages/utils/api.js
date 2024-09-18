
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

export function compareItemsSelected(preSelected, selected) {

    const removedItems = preSelected.filter(item =>
        !(selected.some(selectedItem => selectedItem._id === item._id)));
    const addedItems = selected.filter(item =>
        !preSelected.some(preSelectedItem => preSelectedItem._id === item._id));


    return {
        removedItems,
        
        addedItems
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
    
    return parsedSubjectList
}

export function parseSubjectToList(subjects, href) {
    
    let parsedSubjects = []
    subjects.forEach(subject => {                
        const id = subject.id ? subject.id : subject._id
        const parsedSubject = {
            name: subject.name ? subject.name : subject.text,
            href: `${href}?id=${id}`,
            id: id

        }
        parsedSubjects.push(parsedSubject)
    })    
    return parsedSubjects
}

export function formatDate(date){
    const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    });
    return formattedDate
}

export function formatTime(time) {
    const hours = Math.floor(time / 60);
    // Calcula os time restantes
    const minutes = time % 60;

    // Formata horas e time para garantir dois dígitos
    const hoursFormated = String(hours).padStart(2, '0');
    const minutesFormated = String(minutes).padStart(2, '0');

    // Retorna a string formatada
    return `${hoursFormated}:${minutesFormated}`;
}

export function checkDate() {
    const dateStartInput = document.querySelector('.date-start')
    const dateStart = new Date(dateStartInput.value)
    //ajusting timezone
    const ajustedStartDate = new Date(dateStart.getTime() + dateStart.getTimezoneOffset() * 60000)
    
    const dateEndInput = document.querySelector('.date-end')
    const dateEnd = new Date(dateEndInput.value)
    //ajusting timezone
    const ajustedEndDate = new Date(dateEnd.getTime() + dateEnd.getTimezoneOffset() * 60000)
    
    const dateNow = new Date();
    console.log(ajustedStartDate,'//', ajustedEndDate,"//", dateNow);

    if (new Date(ajustedStartDate) < new Date(dateNow)) {
        dateStartInput.style.border = '1px solid red'
        const errorMessage = dateStartInput.parentNode.querySelector('.error-message')
        errorMessage.classList.remove('hidden')
        return false
    }
    if (new Date(ajustedEndDate) < new Date(ajustedStartDate)) {
        dateEndInput.style.border = '1px solid red'
        const errorMessage = dateEndInput.parentNode.querySelector('.error-message')
        errorMessage.classList.remove('hidden')

        return false
    }
    return true
    
}