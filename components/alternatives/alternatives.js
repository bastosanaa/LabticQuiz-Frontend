export function Alternatives() {
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
    //mock
    correctTextArea.value = 'correta'

    correctTextArea.placeholder = 'Digite aqui a resposta correta...'
    alternative.appendChild(correctTextArea)

    for (let i = 1; i < 4; i++) {
        const wrongAlternative = document.createElement('div')
        wrongAlternative.classList.add('alternative-item')

        const wrongIcon = document.createElement('i')
        wrongIcon.classList.add('ph-fill', 'ph-x-circle', 'wrong-answer-icon')
        wrongAlternative.appendChild(wrongIcon)

        const wrongTextArea =  document.createElement('textarea')

        //mock
        wrongTextArea.value = `errada ${i}`

        wrongTextArea.classList.add('answer-textarea', 'wrong-container-color')
        wrongTextArea.placeholder = 'Digite aqui uma alternativa incorreta...'
        wrongTextArea.id = `wrong-alt${i}`
        wrongAlternative.appendChild(wrongTextArea)

        alternativesContainer.appendChild(wrongAlternative)

    }


    

    

    

    return alternativesContainer
}