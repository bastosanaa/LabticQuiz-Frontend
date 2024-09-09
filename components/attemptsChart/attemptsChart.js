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
        answersChart.append(attemptContainer)

        const attemptNumber = document.createElement('p')
        attemptContainer.append(attemptNumber)
        attemptNumber.textContent = `${count} Tentativa`

        const attemptScore = document.createElement('p')
        attemptContainer.append(attemptScore)

        const answersLink = document.createElement('a')
        attemptContainer.append(answersLink)
        answersLink.textContent = 'Gabarito'

        count++

    })

    return answerChartWrapper
}