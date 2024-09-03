import { AnswersChart } from "../../../components/answersChart/answersChart.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { quizQuestion } from "../../../components/quizQuestion/quizQuestion.js"
import { getQuizByID } from "../../../scripts/service/quizService.js"

const token = localStorage.getItem('token')

async function setQuizPage() {

    const quiz_id = '66d1d681d29e8bf3c259bd22';
    const quiz_data = await (await getQuizByID(token,quiz_id)).json()    

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
        back_btn: true
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
        console.log(questionData);
        
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

await setQuizPage()