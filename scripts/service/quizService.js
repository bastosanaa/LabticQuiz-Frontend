const url = "http://localhost:3333/api"

export async function createQuiz(token, title, subject_id, time, attempts, dateStart, dateEnd, instructions, type) {
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
            dateStart:dateStart,
            dateEnd:dateEnd,
            instructions:instructions,
            type:type})
    })
    return response
}