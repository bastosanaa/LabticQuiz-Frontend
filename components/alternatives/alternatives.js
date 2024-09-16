export function Alternatives({altContent = null}) {    
    const alternativesContainer = document.createElement('div') 
    alternativesContainer.classList.add('alternatives-container')

    //correct alternative
    const alternative = document.createElement('div')
    alternativesContainer.appendChild(alternative)
    alternative.classList.add('alternative-item')

    const correctIcon = document.createElement('i')
    correctIcon.classList.add('ph-fill', 'ph-check-circle', 'correct-answer-icon')
    alternative.appendChild(correctIcon)

    const correctTextArea = document.createElement('textarea')
    correctTextArea.classList.add('answer-textarea', 'correct-container-color')
    correctTextArea.id = 'correct-alt'

    correctTextArea.placeholder = 'Digite aqui a resposta correta...'
    alternative.appendChild(correctTextArea)

    if (altContent) {
        const altCorrect = altContent.filter(alt => alt.correct)
        correctTextArea.value = altCorrect[0].content
    }
    // wrong alternatives
    for (let i = 1; i < 4; i++) {
        const wrongAlternative = document.createElement('div')
        wrongAlternative.classList.add('alternative-item')

        const wrongIcon = document.createElement('i')
        wrongIcon.classList.add('ph-fill', 'ph-x-circle', 'wrong-answer-icon')
        wrongAlternative.appendChild(wrongIcon)

        const wrongTextArea =  document.createElement('textarea')

        wrongTextArea.classList.add('answer-textarea', 'wrong-container-color')
        wrongTextArea.placeholder = 'Digite aqui uma alternativa incorreta...'
        wrongTextArea.id = `wrong-alt${i}`
        wrongAlternative.appendChild(wrongTextArea)
                
        if (altContent) {            
            const altsWrong = altContent.filter(alt => !alt.correct)
            wrongTextArea.value = altsWrong[i-1].content
        }
        alternativesContainer.appendChild(wrongAlternative)                

    }
    return alternativesContainer
}