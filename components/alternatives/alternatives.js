export function Alternatives() {
    const alternativesContainer = document.createElement('div') 
    alternativesContainer.classList.add('alternatives-container')

    //correct alternative
    const alternative = document.createElement('div')
    alternative.classList.add('alternative-item')

    const correctIcon = document.createElement('i')
    correctIcon.classList.add('ph-fill', 'ph-check-circle', 'correct-answer-icon')
    alternative.appendChild(correctIcon)

    const correctTextArea = document.createElement('textarea')
    correctTextArea.classList.add('answer-textarea', 'correct-container-color')
    correctTextArea.placeholder = 'Digite aqui a resposta correta...'
    alternative.appendChild(correctTextArea)



    

    

    

    return alternativesContainer
}