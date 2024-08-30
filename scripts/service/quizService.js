const url = "http://localhost:3333/api"

export async function createQuiz(token, title, subject_id, time, attempts, dateStart, dateEnd, instructions, type, questions, isDraft) {
    const response = await fetch(`${url}/quizzes`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({title:title,
            subject_id:subject_id,
            time:time,
            attempts:attempts,
            date_start:dateStart,
            date_end:dateEnd,
            instructions:instructions,
            type:type,
            questions:questions,
            is_draft: isDraft
        })
    })
    return response
}

export async function updateQuiz(token, new_quiz_info, id) {
    const response = await fetch(`${url}/quizzes/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(new_quiz_info)
    })
    return response
}

