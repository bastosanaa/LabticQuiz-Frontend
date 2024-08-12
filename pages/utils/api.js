import { getRoleByToken } from "../scripts/service.js"


const url = "http://localhost:3333/api"

async function AuthUser(role_access) {
    const token = localStorage.getItem('token')
    user_role = getRoleByToken(token)
    if (user_role === role_access) {
        return true
    }
    return
}

async function getAllTeachers(token) {
    const response = await fetch (`${url}/users/teachers`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        }
    })

    const teachers = await response.json()
    return teachers
}

