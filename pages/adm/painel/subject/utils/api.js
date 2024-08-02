const url = "http://localhost:3333/api"
s
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

