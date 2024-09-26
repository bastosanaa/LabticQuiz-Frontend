import { NavBar } from "../../../../components/navBar/navBar.js";
import { PageHeader } from "../../../../components/pageHeader/pageHeader.js";
import { Table } from "../../../../components/table/table.js";
import { Button } from "../../../../components/button/button.js";
import { Toast } from "../../../../components/toast/toast.js";
import { urlPage } from "../../../../config/url-config.js"
import { deleteSubject, getAllSubjects } from "../../../../scripts/service/subjectService.js"
import { subjectTableParser } from "./subjectTableParser.js";
import { showLoader,hideLoader} from "../../../utils/loaderManipulation.js"

const token = localStorage.getItem('token')

async function createPainelSubject() {
    const body = document.querySelector('body')

    const navBar = NavBar({items:
        [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                anchor: `${urlPage}/pages/adm/dashboard/dashboardAdm.html`,
            },
            {
                imgSrc: '/assets/books.svg',
                title: 'Painel',
                selected: true,
                dropdownItems: [
                    {text:'alunos', href:`${urlPage}/pages/adm/painel/student/painelStudent.html`},
                    {text:'professores', href:`${urlPage}/pages/adm/painel/teacher/painelTeacher.html`},
                    {text:'disciplinas', href:`${urlPage}/pages/adm/painel/subject/painelSubject.html`, selected: true}
                ]

            }
        ]
    })

    body.append(navBar)

    const page = document.createElement('div')
    page.classList.add('page')

    const subjects = await getAllSubjects(token)

    const pageHeader = document.createElement('div')
    pageHeader.classList.add('page-header')

    const header = PageHeader({
        title_text: 'Disciplinas',
        back_btn: true,
        back_btn_address: `${urlPage}/pages/adm/dashboard/dashboardAdm.html`,
        subtitle_text: `${subjects.length} disciplinas cadastradas`
    })

    pageHeader.append(header)
    
    const button = Button({
        type: 'default',
        size: 'medium',
        text: 'Cadastrar',
        imgSrc: '/assets/register.svg',
        action: () => {
            window.location.href = `${urlPage}/pages/adm/painel/subject/register/registerSubjetc.html`
        }

    })

    pageHeader.append(button)

    page.append(pageHeader)


    const table = await Table({
        columns: ['Nome', 'Professor', 'Quiz'],
        rows: subjects,
        parser: subjectTableParser,
        removeAction: async (token,id) => {
            await deleteSubject(token,id)
            const toast = Toast({
                message: 'Disciplina removida com sucesso',
                reloadPage: true
            })
            body.append(toast)
        },
        editPageHref: `${urlPage}/pages/adm/painel/subject/edit/editSubject.html`,
        removeWarning: 'Você irá eliminar a disciplina "entidade". Esta ação não pode ser desfeita'
    })
    
    page.append(table)

    body.append(page)
}


async function loadPage() {
    showLoader()
    try {
        await createPainelSubject()
    } finally {
        hideLoader()
    }
}
await loadPage()




