import { NavBar } from "./../../../components/navBar/navBar.js";
import { PageHeader } from "./../../../components/pageHeader/pageHeader.js";
import { ContentList } from "./../../../components/contentList/contentList.js";

import { getUserIDbyToken, getUserByID } from "/../../../scripts/service/userService.js"
import { getAllSubjects } from "../../../scripts/service/subjectService.js";
import { parseSubjectToList } from "../../utils/api.js";
import { urlPage } from "../../../config/url-config.js";
import { hideLoader, showLoader } from "../../utils/loaderManipulation.js";

async function getUserName(token) {
    const user_id = (await getUserIDbyToken(token))._id
    const user = await getUserByID(token, user_id)
    
    const user_name = user.name
    return user_name    
}



async function setPage() {
    const token = localStorage.getItem('token')
    const user_name =  await getUserName(token)
    const subjects = await getAllSubjects(token)
    
    await setUserDashboard(user_name, subjects)

}

async function setUserDashboard(user_name, subjects) {
    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                selected: true,
                anchor: `${urlPage}/pages/teacher/dashboard/dashboardTeacher.html`,
            },
            {
                imgSrc: '/assets/books.svg',
                title: 'Disciplinas',
                selected: false,
                dropdownItems: parseSubjectToList(subjects,`${urlPage}/pages/teacher/quiz/quizzesPainel.html`)        
            },
            {
                imgSrc: '/assets/register.svg',
                title: 'Criar Quiz',
                anchor: `${urlPage}/pages/teacher/quiz/registerQuiz.html`
            }
        ]
    }
    


    )
    main.appendChild(navBar)
    
    const page = document.createElement('div')
    page.classList.add('page')
    
    const header = PageHeader({
        title_text: 'Dashboard',
        back_btn: false,
        subtitle_text: `Bem-vindo(a), ${user_name}`
    })

    const subjectList = ContentList({
        title_text: 'Disciplinas',
        content_items: parseSubjectToList(subjects, `${urlPage}/pages/teacher/quiz/quizzesPainel.html`)
    })
    
    page.append(header)
    page.append(subjectList)
    
    main.append(page)

}
async function loadPage() {
    showLoader()
    try {
        await setPage()
    } finally {
        hideLoader()
    }
}
await loadPage()