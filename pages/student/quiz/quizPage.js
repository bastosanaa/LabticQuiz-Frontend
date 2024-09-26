import { AnswersChart } from "../../../components/answersChart/answersChart.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { quizQuestion } from "../../../components/quizQuestion/quizQuestion.js"
import { getQuizByID, getStudentsAttemptsAtQuiz } from "../../../scripts/service/quizService.js"
import { getEntityID } from "../../utils/api.js"
import { urlPage } from "../../../config/url-config.js"
import { showLoader, hideLoader} from "../../utils/loaderManipulation.js"


const token = localStorage.getItem('token')
const quiz_id = getEntityID()
const quiz_data = await (await getQuizByID(token,quiz_id)).json()    

async function setQuizPage() {


    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [{
            imgSrc: '/assets/menu.svg',
            title: 'Dashboard',
            anchor: `${urlPage}/dashboardAdm.html`,
        },
        {
            imgSrc: '/assets/books.svg',
            title: 'Painel',
            selected: true
        }
    ],
    })
    //disabling navigation
    const navBarTexts = navBar.querySelectorAll('p')
    navBarTexts.forEach(text => {
        text.style.display = 'none'
    });

    const navBarAnchors = navBar.querySelectorAll('a')
    navBarAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            alert('A navegação está desativada nesta página. Você deve entregar a atividade para continuar navegando');
        });
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
    const answersChart = await AnswersChart({
        numAnswers: quizQuestionsData.length,
        timer: quiz_data.time
    })
    pageContent.append(answersChart)
    main.append(page)

}
const date_end = new Date(quiz_data.date_end)
const dateNow = new Date()
const studentAttempts = await (await getStudentsAttemptsAtQuiz(token, quiz_id)).json()
const attemptsRemaining =  quiz_data.attempts - studentAttempts.length

if (attemptsRemaining > 0 && date_end > dateNow) {
    
    async function loadPage() {
        showLoader()
        try {
            await setQuizPage()
    
        } finally {
            hideLoader()
        }
    }
    await loadPage()
}

