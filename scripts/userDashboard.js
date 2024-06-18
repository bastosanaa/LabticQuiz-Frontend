import { getUserbyID } from "./service.js"
import  { getSubjectsbyStudent } from "./service.js"
import { getUserIDByToken } from "./service.js"

const studentName = document.getElementById("user-name")
const subjectsList = document.getElementById("section-content-list")
const sectionContent = document.querySelector(".section-subject-content")
const notFoundMessage = document.getElementById("no-data-found-wrapper")

// funcao pega user id pelo token
async function setUserID() {
    const token = localStorage.getItem('token')
    const user_id = await getUserIDByToken(token)
    await setUserDashboard(user_id, token)
    return user_id
}

export async function setUserDashboard(user_id, token) {
    await setUserNameInGreetings(user_id, token)
    console.log(token)
    await setUserSubjects(user_id, token)
}

async function setUserNameInGreetings(user_id, token) {
    console.log(user_id.user, 'AQUIII');
    const user = await getUserbyID(user_id, token)
    const user_name = user.name
    studentName.innerHTML = user_name
    console.log(user_name);
}

async function setUserSubjects(user_id, token){
    const subjects = await getSubjectsbyStudent(user_id, token)
    console.log(subjects);
    if (subjects.length > 0) {
        subjects.forEach(subject => {
            const li = document.createElement('li')
            li.classList.add('section-content-item')
        
            const subjectTitle = document.createElement('p')
            subjectTitle.classList.add('section-content-item-title')
            subjectTitle.textContent = subject.subject_name
    
            li.appendChild(subjectTitle)
            subjectsList.appendChild(li)
            sectionContent.classList.remove("hidden")
            notFoundMessage.classList.add("hidden")
        })
        return
    }
    sectionContent.classList.add("hidden")
    notFoundMessage.classList.remove("hidden")
}

setUserID()