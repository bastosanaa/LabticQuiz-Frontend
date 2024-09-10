import { ContentList } from "../../../components/contentList/contentList.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { getQuizzesBySubject } from "../../../scripts/service/quizService.js"
import { getSubjectByID } from "../../../scripts/service/subjectService.js"
import { getEntityID } from "../../utils/api.js"

const token = localStorage.getItem('token')
const subject_id = getEntityID() 


async function setQuizzesPainelPage() {
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
        
    const subject_name = (await getSubjectByID(token, subject_id)).subject_name
    console.log(subject_name);
    

    const header = PageHeader({
        title_text: subject_name,
        back_btn: true,
        subtitle_text: 'Quizzes',
        back_btn_address: 'http://127.0.0.1:5501/pages/student/dashboard/dashboardStudent.html'
    })
    page.appendChild(header)

    //refatorar componente para receber mais informacoes
    const quizzes = await (await getQuizzesBySubject(token,subject_id )).json()
    
    const quizzesList = ContentList({
        title_text: ["Nome", "Entrega", "Tipo"],
        content_items: quizzes,
        href: 'http://127.0.0.1:5501/pages/student/quiz/quizInfoPage.html'
    })

    page.appendChild(quizzesList)
    
}

setQuizzesPainelPage()