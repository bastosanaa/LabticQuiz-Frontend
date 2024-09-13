import { AnswersChart } from "../../../components/answersChart/answersChart.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { quizQuestion } from "../../../components/quizQuestion/quizQuestion.js"
import { getAttempt, getQuizAnswers, getQuizByID,getAnswerKey } from "../../../scripts/service/quizService.js"
import { getSubjectByID } from "../../../scripts/service/subjectService.js"
import { getEntityID } from "../../utils/api.js"

const token = localStorage.getItem('token')

async function setQuizResultsPage() {

    const attempt_id = getEntityID()
    const attempt_data = await getAttempt(token,attempt_id)
    const quiz_id = attempt_data.quiz_id._id
    const quiz = await (await getQuizByID(token, quiz_id)).json()
    const answer_key = await getAnswerKey(token, quiz_id)
    console.log(answer_key);    

    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [{
            imgSrc: '/assets/menu.svg',
            title: 'Dashboard',
            selected: false,
            anchor: 'http://127.0.0.1:5501/pages/student/dashboard/dashboardStudent.html',
        }],
    })
    main.append(navBar)

    const page = document.createElement('div')
    page.classList.add('page')
    

    const pageHeader = PageHeader({
        back_btn: true,
        back_btn_address: `http://127.0.0.1:5501/pages/student/quiz/quizInfoPage.html?id=${quiz_id}`,
        title_text: quiz.title,
        subtitle_text:quiz.subject_id.name,
        subtitle_size: 'small',
    })
    
    page.append(pageHeader)
    
    const pageContent = document.createElement('div')
    pageContent.classList.add('page-content')
    page.appendChild(pageContent)
    
    const quizQuestionsData = quiz.questions
    const answersChart = AnswersChart({
        numAnswers: quizQuestionsData.length,
        button: false
    })
    pageContent.append(answersChart)

    let questionNumber = 1
    quizQuestionsData.forEach(questionData => {

        const question = quizQuestion({
            question_number: questionNumber,
            description: questionData.title,
            alternatives: questionData.alternatives,
            question_id: questionData._id,
            isGabarito: true
        })
        questionNumber++
        pageContent.append(question)
    });
    main.append(page)

    let counter = 1
    attempt_data.question_answer.forEach(question => {
        
        let question_id = question.question_id;
        const questionFounded = answer_key.filter(answer => answer.id === question_id)
        
        const altSelectedId = question.alternative;
        const correctAltID = questionFounded[0].answer_id;
        
        let chartAnswer = document.getElementById(`chart-question-${counter}`)
        console.log(chartAnswer);
        
            //selecionar a box no chart container baseado no numero e colocar a letrinha la dentro
        let answerLetter = chartAnswer.querySelector('.letter-selected')
        if (altSelectedId === correctAltID){
            //scored
            let alternativeSelected = document.getElementById(altSelectedId)
            alternativeSelected.classList.add('answer-right')
            let altLetter = alternativeSelected.querySelector('.alternative-letter')
            answerLetter.textContent = altLetter.textContent.toUpperCase();
            answerLetter.style.color = '#059669'

        } else {
            let alternativeSelected = document.getElementById(altSelectedId)
            alternativeSelected.classList.add('answer-wrong')
            let alternativeCorrect = document.getElementById(correctAltID)
            alternativeCorrect.classList.add('answer-right')

            let altLetter = alternativeSelected.querySelector('.alternative-letter')
            answerLetter.textContent = altLetter.textContent.toUpperCase();
            answerLetter.style.color = '#EF4444'
        }
        counter++
    })


}

await setQuizResultsPage()