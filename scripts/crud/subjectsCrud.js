import { getAllTeachers } from "../service.js"
const backBtn = document.getElementById("back-icon")
const teachersSelect = document.getElementById('teacher-select')
const inputName = document.getElementById('sub-name')


backBtn.addEventListener('click', () => {
    window.location.href = "http://127.0.0.1:5500/painelSubjects.html"
})

// inputName.addEventListener('blur', checkIfEmpty(inputName))

// function checkIfEmpty(field) {
//     const errorMessage = document.querySelector('#error-msg')
//         if (field.value == "") {
//             field.style.border = "1px solid red"
//             errorMessage.classList.remove('hidden')
//         } else {
            
//             field.style.border = ""
//             errorMessage.classList.add('hidden')
//         }
// }

async function setTeachersOnSelect() {
    const token = localStorage.getItem('token')
    const teachers = await getAllTeachers(token)
    teachers.forEach(teacher => setOption(teacher))
    

} 

setTeachersOnSelect()
//options select

function setOption(teacher) {
    

    const option = document.createElement('option')
    console.log(teacher);
    option.textContent = teacher.name
    option.value = teacher._id
    
    teachersSelect.appendChild(option)
}
