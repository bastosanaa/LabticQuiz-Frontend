import { ContentList } from "../../../components/contentList/contentList.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { getPostedQuizzesBySubject } from "../../../scripts/service/quizService.js"
import { getSubjectByID } from "../../../scripts/service/subjectService.js"
import { getEntityID, parseSubjectToList,getUserSubjects } from "../../utils/api.js"
import { urlPage } from "../../../config/url-config.js"
import { hideLoader, showLoader } from "../../utils/loaderManipulation.js"


const token = localStorage.getItem('token')
const subjects = await getUserSubjects(token)
const parsedSubjects = parseSubjectToList(subjects, `${urlPage}/pages/student/quiz/quizzesPainel.html`)
const subject_id = getEntityID()

async function setQuizzesPainelPage() {
    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [{
            imgSrc: '/assets/menu.svg',
            title: 'Dashboard',
            selected: false,
            anchor: `${urlPage}/pages/student/dashboard/dashboardStudent.html`
        },
        {
            imgSrc: '/assets/books.svg',
                title: 'Painel',
                dropdownItems: parsedSubjects,
                selected: true
        }
    ],
    })
    main.append(navBar)

    const page = document.createElement('div')
    page.classList.add('page')
    main.append(page)
        
    const subject_name = (await getSubjectByID(token, subject_id)).subject_name    

    const header = PageHeader({
        title_text: subject_name,
        back_btn: true,
        subtitle_text: 'Quizzes',
        back_btn_address: `${urlPage}/pages/student/dashboard/dashboardStudent.html`
    })
    page.appendChild(header)

    //refatorar componente para receber mais informacoes
    const quizzes = await (await getPostedQuizzesBySubject(token,subject_id )).json()
    
    const quizzesList = ContentList({
        title_text: ["Nome", "Entrega", "Tipo"],
        content_items: quizzes,
        href: `${urlPage}/pages/student/quiz/quizInfoPage.html`
    })

    page.appendChild(quizzesList)
    
}

async function loadPage() {
    showLoader()
    try {
        await setQuizzesPainelPage()
    } finally {
        hideLoader()
    }
}
await loadPage()

