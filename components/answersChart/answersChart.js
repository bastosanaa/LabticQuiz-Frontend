import { Button } from "../button/button.js"

export function AnswersChart({numAnswers}) {

    
    const answersChart = document.createElement('div')
    answersChart.classList.add('answers-chart')
    
    const chartTitle = document.createElement('p')
    answersChart.appendChild(chartTitle)
    chartTitle.textContent = 'Respostas'

    const chartQuestionsContainer = document.createElement('div')
    chartQuestionsContainer.classList.add('chart-questions-container')
    answersChart.appendChild(chartQuestionsContainer)

    for ( let i = 1; i < numAnswers+1; i++ ) {
        console.log(i);
        
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

    return answersChart
}