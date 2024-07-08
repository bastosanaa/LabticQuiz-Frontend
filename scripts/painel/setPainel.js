import { getAllSubjects } from "../service.js";
import { deleteSubject } from "../service.js";
import { deleteStudentSubject } from "../service.js"
const backBtn = document.getElementById("back-icon")
const numberOfSubjects = document.getElementById("numero-entidades")
const createSubjectBtn = document.getElementById("register-btn")
const url = 'http://127.0.0.1:5501'


// mudar o nome desse arquivo ja que nao apenas seta o painel

async function setPainelSubjects() {
    const token = localStorage.getItem('token')
    const subjects = await getAllSubjects(token)
    await setNumberOfSubjects(subjects)
    if (subjects) {
        setHeader()
        setTableRows(subjects)
    }
}

async function setNumberOfSubjects(subjects) {
    numberOfSubjects.textContent = await subjects.length
}
//navigation
backBtn.addEventListener('click', () => {
    window.location.href = `${url}/dashboardAdm.html`
})

createSubjectBtn.addEventListener('click', () => {
    window.location.href = `${url}/cadastroSubjects.html`
})

//setPainel
function setTableRows(subjects){
    subjects.forEach(subject => createRow(subject))
}

function setHeader(){
    const thead = document.getElementById('table-head')

    const tr = document.createElement('tr')
    const thSubject = document.createElement('th')
    thSubject.textContent = "Nome"
    const thTeacher = document.createElement('th')
    thTeacher.textContent = "Professor"
    const thQuizzes = document.createElement('th')
    thQuizzes.textContent = "Quiz"
    const thActions = document.createElement('th')
    thActions.textContent = "Ações"

    tr.appendChild(thSubject)
    tr.appendChild(thTeacher)
    tr.appendChild(thQuizzes)
    tr.appendChild(thActions)
    thead.appendChild(tr)

}

async function createRow(subject) {

    const tbody = document.getElementById('table-body')

    const tr = document.createElement('tr')
    const tdSubject = document.createElement('td')
    tdSubject.classList.add('string-spacing')
    tdSubject.textContent = subject.name
    const tdTeacher = document.createElement('td')
    tdTeacher.classList.add('string-spacing')
    if (subject.teacher_id) {
        tdTeacher.textContent = subject.teacher_id.name
    } else {
        tdTeacher.textContent = "Professor indefinido"
    }
    const tdQuizzes = document.createElement('td')
    tdQuizzes.textContent = (subject.quizzes).length
    const tdActions = document.createElement('td')

    const aRemoveBtn = document.createElement('a')
    aRemoveBtn.textContent = 'Remover'
    aRemoveBtn.id = 'remove-btn'
    aRemoveBtn.classList.add('crud-anchor')

    const aEditBtn = document.createElement('a')
    aEditBtn.textContent = 'Editar'
    aEditBtn.id = 'edit-btn'
    aEditBtn.href = `${url}/edicaoSubjects.html?id=${subject._id}`
    aEditBtn.classList.add('crud-anchor')

    tdActions.appendChild(aEditBtn)
    tdActions.appendChild(aRemoveBtn)


    tr.appendChild(tdSubject)
    tr.appendChild(tdTeacher)
    tr.appendChild(tdQuizzes)
    tr.appendChild(tdActions)
    tbody.appendChild(tr)
    

    aRemoveBtn.addEventListener('click', async () => {
        const dialog = await createDialog(subject)
        const body = document.getElementById('page')
        body.append(dialog)
        dialog.showModal()
        // await deleteSubjectFromTable(subject._id)

    })


}

await setPainelSubjects()

//DELETE
async function deleteSubjectFromTable(token, subject_id) {
    await deleteSubject(token,subject_id)
    // location.reload()
}

async function deleteStudentSubjectRelation(token, subject_id) {
    await deleteStudentSubject(token, subject_id)
}

//dialog
async function createDialog(subject) {
    const dialog = document.createElement('dialog')
    dialog.id = 'dialog-container'

    //header
    const dialogHeader = document.createElement('p')
    dialogHeader.id = 'dialog-header'
    dialogHeader.textContent = 'Tem certeza?'

    //description
    const dialogDescription = document.createElement('p')
    dialogDescription.id = 'dialog-description'
    
    const textBefore = document.createTextNode('Você excluirá a disciplina ');
    const textAfter = document.createTextNode(' Este é o texto depois do span.');

    const span = document.createElement('span')
    span.textContent = subject.name
    span.classList.add('subject-name-span')

    dialogDescription.appendChild(textBefore)
    dialogDescription.appendChild(span)
    dialogDescription.appendChild(textAfter)

    //form
    const form = document.createElement('form')
    form.action = 'dialog'
    form.id = 'dialog-form'

    const backButton = document.createElement('button')
    backButton.id = 'back-button'
    backButton.textContent = 'Voltar'

    const removeButton = document.createElement('button')
    removeButton.id = 'confirm-button'
    removeButton.textContent = 'Deletar'

    form.appendChild(backButton)
    form.appendChild(removeButton)

    //dialog 
    dialog.appendChild(dialogHeader)
    dialog.appendChild(dialogDescription)
    dialog.appendChild(form)

    backButton.addEventListener('click',  (event) => {
        event.preventDefault()
        dialog.close()
    })
    //remove
    removeButton.addEventListener('click', async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        await deleteSubjectFromTable(token, subject._id)
        await deleteStudentSubjectRelation(token, subject._id)
        dialog.close()
        location.reload()
    }
    )
    return dialog
}