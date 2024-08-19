import { NavBar } from "../../../../components/navBar/navBar.js";
import { PageHeader } from "../../../../components/pageHeader/pageHeader.js";
import { Table } from "../../../../components/table/table.js";
import { Button } from "../../../../components/button/button.js";
import { Toast } from "../../../../components/toast/toast.js";

import { deleteUserByID, getAllStudents } from "../../../../scripts/service.js"
import { studentTableParser } from "./studentTableParser.js";

const token = localStorage.getItem('token')

async function createPainelStudent() {
    const body = document.querySelector('body')

    const navBar = NavBar({items:
        [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                anchor: 'http://127.0.0.1:5501/pages/adm/dashboard/dashboardAdm.html',
            },
            {
                imgSrc: '/assets/books.svg',
                title: 'Painel',
                selected: true,
                dropdownItems: [
                    {text:'alunos', href:'http://127.0.0.1:5501/pages/adm/painel/student/painelStudent.html', selected:true},
                    {text:'professores', href:'http://127.0.0.1:5501/pages/adm/painel/teacher/painelTeacher.html'},
                    {text:'disciplinas', href:'http://127.0.0.1:5501/pages/adm/painel/subject/painelSubject.html'}
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
        back_btn_address: 'http://127.0.0.1:5501/pages/adm/dashboard/dashboardAdm.html',
        subtitle_text:  `${students.length} alunos cadastrados`
    })

    pageHeader.append(header)
    
    const button = Button({
        type: 'default',
        size: 'medium',
        text: 'Cadastrar',
        imgSrc: '/assets/register.svg',
        action: () => {
            window.location.href = 'http://127.0.0.1:5501/pages/adm/painel/student/register/registerStudent.html'
        }
    
    })

    pageHeader.append(button)
    
    page.append(pageHeader)
    
    const table = Table({
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
        editPageHref: 'http://127.0.0.1:5501/pages/adm/painel/student/edit/editStudent.html'

    })

    page.append(table)

    body.append(page)
}

await createPainelStudent()