import { NavBar } from "./components/navBar/navBar.js";
import { PageHeader } from "./components/pageHeader/pageHeader.js";
import { ContentList } from "./components/contentList/contentList.js";

import { getUserbyID } from "./scripts/service.js"
import  { getSubjectsbyStudent } from "./scripts/service.js"

async function getUserName(token) {
    const user = await getUserbyID(token)
    const user_name = user.name
    return user_name    
}


async function createUserDashboard(user_name, subjects) {
    const main = document.getElementById('main')
    
    const navBar = NavBar()
    main.appendChild(navBar)
    
    const page = document.createElement('div')
    page.classList.add('page')
    
    const header = PageHeader({
        title_text: 'Dashboard',
        back_btn: false,
        subtitle_text: `Bem-vindo(a), Administrador(a)`
    })

    const subjectList = ContentList({
        title_text: 'Opções',
        content_items: [
            //passar as acoes aqui
            {text: 'Alunos'},
            {text: 'Professores'},
            {text: 'Disciplinas'}
        ],
    })
    
    page.append(header)
    page.append(subjectList)
    
    main.append(page)
}

async function setPage() {
    const token = localStorage.getItem('token')
    const user_name =  await getUserName(token)
    const subjects = await getSubjectsbyStudent(token)
    await createUserDashboard(user_name, subjects)

}

await setPage()