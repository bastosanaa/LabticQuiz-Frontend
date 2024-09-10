import { AttemptsChart } from "../../../components/attemptsChart/attemptsChart.js"
import { Button } from "../../../components/button/button.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { QuizInfo } from "../../../components/quizInfo/quizInfo.js"
import { Dialog } from "../../../components/dialog/dialog.js"
import { getQuizByID, getStudentsAttemptsAtQuiz } from "../../../scripts/service/quizService.js"
import { formatDate, getEntityID,formatTime} from "../../utils/api.js"
import { ContentList } from "../../../components/contentList/contentList.js"
import { getAllStudents } from "../../../scripts/service/userService.js"

const token = localStorage.getItem('token')
const quiz_id = getEntityID() 
const quiz = await (await getQuizByID(token, quiz_id)).json()

function setQuizInfoPage() {
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
    main.append(page)

    const pageHeader = PageHeader({
        title_text: quiz.title,
        subtitle_text: quiz.subject_id.name,
        subtitle_size:'small',
        back_btn: true,
        back_btn_address: `http://127.0.0.1:5501/pages/student/quiz/quizzesPainel.html?id=${quiz.subject_id._id}`
    })
    page.append(pageHeader)

    const quizInfoChart = QuizInfo({
        instructions: quiz.instructions,
        infos: [{
            topic: 'Tentativas',
            content: quiz.attempts
        },
        {
            topic: 'Tempo de realização',
            content: `${formatTime(quiz.time)} hr`
        },
        {
            topic: 'Data final de entrega',
            content: formatDate(quiz.date_end)
        },
        {
            topic: 'Tipo de Quiz',
            content: quiz.type
        }
    ]
    })
    page.append(quizInfoChart)    
    
    const studentsList = ContentList({
        title_text: 'Alunos que responderam',
        content_items: [],
        href: ''
    })
    page.append(studentsList)
}
setQuizInfoPage()