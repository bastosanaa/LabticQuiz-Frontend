import { urlPage } from "../../config/url-config.js"
import { getEntityID } from "../../pages/utils/api.js"
import { createAnswer } from "../../scripts/service/quizService.js"
import { Button } from "../button/button.js"

export function AnswersChart({numAnswers, timer = null, button = true}) {

    const answerChartWrapper = document.createElement('div')
    answerChartWrapper.classList.add('chart-wrapper')

    const answersChart = document.createElement('div')
    answersChart.classList.add('chart')
    answerChartWrapper.appendChild(answersChart)
    
    const chartTitle = document.createElement('p')
    answersChart.appendChild(chartTitle)
    chartTitle.textContent = 'Respostas'

    const chartQuestionsContainer = document.createElement('div')
    chartQuestionsContainer.classList.add('chart-container')
    answersChart.appendChild(chartQuestionsContainer)

    for ( let i = 1; i < numAnswers+1; i++ ) {        
        const questionAnswerBox = document.createElement('div')
        questionAnswerBox.id = `chart-question-${i}`
        questionAnswerBox.classList.add('question-answer-box')
        chartQuestionsContainer.appendChild(questionAnswerBox)

        const p = document.createElement('p');
        p.classList.add('chart-question-number')
        p.textContent = `Pergunta ${i}`;
        questionAnswerBox.appendChild(p); 

        const letterSelected = document.createElement('p');
        letterSelected.classList.add('letter-selected');
        letterSelected.textContent = ''; 
        questionAnswerBox.appendChild(letterSelected);

    }
    if (button) {
        const button = Button({
            size: 'small',
            text: 'Entregar',
            action: () => {                
                sendUserQuizAnswers()
                window.location.href = `${urlPage}/pages/student/dashboard/dashboardStudent.html`
            }
    
        })
        answersChart.appendChild(button)
    }

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
                    sendUserQuizAnswers()
                    window.location.href = `${urlPage}/pages/student/dashboard/dashboardStudent.html`
                    
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

//send answers 

const token = localStorage.getItem('token')

function getQuizAnswers() {
    const questionsContainers = document.querySelectorAll('.question-container')
    let question_answer = []
    questionsContainers.forEach(question => {
        let questionId = question.id
        let selectedAlt = question.querySelector('.selected-alt')
        
        question_answer.push({
            question_id: questionId,
            alternative: selectedAlt ? selectedAlt.id : null
        })
    })
    
    return question_answer    
}

async function sendUserQuizAnswers() {
    const quiz_id = getEntityID()
    const question_answer = getQuizAnswers()
    await createAnswer(token, quiz_id, question_answer )
}