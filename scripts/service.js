
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit")
const studentName = document.getElementById("user-name")
const subjectsList = document.getElementById("section-content-list")
const sectionContent = document.querySelector(".section-subject-content")
const notFoundMessage = document.getElementById("no-data-found-wrapper")

const url = "http://localhost:3333/api"

//User
export async function getUserbyID(token) {
    const response = await fetch(`${url}/users`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        },
    })
    const user = await response.json()
    return user
}

async function getAllUsers() {
    const response = await fetch(`${url}/users/`)
    const users = await response.json()
    return users
}

async function deleteUserByID(token) {
    const response = await fetch(`${url}/users
    `, {
        method: "delete",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        },

    })
    const deletedUser = await response.json()
    return deletedUser
}
// fazer para matricula tambem
export async function userLogin(user, password) {
    const response = await fetch(`${url}/auth/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: user, password: password})
    })
    console.log(response)
    return response
}

//usersSubjects
export async function getSubjectsbyStudent(token){
    const response = await fetch(`${url}/studentsSubjects`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        }
    })
    const subjects = await response.json()
    return subjects
}

export async function getRoleByToken(token) {
    const response = await fetch(`${url}/users/role`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        },
        body: JSON.stringify({token: token})
    })

    console.log("get role")
    const user = await response.json()
    console.log(user);
    const user_role = user.user_role

    return user_role
}

//Painel - subjects
export async function getAllSubjects(token) {
    const response = await fetch (`${url}/subjects/painel`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        }
    })

    const subjects = await response.json()
    return subjects
}