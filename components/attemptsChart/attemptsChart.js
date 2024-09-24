import { urlPage } from "../../config/url-config.js"

export function AttemptsChart({attempts}) {

    const answerChartWrapper = document.createElement('div')
    answerChartWrapper.classList.add('chart-wrapper')

    const answersChart = document.createElement('div')
    answersChart.classList.add('chart')
    answerChartWrapper.appendChild(answersChart)

    const title = document.createElement('p')
    answersChart.appendChild(title)
    title.textContent = 'Suas tentativas'

    let count = 1
    attempts.forEach(attempt => {                
        const attemptContainer = document.createElement('div')
        attemptContainer.classList.add('attempt-chart-line')
        attemptContainer.style.display = 'flex'
        attemptContainer.style.gap = '1rem'
        answersChart.append(attemptContainer)

        const attemptNumber = document.createElement('p')
        attemptContainer.append(attemptNumber)
        attemptNumber.textContent = `${count}°Tentativa`

        const attemptScore = document.createElement('p')
        attemptScore.style.fontWeight = 600
        attemptScore.textContent = `${attempt.score}/10`
        attemptContainer.append(attemptScore)

        const answersLink = document.createElement('a')
        attemptContainer.append(answersLink)
        answersLink.textContent = 'Gabarito'
        answersLink.href = `${urlPage}/pages/student/quiz/quizResults.html?id=${attempt._id}`

        count++

    })

    return answerChartWrapper
}