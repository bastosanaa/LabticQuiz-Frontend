import { getSubjectByID } from "../service.js"
const subjectNameInput = document.getElementById('sub-name')
const subjectSelectTeacher = document.getElementById('teacher-select')
const saveChangesButton = document.getElementById('edit-form-submit-button')

function getSubjectID() {
    const url = window.location.search
    const params = new URLSearchParams(url)
    const subject_id = params.get('id')
    return subject_id
}

async function setEditPage() {
    const token = localStorage.getItem('token')
    const id = getSubjectID()
    const subject = await getSubjectByID(token,id)
    console.log(subject);
    subjectNameInput.value = subject.subject_name
    subjectSelectTeacher.value = subject.subject_teacher
    
}

await setEditPage()

// saveChangesButton.addEventListener('click', sendNewSubjectData)

// function sendNewSubjectData() {

// }

