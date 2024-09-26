import { AttemptsChart } from "../../../components/attemptsChart/attemptsChart.js"
import { Button } from "../../../components/button/button.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { QuizInfo } from "../../../components/quizInfo/quizInfo.js"
import { Dialog } from "../../../components/dialog/dialog.js"
import { getQuizByID, getStudentsAttemptsAtQuiz } from "../../../scripts/service/quizService.js"
import { formatDate, getEntityID, formatTime, parseSubjectToList, getUserSubjects } from "../../utils/api.js"
import { urlPage } from "../../../config/url-config.js"
import { hideLoader, showLoader } from "../../utils/loaderManipulation.js"


const token = localStorage.getItem('token')
const quiz_id = getEntityID() 
const quiz = await (await getQuizByID(token, quiz_id)).json()
const studentAttempts = await (await getStudentsAttemptsAtQuiz(token, quiz_id)).json()

const subjects = await getUserSubjects(token)
const parsedSubjects = parseSubjectToList(subjects, `${urlPage}/pages/student/quiz/quizzesPainel.html`)

const attemptsRemaining =  quiz.attempts - studentAttempts.length




async function setQuizInfoPage() {
    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [{
            imgSrc: '/assets/menu.svg',
            title: 'Dashboard',
            selected: false,
            anchor: `${urlPage}/pages/student/dashboard/dashboardStudent.html`,
        },
        {
            imgSrc: '/assets/books.svg',
                title: 'Painel',
                dropdownItems: parsedSubjects,
                selected: true
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
        back_btn_address: `${urlPage}/pages/student/quiz/quizzesPainel.html?id=${quiz.subject_id._id}`
    })
    page.append(pageHeader)

    
    const quizInfoChart = QuizInfo({
        instructions: quiz.instructions,
        infos: [{
            topic: 'Tentativas',
            content: attemptsRemaining
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
    const date_end = new Date(quiz.date_end)
    const dateNow = new Date()    
        
    if (attemptsRemaining > 0 && date_end > dateNow) {
        const startButton =  Button({
            text: 'Começar',
            size: 'small',
            action: () => {
                const dialog = Dialog({
                    header: 'Deseja começar agora?',
                    description: 'Ao clicar no botão o quiz começará imediatamente e deve ser entregue para poder sair',
                    buttons: [{
                        type: 'outline',
                        size: 'small',
                        text: 'Cancelar',
                        action: () => {
                            dialog.close()
                        }
                    },
                    {
                        type: 'default',
                        size:'small',
                        text: 'Começar',
                        action: () => {
                            window.location.href = `${urlPage}/pages/student/quiz/quizPage.html?id=${quiz_id}`
                        }
                    }
                ]
            })
            const body = document.querySelector('body')
            body.append(dialog)
            dialog.showModal()
        }
    })
    startButton.style.marginLeft = '45px'
    page.append(startButton)
    }
    
    const chart = AttemptsChart({
        attempts: studentAttempts
        
    })
    page.append(chart)

    
}

async function loadPage() {
    showLoader()
    try {
        await setQuizInfoPage()

    } finally {
        hideLoader()
    }
}
await loadPage()

