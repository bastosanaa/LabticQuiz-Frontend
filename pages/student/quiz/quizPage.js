import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { quizQuestion } from "../../../components/quizQuestion/quizQuestion.js"

function setQuizPage() {
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
        title_text: 'Nome do quiz',
        subtitle_text: 'disciplina',
        subtitle_size: 'small',
        back_btn: true
    })

    const quiz = quizQuestion({
        question_number: 1,
        description: 'qual o numero?'
    })
    page.append(pageHeader)

    page.append(quiz)


    main.append(page)

}

setQuizPage()