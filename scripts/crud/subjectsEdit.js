import { getSubjectByID } from "../service.js"
import { updateSubjectChanges } from "../service.js"
const subjectNameInput = document.getElementById('sub-name')
const subjectSelectTeacher = document.getElementById('teacher-select')
const saveChangesButton = document.getElementById('edit-form-submit-button')
const url = 'http://127.0.0.1:5501'

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
    subjectNameInput.value = subject.subject_name
    
    if (subject.subject_teacher !== null) {
        subjectSelectTeacher.value = subject.subject_teacher
        console.log('entrouuu')
    } else {
        console.log(subject.subject_teacher);
        subjectSelectTeacher.value = ''
        
        
    }
    
}

await setEditPage()

console.log(subjectSelectTeacher.value);
saveChangesButton.addEventListener('click', async () => {
    await sendNewSubjectData()
    window.location.href = `${url}/painelSubjects.html`
})

    

async function sendNewSubjectData() {
    const token = localStorage.getItem('token')
    const id = getSubjectID()
    const new_name = subjectNameInput.value
    const new_teacher = subjectSelectTeacher.value
    await updateSubjectChanges(token, id, new_name, new_teacher)
}

