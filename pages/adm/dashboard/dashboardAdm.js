import { NavBar } from "../../../components/navBar/navBar.js";
import { PageHeader } from "../../../components/pageHeader/pageHeader.js";
import { ContentList } from "../../../components/contentList/contentList.js";

import { getRoleByToken } from "../../../scripts/service/userService.js"
import { urlPage } from "../../../config/url-config.js";
import { hideLoader, showLoader } from "../../utils/loaderManipulation.js";

async function createUserDashboard() {
    const main = document.getElementById('main')
    
    const navBar = NavBar({items:
        [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                selected: true,
                anchor: `${urlPage}/pages/adm/dashboard/dashboardAdm.html`,
            },
            {
                imgSrc: '/assets/books.svg',
                title: 'Painel',
                dropdownItems: [
                    {text:'alunos', href:`${urlPage}/pages/adm/painel/student/painelStudent.html`},
                    {text:'professores', href:`${urlPage}/pages/adm/painel/teacher/painelTeacher.html`},
                    {text:'disciplinas', href:`${urlPage}/pages/adm/painel/subject/painelSubject.html`}
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
            {name: 'Alunos', href:`${urlPage}/pages/adm/painel/student/painelStudent.html`},
            {name: 'Professores', href:`${urlPage}/pages/adm/painel/teacher/painelTeacher.html`},
            {name: 'Disciplinas', href:`${urlPage}/pages/adm/painel/subject/painelSubject.html`}
        ],
    })
    
    page.append(header)
    page.append(subjectList)
    
    main.append(page)
}

async function setPage() {
    const token = localStorage.getItem('token')
    const user_role = await getRoleByToken(token)
    if (user_role === 'administrador') {
        await createUserDashboard()
    }
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