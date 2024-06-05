
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit")
const studentName = document.getElementById("user-name")

const url = "http://localhost:3333/api"

//User
async function getUserbyID(user_id) {
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
    console.log(users)
    return users
}

async function deleteUserByID(user_id) {
    const response = await fetch(`${url}/users/${user_id}`, {
        method: "delete",
        mode: "cors"
    })
    const deletedUser = await response.json()
    console.log(deletedUser)
    return deletedUser
}


//usersSubjects
async function getSubjectsbyStudent(student_id){
    const response = await fetch(`${url}/studentsSubjects/${student_id}`, {
        method: "GET",
        mode: "cors"
    })
    const subjects = await response.json()
    return subjects
    //printando apenas nome da disciplina
    // subjects.forEach(subject => console.log(subject.subject_name))
    // console.log(subjects)
}


//manipulando dashboard
async function setUserNameInGreetings(user_id) {
    user = await getUserbyID(user_id)
    user_name = user.name
    studentName.innerHTML = user_name
}

//desenvolvendo funcao de mostrar disciplinas no dashboard
async function setUserSubjects(user_id){
    subjects = await getSubjectsbyStudent(user_id)

    // <li id="section-content-item">
    //     <p id="section-content-item-title">Matemática Discreta</p>
    // </li>

}

setUserNameInGreetings("665df5064d2b25c3e619f353")