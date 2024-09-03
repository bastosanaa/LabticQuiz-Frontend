import { Button } from "../button/button.js"

export function AnswersChart({numAnswers, timer = null}) {

    const answerChartWrapper = document.createElement('div')
    answerChartWrapper.classList.add('answer-chart-wrapper')

    const answersChart = document.createElement('div')
    answersChart.classList.add('answers-chart')
    answerChartWrapper.appendChild(answersChart)
    
    const chartTitle = document.createElement('p')
    answersChart.appendChild(chartTitle)
    chartTitle.textContent = 'Respostas'

    const chartQuestionsContainer = document.createElement('div')
    chartQuestionsContainer.classList.add('chart-questions-container')
    answersChart.appendChild(chartQuestionsContainer)

    for ( let i = 1; i < numAnswers+1; i++ ) {        
        const questionAnswerBox = document.createElement('div')
        questionAnswerBox.classList.add('question-answer-box')
        chartQuestionsContainer.appendChild(questionAnswerBox)

        const p = document.createElement('p');
        p.classList.add('chart-question-number')
        p.textContent = `Pergunta ${i}`;
        questionAnswerBox.appendChild(p); 

        const letterSelected = document.createElement('p');
        letterSelected.classList.add('letter-selected');
        letterSelected.textContent = 'X'; 
        questionAnswerBox.appendChild(letterSelected);

    }

    const button = Button({
        size: 'small',
        text: 'Entregar'
    })
    answersChart.appendChild(button)

    if (timer) {
        const timerBox = document.createElement('div')
        timerBox.classList.add('timer-box')
        answerChartWrapper.appendChild(timerBox)

        function startClock(minutes) {
            let time = minutes * 60;
    
            function updateClock() {
                const hoursLeft = Math.floor(time / 3600);
                const minutesLeft = Math.floor((time % 3600) / 60);
                const secondsLeft = time % 60;
    
                const formattedTime = 
                    String(hoursLeft).padStart(2, '0') + ':' + 
                    String(minutesLeft).padStart(2, '0') + ':' + 
                    String(secondsLeft).padStart(2, '0');
                
                timerBox.textContent = formattedTime;
                document.title = `Quiz - ${formattedTime}` 
    
                if (time <= 0) {
                    clearInterval(timerInterval);
                    alert("O tempo acabou!");
                } else {
                    time--;
                }
            }

            updateClock();
            const timerInterval = setInterval(updateClock, 1000);
        }
        startClock(timer)

        


    }

    

    return answerChartWrapper
}