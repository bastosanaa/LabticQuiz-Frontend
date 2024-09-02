export function quizQuestion({question_number, description, alternatives}) {

    const questionContainer = document.createElement('div')
    questionContainer.classList.add('question-container')
    
    const question = document.createElement('div')
    question.classList.add('quiz-question')
    questionContainer.append(question)

    
    const questionNumber = document.createElement('p')
    questionNumber.textContent = `Pergunta ${question_number}`
    questionNumber.classList.add('question-number')
    question.append(questionNumber)
    
    const questionDescription = document.createElement('p')
    questionDescription.textContent = description
    question.append(questionDescription)

    const alternativesContainer = document.createElement('div')
    alternativesContainer.classList.add('alternatives-container')
    questionContainer.append(alternativesContainer)


    for (let i = 0; i < alternatives.length; i++) {
        const alternative = document.createElement('div')
        alternative.classList.add('alternative-item')
        alternativesContainer.append(alternative)
        
        let letter = String.fromCharCode(97 + i)

        const altLetter = document.createElement('div')
        altLetter.classList.add('alternative_letter')
        altLetter.textContent = letter
        alternative.append(altLetter)
    
        const altDescription = document.createElement('p')
        altDescription.textContent = alternatives[i].content        
        alternative.append(altDescription)
    }


    return questionContainer
}
