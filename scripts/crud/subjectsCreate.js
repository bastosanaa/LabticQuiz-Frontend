import { createSubject } from "../service.js"
const selectTeacher = document.getElementById('teacher-select')
const inputName = document.getElementById('sub-name')
const submitCreateFormBtn = document.getElementById('create-form-submit-button')
const url = 'http://127.0.0.1:5501'


submitCreateFormBtn.addEventListener('click', async () => {
    await postNewSubject()
    window.location.href = `${url}/painelSubjects.html`
})

async function postNewSubject() {
    const token = localStorage.getItem('token')

    const subjectName = inputName.value
    const selectedTeacher = selectTeacher.value

    
    await createSubject(token, subjectName, selectedTeacher)
    console.log(subjectName)
    console.log(selectedTeacher);
}

