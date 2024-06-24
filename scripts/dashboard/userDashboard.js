import { getUserbyID } from "../service.js"
import  { getSubjectsbyStudent } from "../service.js"
const studentName = document.getElementById("user-name")
const subjectsList = document.getElementById("section-content-list")
const sectionContent = document.querySelector(".section-subject-content")
const notFoundMessage = document.getElementById("no-data-found-wrapper")
const loader = document.querySelector(".section-content-loading")
const sectionContentWrapper = document.getElementById("section-content-wrapper")

function esperarUmSegundo() {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    });
}

export async function setUserDashboard() {
    const token = localStorage.getItem('token')
    await setUserNameInGreetings(token)
    await setUserSubjects(token)
    // await esperarUmSegundo()
    loader.classList.add('hidden')
    sectionContentWrapper.classList.remove('hidden')
}

async function setUserNameInGreetings(token) {
    const user = await getUserbyID(token)
    const user_name = user.name
    studentName.innerHTML = user.name
}

async function setUserSubjects(token){
    const subjects = await getSubjectsbyStudent(token)
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

setUserDashboard()