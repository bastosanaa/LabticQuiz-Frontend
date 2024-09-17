import { AttemptsChart } from "../../../components/attemptsChart/attemptsChart.js"
import { Button } from "../../../components/button/button.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { QuizInfo } from "../../../components/quizInfo/quizInfo.js"
import { Dialog } from "../../../components/dialog/dialog.js"
import { getQuizByID, getStudentsAttemptsAtQuiz, getQuizAnswers, deleteQuiz } from "../../../scripts/service/quizService.js"
import { formatDate, getEntityID,formatTime} from "../../utils/api.js"
import { ContentList } from "../../../components/contentList/contentList.js"
import { getAllStudents } from "../../../scripts/service/userService.js"

const token = localStorage.getItem('token')
const quiz_id = getEntityID() 
const quiz = await (await getQuizByID(token, quiz_id)).json()

async function setQuizInfoPage() {
    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [{
            imgSrc: '/assets/menu.svg',
            title: 'Dashboard',
            selected: false,
            anchor: 'http://127.0.0.1:5501/pages/teacher/dashboard/dashboardStudent.html',
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
        back_btn_address: `http://127.0.0.1:5501/pages/teacher/quiz/quizzesPainel.html?id=${quiz.subject_id._id}`
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
        
    const students = await getQuizAnswers(token, quiz_id)
        
    const studentsList = ContentList({
        title_text: 'Alunos que responderam',
        content_items: students.map(student => {
            
            return {
                name: student.student_id.name,
                id: student._id,
                score: student.score,
            }
        }),
        href: 'http://127.0.0.1:5501/pages/teacher/quiz/quizStudentAnswers.html'
    })
    page.append(studentsList)

    const button = Button({
        type: 'destructive-outline',
        text: 'Eliminar Quiz',
        action: async () => {  
            const dialog =  Dialog({
                header: 'Tem certeza?',
                    description: 'Você irá eliminar o quiz "quiz", essa ação nao pode ser desfeita.',
                    buttons: [{
                        type: 'outline',
                        size: 'small',
                        text: 'Cancelar',
                        action: () => {
                            dialog.close()
                        }
                    },
                    {
                        type: 'destructive',
                        size:'small',
                        text: 'Eliminar',
                        action: async () => {
                            await deleteQuiz(token, quiz_id)
                            window.location.href = 'http://127.0.0.1:5501/pages/teacher/dashboard/dashboardTeacher.html'
                        }
                    }
                ]
            }
            )
            const body = document.querySelector('body')
            body.append(dialog)
            dialog.showModal()        
        }
    })
    page.position = 'relative'
    button.style.position = 'absolute'
    button.style.bottom = '3rem'
    button.style.right = '3rem'

    page.append(button)
}
setQuizInfoPage()