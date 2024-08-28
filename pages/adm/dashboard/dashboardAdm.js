import { NavBar } from "../../../components/navBar/navBar.js";
import { PageHeader } from "../../../components/pageHeader/pageHeader.js";
import { ContentList } from "../../../components/contentList/contentList.js";

import { getRoleByToken } from "../../../scripts/service/userService.js"

async function createUserDashboard() {
    const main = document.getElementById('main')
    
    const navBar = NavBar({items:
        [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                selected: true,
                anchor: 'http://127.0.0.1:5501/pages/adm/dashboard/dashboardAdm.html',
            },
            {
                imgSrc: '/assets/books.svg',
                title: 'Painel',
                dropdownItems: [
                    {text:'alunos', href:'http://127.0.0.1:5501/pages/adm/painel/student/painelStudent.html'},
                    {text:'professores', href:'http://127.0.0.1:5501/pages/adm/painel/teacher/painelTeacher.html'},
                    {text:'disciplinas', href:'http://127.0.0.1:5501/pages/adm/painel/subject/painelSubject.html'}
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
            {name: 'Alunos', href:'http://127.0.0.1:5501/pages/adm/painel/student/painelStudent.html'},
            {name: 'Professores', href:'http://127.0.0.1:5501/pages/adm/painel/teacher/painelTeacher.html'},
            {name: 'Disciplinas', href:'http://127.0.0.1:5501/pages/adm/painel/subject/painelSubject.html'}
        ],
    })
    
    page.append(header)
    page.append(subjectList)
    
    main.append(page)
}

async function setPage() {
    const token = localStorage.getItem('token')
    const user_role = await getRoleByToken(token)
    console.log(user_role);
    if (user_role === 'administrador') {
        await createUserDashboard()
    }
}

await setPage()