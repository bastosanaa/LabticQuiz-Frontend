const url = "http://localhost:3333/api"

export async function createSubject(token, name, teacher_id) {
    
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
    return response
}
export async function deleteSubject(token, subject_id) {
    
    const response = await fetch(`${url}/subjects`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({id: subject_id})
    })
    return response
}

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

//subjects - teacher crud 

export async function getSubjectsWithoutTeacher(token) {
    const response = await fetch (`${url}/subjects/teacher/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        }
    })

    const subjects = await response.json()
    return subjects
}

export async function setSubjectsTeacherToNull(token, teacher_id) {
    const response = await fetch (`${url}/subjects/teacher/`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({teacher_id: teacher_id})
    })

    const subjects = await response.json()
    return subjects

}

export async function getSubjectsByTeacher(token, teacher_id) {
    const response = await fetch (`${url}/subjects/teacher/${teacher_id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    const subjects = await response.json()
    return subjects

}

