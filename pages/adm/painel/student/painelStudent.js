import { NavBar } from "../../../../components/navBar/navBar.js";
import { PageHeader } from "../../../../components/pageHeader/pageHeader.js";
import { Table } from "../../../../components/table/table.js";
import { Button } from "../../../../components/button/button.js";
import { Toast } from "../../../../components/toast/toast.js";
import { deleteUserByID, getAllStudents } from "../../../../scripts/service/userService.js"
import { studentTableParser } from "./studentTableParser.js";
import { urlPage } from "../../../../config/url-config.js"


const token = localStorage.getItem('token')

async function createPainelStudent() {
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
                    {text:'alunos', href:`${urlPage}/pages/adm/painel/student/painelStudent.html`, selected:true},
                    {text:'professores', href:`${urlPage}/pages/adm/painel/teacher/painelTeacher.html`},
                    {text:'disciplinas', href:`${urlPage}/pages/adm/painel/subject/painelSubject.html`}
                ]

            }
        ]
    })

    body.append(navBar)

    const page = document.createElement('div')
    page.classList.add('page')

    const students = await getAllStudents(token)

    const pageHeader = document.createElement('div')
    pageHeader.classList.add('page-header')

    const header = PageHeader({
        title_text: 'Alunos',
        back_btn: true,
        back_btn_address: `${urlPage}/pages/adm/dashboard/dashboardAdm.html`,
        subtitle_text:  `${students.length} alunos cadastrados`
    })

    pageHeader.append(header)
    
    const button = Button({
        type: 'default',
        size: 'medium',
        text: 'Cadastrar',
        imgSrc: '/assets/register.svg',
        action: () => {
            window.location.href = `${urlPage}/pages/adm/painel/student/register/registerStudent.html`
        }
    
    })

    pageHeader.append(button)
    
    page.append(pageHeader)
    
    const table = await Table({
        columns: ['Matrícula', 'Nome', 'Disciplinas'],
        rows: students,
        parser: studentTableParser,
        removeAction: async (token,id) => {
            await deleteUserByID(token,id)
            const toast = Toast({
                message: 'Aluno desmatriculado com sucesso',
                reloadPage: true
            })
            body.append(toast)
        },
        editPageHref: `${urlPage}/pages/adm/painel/student/edit/editStudent.html`,
        removeWarning: 'Você irá eliminar o aluno "entidade". Esta ação não pode ser desfeita'

    })

    page.append(table)

    body.append(page)
}

await createPainelStudent()