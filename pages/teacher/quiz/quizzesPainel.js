import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { ContentList } from "../../../components/contentList/contentList.js"
import { createQuiz, getQuizzesBySubject } from "../../../scripts/service/quizService.js"
import { getAllSubjects } from "../../../scripts/service/subjectService.js"
import { getEntityID, parseSubjectToList } from "../../utils/api.js"
import { Button } from "../../../components/button/button.js"

const token = localStorage.getItem('token')
const subject = getEntityID()

const quizzes = await (await getQuizzesBySubject(token, subject)).json()
const postedQuizzes = quizzes.filter(quiz => !quiz.is_draft)
const draftQuizzes = quizzes.filter(quiz => quiz.is_draft)
const subjects = await getAllSubjects(token)


console.log(quizzes);


async function setQuizzesPainel() {
    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                selected: false,
                anchor: 'http://127.0.0.1:5501/pages/teacher/dashboard/dashboardTeacher.html',
            },
            {
                imgSrc: '/assets/books.svg',
                title: 'Disciplinas',
                selected: true,
                dropdownItems: parseSubjectToList(subjects,'http://127.0.0.1:5501/pages/teacher/quiz/quizzesPainel.html')        
            },
            {
                imgSrc: '/assets/register.svg',
                title: 'Criar Quiz',
                anchor: 'http://127.0.0.1:5501/pages/teacher/quiz/registerQuiz.html'
            }
        ]
    }
    )
    main.appendChild(navBar)

    const page = document.createElement('div')
    main.append(page)
    page.classList.add('page')
    
    const pageHeader = document.createElement('div')
    pageHeader.classList.add('page-header')
    page.appendChild(pageHeader)

    const header = PageHeader({
        title_text: 'Nome da matéria',
        subtitle_text: 'Quizzes',
        subtitle_size: 'small',
        back_btn: true,
        back_btn_address: 'http://127.0.0.1:5501/pages/teacher/dashboard/dashboardTeacher.html'
    })

    pageHeader.append(header)

    const button = Button({
        type: 'default',
        size: 'medium',
        text: 'Cadastrar',
        imgSrc: '/assets/register.svg',
        action: () => {
            window.location.href = `http://127.0.0.1:5501/pages/teacher/quiz/registerQuiz.html?id=${subject}`
        }
    })
    pageHeader.append(button)

    const quizzesLists = document.createElement('div')
    quizzesLists.style.display = 'flex'
    quizzesLists.style.width = '100%'
    page.append(quizzesLists)

    const draftList = ContentList({
        title_text: 'Rascunho',
        content_items: draftQuizzes,
        href: ''
    })
    draftList.style.width = '100%'
    quizzesLists.append(draftList)

    const postedList = ContentList({
        title_text: 'Postados',
        content_items: postedQuizzes.map(quiz => {
            return {
                title: quiz.title
            }
        }),
        href: ''
    })
    postedList.style.width = '100%'
    quizzesLists.append(postedList)
}

setQuizzesPainel()