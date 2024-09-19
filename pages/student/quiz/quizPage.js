import { AnswersChart } from "../../../components/answersChart/answersChart.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { quizQuestion } from "../../../components/quizQuestion/quizQuestion.js"
import { getQuizByID, getStudentsAttemptsAtQuiz } from "../../../scripts/service/quizService.js"
import { getEntityID } from "../../utils/api.js"

const token = localStorage.getItem('token')
const quiz_id = getEntityID()
const quiz_data = await (await getQuizByID(token,quiz_id)).json()    

async function setQuizPage() {


    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [{
            imgSrc: '/assets/menu.svg',
            title: 'Dashboard',
            selected: true,
            anchor: 'http://127.0.0.1:5501/dashboardAdm.html',
        }],
    })
    main.append(navBar)

    const page = document.createElement('div')
    page.classList.add('page')
    

    const pageHeader = PageHeader({
        title_text: quiz_data.title,
        subtitle_text: quiz_data.subject_id.name,
        subtitle_size: 'small',
    })
    
    page.append(pageHeader)
    
    const pageContent = document.createElement('div')
    pageContent.classList.add('page-content')
    page.appendChild(pageContent)
    
    const quizQuestionsData = quiz_data.questions
    const answersChart = AnswersChart({
        numAnswers: quizQuestionsData.length,
        timer: quiz_data.time
    })
    pageContent.append(answersChart)

    let questionNumber = 1
    quizQuestionsData.forEach(questionData => {

        const question = quizQuestion({
            question_number: questionNumber,
            description: questionData.title,
            alternatives: questionData.alternatives,
            question_id: questionData._id
        })
        questionNumber++
        pageContent.append(question)
    });
    main.append(page)

}
console.log(quiz_data);

const date_end = new Date(quiz_data.date_end)
const dateNow = new Date()
const studentAttempts = await (await getStudentsAttemptsAtQuiz(token, quiz_id)).json()
const attemptsRemaining =  quiz_data.attempts - studentAttempts.length

if (attemptsRemaining > 0 && date_end > dateNow) {
    await setQuizPage()
}

