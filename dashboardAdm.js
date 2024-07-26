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
    
    const navBar = NavBar({items:
        [
            {
                imgSrc: '../assets/menu.svg',
                title: 'Dashboard',
                selected: true,
                anchor: 'http://127.0.0.1:5501/dashboardAdm.html',
            },
            {
                imgSrc: '../assets/books.svg',
                title: 'Painel',
                dropdownItems: [
                    {text:'alunos', href:''},
                    {text:'professores', href:''},
                    {text:'disciplinas', href:'http://127.0.0.1:5501/painelSubjects.html'}
                ]

            }
        ]
    })
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
            {text: 'Alunos', href:'http://127.0.0.1:5501/painelSubjects.html'},
            {text: 'Professores', href:'http://127.0.0.1:5501/painelSubjects.html'},
            {text: 'Disciplinas', href:'http://127.0.0.1:5501/painelSubjects.html'}
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