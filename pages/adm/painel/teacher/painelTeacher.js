import { NavBar } from "../../../../components/navBar/navBar.js";
import { PageHeader } from "../../../../components/pageHeader/pageHeader.js";
import { Table } from "../../../../components/table/table.js";
import { Button } from "../../../../components/button/button.js";
import { Toast } from "../../../../components/toast/toast.js";
import { deleteUserByID, getAllTeachers } from "../../../../scripts/service/userService.js"
import { teacherTableParser } from "../teacher/teacherTableParser.js";
import { setSubjectsTeacherToNull } from "../../../../scripts/service/subjectService.js";
import { urlPage } from "../../../../config/url-config.js";

import { showLoader,hideLoader} from "../../../utils/loaderManipulation.js"

const token = localStorage.getItem('token')

async function createPainelTeacher() {
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
                    {text:'professores', href:`${urlPage}/pages/adm/painel/teacher/painelTeacher.html`, selected:true},
                    {text:'disciplinas', href:`${urlPage}/pages/adm/painel/subject/painelSubject.html`}
                ]

            }
        ]
    })

    body.append(navBar)

    const page = document.createElement('div')
    page.classList.add('page')

    const teachers = await getAllTeachers(token)    

    const pageHeader = document.createElement('div')
    pageHeader.classList.add('page-header')

    const header = PageHeader({
        title_text: 'Professores',
        back_btn: true,
        back_btn_address: `${urlPage}/pages/adm/dashboard/dashboardAdm.html`,
        subtitle_text:  `${teachers.length} professores cadastrados`
    })

    pageHeader.append(header)

    const button = Button({
        type: 'default',
        size: 'medium',
        text: 'Cadastrar',
        imgSrc: '/assets/register.svg',
        action: () => {
            window.location.href = `${urlPage}/pages/adm/painel/teacher/register/registerTeacher.html`
        }
    
    })

    pageHeader.append(button)

    page.append(pageHeader)

    const table = await Table({
        columns: ['Identificador', 'Nome', 'Disciplinas'],
        rows: teachers,
        parser: async (teacher) => await teacherTableParser(teacher),
        removeAction: async (token,id) => {
            const deleteduser = await deleteUserByID(token,id)
            await setSubjectsTeacherToNull(token, id)            
            const toast = Toast({
                message: 'Professor removido com sucesso',
                reloadPage:true
            })
            body.append(toast)
        },
        editPageHref: `${urlPage}/pages/adm/painel/teacher/edit/editTeacher.html`,
        removeWarning: 'Você irá eliminar o professor "entidade". Esta ação não pode ser desfeita'
    })

    page.append(table)

    body.append(page)
}


async function loadPage() {
    showLoader()
    try {
        await createPainelTeacher()
    } finally {
        hideLoader()
    }
}
await loadPage()