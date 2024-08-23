const url = "http://localhost:3333/api"

export async function registerStudentToSubject(token, user_id, subject_id) {
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

export async function deleteStudentSubject(token,user_id, subject_id) {
    console.log("requisicao pro back")
    const response = await fetch(`${url}/studentsSubjects`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({user_id:user_id, subject_id:subject_id})
    })
    console.log(response)
    return response
}

//By Student

export async function getSubjectsbyStudent(token, user_id){
    const response = await fetch(`${url}/studentsSubjects/${user_id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        },
    })
    const subjects = await response.json()
    return subjects
}