export function quizQuestion({question_number, description, alternatives, question_id, isGabarito= false}) {

    const questionContainer = document.createElement('div')
    questionContainer.classList.add('question-container')
    questionContainer.id =  question_id
    
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
        alternative.id = alternatives[i]._id
        alternative.classList.add('alternative-item')
        alternativesContainer.append(alternative)
        
        let letter = String.fromCharCode(97 + i)
        alternative.setAttribute('letter', letter)

        const altLetter = document.createElement('div')
        altLetter.classList.add('alternative-letter')
        altLetter.textContent = letter
        alternative.append(altLetter)
    
        const altDescription = document.createElement('p')
        altDescription.textContent = alternatives[i].content        
        alternative.append(altDescription)

        if (!isGabarito){
            console.log('nao é gabs');
            
            alternative.addEventListener('click', () => {
                
                //Select alternative and show it in the alternatives selecteds chart
                const allQuestionAlts = questionContainer.querySelectorAll('.alternative-item')
                allQuestionAlts.forEach(alt => {
                    if (alt.classList.contains('selected-alt')) {
                        alt.classList.remove('selected-alt')
                        return
                    }
                    
                    
                })
                alternative.classList.add('selected-alt')
                let alternativeSelectedLetter = alternative.getAttribute('letter')
                
                
                let chartQuestionID = `#chart-question-${question_number}`
                const chartQuestion = document.querySelector(chartQuestionID)
    
                let QuestionLetterSelected = chartQuestion.querySelector('.letter-selected')
                QuestionLetterSelected.textContent = alternativeSelectedLetter.toUpperCase()
                
            })
        }
    }




    return questionContainer
}


function getUserQuizAnswers(){
    
}