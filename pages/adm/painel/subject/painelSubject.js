import { NavBar } from "../../../../components/navBar/navBar.js";
import { PageHeader } from "../../../../components/pageHeader/pageHeader.js";
import { Table } from "../../../../components/table/table.js";
import { Button } from "../../../../components/button/button.js";
import { Toast } from "../../../../components/toast/toast.js";

import { deleteSubject, getAllSubjects, getUserbyID } from "../../../../scripts/service.js"
import { subjectTableParser } from "./subjectTableParser.js";

const token = localStorage.getItem('token')

async function createPainelSubject() {
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
                    {text:'alunos', href:'http://127.0.0.1:5501/pages/adm/painel/student/painelStudent.html'},
                    {text:'professores', href:'http://127.0.0.1:5501/pages/adm/painel/teacher/painelTeacher.html'},
                    {text:'disciplinas', href:'http://127.0.0.1:5501/pages/adm/painel/subject/painelSubject.html', selected: true}
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
        back_btn_address: 'http://127.0.0.1:5501/pages/adm/dashboard/dashboardAdm.html',
        subtitle_text: `${subjects.length} disciplinas cadastradas`
    })

    pageHeader.append(header)
    
    const button = Button({
        type: 'default',
        size: 'medium',
        text: 'Cadastrar',
        imgSrc: '/assets/register.svg',
        action: () => {
            window.location.href = 'http://127.0.0.1:5501/pages/adm/painel/subject/register/registerSubjetc.html'
        }

    })

    pageHeader.append(button)

    page.append(pageHeader)


    const table = Table({
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
        }
    })
    
    page.append(table)

    body.append(page)
}

await createPainelSubject()




