export function quizQuestion({question_number, description}) {

    const questionContainer = document.createElement('div')
    
    const question = document.createElement('div')
    questionContainer.append(question)
    
    const questionNumber = document.createElement('p')
    questionNumber.textContent = `Pergunta ${question_number}`
    question.append(questionNumber)

    const questionDescription = document.createElement('p')
    questionDescription.textContent = description
    question.append(questionDescription)

    const altLetter = document.createElement('i')
    altLetter.classList.add('ph', 'ph-letter-circle-v', 'alternative_letter')

    questionContainer.append(altLetter)
    return questionContainer
}
