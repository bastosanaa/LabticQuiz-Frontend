
const url = "http://localhost:3333/api"

//User
export async function createUser(token, name, registration, email,password, role) {
    
    const response = await fetch(`${url}/users`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({name: name, registration:registration, email:email, password:password, role:role})
    })
    return response
}


export async function getUserbyToken(token) {
    const response = await fetch(`${url}/users/token`, {
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

export async function getUserByID(token, id) {
    const response = await fetch(`${url}/users/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        }
    })
    const user = await response.json()
    return user
}

async function getAllUsers() {
    const response = await fetch(`${url}/users/`)
    const users = await response.json()
    return users
}

export async function deleteUserByID(token, user_id) {
    console.log(user_id);
    const response = await fetch(`${url}/users`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({id: user_id})

    })
    const deletedUser = await response.json()
    return deletedUser
}

export async function updateUserChanges(token,id, name,registration, email) {
    const response = await fetch(`${url}/users/${id}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        },
        body: JSON.stringify({name, registration, email})
    })
    console.log(response)
    return response
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

//Painel - Subjects
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

//create - Subjects and Painel - Teachers
export async function getAllTeachers(token) {
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

//Painel - students
export async function getAllStudents(token){
    const response = await fetch(`${url}/users/students`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        }
    })
    const students = await response.json()
    return students
}

export async function createSubject(token, name, teacher_id) {
    console.log('entrou no create');
    
    let newSubject = {}
    if (!teacher_id) {
        newSubject = {name: name}
    } else {
        newSubject = {name: name, teacher_id: teacher_id }
    }
    const response = await fetch(`${url}/subjects/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(newSubject)
    })
    return response
}

export async function deleteSubject(token, subject_id) {
    console.log(subject_id);
    
    const response = await fetch(`${url}/subjects`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({id: subject_id})
    })
    console.log(response)
    return response
}

export async function deleteStudentSubject(token, subject_id) {
    console.log("requisicao pro back")
    const response = await fetch(`${url}/studentsSubjects`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({id: subject_id})
    })
    console.log(response)
    return response
}

//edit - Subjects
export async function getSubjectByID(token, id){
    const response = await fetch(`${url}/subjects/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        }
    })
    const subject = await response.json()
    return subject
}

export async function updateSubjectChanges(token, id, new_name, new_teacher) {
    const response = await fetch(`${url}/subjects/${id}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        },
        body: JSON.stringify({name: new_name, teacher_id: new_teacher})
    })
    console.log(response)
    return response
}

//studentsSubjects

export async function registerStudentToSubjetc(token, user_id, subject_id) {
    const response = await fetch(`${url}/studentsSubjects/`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({user_id:user_id, subject_id:subject_id})
    })
    return response
}