const url = "http://localhost:3333/api"


//User - Login
export async function userLogin(user, password) {
    const response = await fetch(`${url}/auth/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: user, password: password})
    })
    return response
}

//User - Crud
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

export async function deleteUserByID(token, user_id) {
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
    return response
}

export async function getUserIDbyToken(token) {
    const response = await fetch(`${url}/users/token`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        },

    })
    const user_id = await response.json()
    return user_id
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


export async function getRoleByToken(token) {
    const response = await fetch(`${url}/users/role`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            
        },
        body: JSON.stringify({token: token})
    })
    
    const user = await response.json()
    const user_role = user.user_role
    
    return user_role
}

//User - Teacher
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


//User - Student 
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