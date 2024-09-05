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

export async function getQuizByID(token, quiz_id) {
    const response = await fetch(`${url}/quizzes/${quiz_id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    return response
}

//Answer
export async function createAnswer(token, quiz_id, question_answer ) {
    const response = await fetch(`${url}/answers`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            quiz_id:quiz_id,
            question_answer: question_answer
        })
    })
    return response
}
