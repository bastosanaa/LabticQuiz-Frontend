
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit")
const studentName = document.getElementById("user-name")
const subjectsList = document.getElementById("section-content-list")
const sectionContent = document.querySelector(".section-subject-content")
const notFoundMessage = document.getElementById("no-data-found-wrapper")

const url = "http://localhost:3333/api"

//User
export async function getUserbyID(user_id) {
    const response = await fetch(`${url}/users/${user_id}`, {
        method: "GET",
        mode: "cors"
    })
    const user = await response.json()
    return user
}

async function getAllUsers() {
    const response = await fetch(`${url}/users/`)
    const users = await response.json()
    return users
}

async function deleteUserByID(user_id) {
    const response = await fetch(`${url}/users/${user_id}`, {
        method: "delete",
        mode: "cors"
    })
    const deletedUser = await response.json()
    return deletedUser
}
// fazer para matricula tambem
export async function userLogin(user, password) {
    const response = await fetch(`${url}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: user, password: password})
    })
    return response
}

//usersSubjects
export async function getSubjectsbyStudent(student_id){
    const response = await fetch(`${url}/studentsSubjects/${student_id}`, {
        method: "GET",
        mode: "cors"
    })
    const subjects = await response.json()
    console.log(subjects);
    return subjects
}


//Dashboard
async function setUserNameInGreetings(user_id) {
    const user = await getUserbyID(user_id)
    console.log(user);
    const user_name = user.name
    studentName.innerHTML = user_name
}

async function setUserSubjects(user_id){
    subjects = await getSubjectsbyStudent(user_id)
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

// setUserNameInGreetings("6667424463bed68e02b71dba")
// // getSubjectsbyStudent("6667424463bed68e02b71dba")
// // setUserSubjects("6667424463bed68e02b71dba")