import { NavBar } from "./../../../components/navBar/navBar.js";
import { PageHeader } from "./../../../components/pageHeader/pageHeader.js";
import { ContentList } from "./../../../components/contentList/contentList.js";
import { getUserIDbyToken } from "/../../../scripts/service/userService.js"
import { parseSubjectToList, getUserSubjects } from "../../utils/api.js";
import { getUserByID } from "../../../scripts/service/userService.js";
import { urlPage } from "../../../config/url-config.js"


const token = localStorage.getItem('token')
const subjects = await getUserSubjects(token)
const parsedSubjects = parseSubjectToList(subjects, `${urlPage}/pages/student/quiz/quizzesPainel.html`)

async function getUserName(token) {
    const user = await getUserIDbyToken(token)
    const user_data = await getUserByID(token, user._id)    
    const user_name = user_data.name
    return user_name    
}

async function setUserDashboard() {
    const user_name =  await getUserName(token)
    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [{
            imgSrc: '/assets/menu.svg',
            title: 'Dashboard',
            selected: true,
            anchor: `${urlPage}/pages/student/dashboard/dashboardStudent.html`,
        },
        {
            imgSrc: '/assets/books.svg',
                title: 'Painel',
                dropdownItems: parsedSubjects
        }
    ],
    })
    main.append(navBar)
    
    const page = document.createElement('div')
    page.classList.add('page')
    
    

    const header = PageHeader({
        title_text: 'Dashboard',
        back_btn: true,
        subtitle_text: `Bem-vindo(a), ${user_name}`,
        back_btn: false
    })
        

    const subjectList = ContentList({
        title_text: 'Disciplinas',
        content_items: parsedSubjects,
        
    })
    
    page.append(header)
    page.append(subjectList)
    main.append(page)

}

await setUserDashboard()