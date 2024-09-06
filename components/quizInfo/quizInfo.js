export function QuizInfo({instructions, infos}) {

    const quizInfo = document.createElement('div')
    quizInfo.classList.add('quiz-info-chart')

    const instructionsContainer = document.createElement('div')
    quizInfo.append(instructionsContainer)

    const instructionsHeader = document.createElement('h1')
    instructionsContainer.append(instructionsHeader)
    instructionsHeader.textContent = 'Orientações do professor'

    const instructionsP = document.createElement('p')
    instructionsContainer.append(instructionsP)
    instructionsP.textContent = instructions

    const ul = document.createElement('ul')
    quizInfo.append(ul)
    
    infos.forEach(info => {
        const li = document.createElement('li')
        li.innerHTML = `<p>${info.topic}: <span>${info.content}</span></p>`
        ul.append(li)
    })

    return quizInfo
}

// info format = [
//     {
//         topic: "topic",
//         content: "content"
//     }
// ]