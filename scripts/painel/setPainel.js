import { getAllSubjects } from "../service.js";
const backBtn = document.getElementById("back-icon")
const numberOfSubjects = document.getElementById("numero-entidades")
const createSubjectBtn = document.getElementById("register-btn")

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

backBtn.addEventListener('click', () => {
    window.location.href = "http://127.0.0.1:5500/dashboardAdm.html"
})

createSubjectBtn.addEventListener('click', () => {
    window.location.href = "http://127.0.0.1:5500/cadastroSubjects.html"
})


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

function createRow(subject) {

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
    tdActions.innerHTML = `
    <a href="" class="crud-anchor">Editar</a>
    <a href="" class="crud-anchor">Remover</a>
    `

    tr.appendChild(tdSubject)
    tr.appendChild(tdTeacher)
    tr.appendChild(tdQuizzes)
    tr.appendChild(tdActions)
    tbody.appendChild(tr)

}

setPainelSubjects()



// <tbody>
//     <tr>
//         <td>matematica</td>
//         <td>jojo</td>
//         <td>10</td>
//         <td>
//             <a href="" class="crud-anchor">Editar</a>
//             <a href="" class="crud-anchor">Remover</a>
//         </td>
//     </tr>