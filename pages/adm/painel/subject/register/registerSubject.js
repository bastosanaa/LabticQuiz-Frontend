import { NavBar } from "../../../../../components/navBar/navBar.js";
import { PageHeader } from "../../../../../components/pageHeader/pageHeader.js";
import { Input } from "../../../../../components/input/input.js"
import { Select } from "../../../../../components/select/select.js";

import { createSubject,getAllTeachers, getRoleByToken, getUserbyID } from "../../../../../scripts/service.js"
import { Button } from "../../../../../components/button/button.js";
import { setTeachersSelect } from "../../../../../scripts/utils/setTeachersSelect.js";

// import { getAllTeachers } from "../../scripts/service.js"
// import { createSubject } from "../../scripts/service.js"

const url = 'http://127.0.0.1:5501'



async function registerSubject() {
    const main = document.getElementById('main')
    
    const navBar = NavBar({items:
        [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                anchor: 'http://127.0.0.1:5501/dashboardAdm.html',
            },
            {
                imgSrc: '/assets/books.svg',
                title: 'Painel',
                dropdownItems: [
                    {text:'alunos', href:''},
                    {text:'professores', href:''},
                    {text:'disciplinas', href:'http://127.0.0.1:5501/pages/adm/painel/subject/painelSubject.html', selected:true}
                ],
                selected: true

            }
        ]
    })
    main.appendChild(navBar)
    
    const page = document.createElement('div')
    page.classList.add('page')
    
    const header = PageHeader({
        title_text: 'Cadastro da disciplina',
        back_btn: true,
        back_btn_address: 'http://127.0.0.1:5501/pages/adm/painel/subject/painelSubject.html'
    })
    page.append(header)
    
    const registerForm = document.createElement('div')
    registerForm.style.marginLeft = '46px';
    registerForm.style.display = 'flex'
    registerForm.style.flexDirection = 'column'
    registerForm.style.justifyContent = 'space-between'
    registerForm.style.height = '100%'
    registerForm.style.alignItems = "center"
    

    const inputDiv = document.createElement('div')
    inputDiv.style.width = '100%'
    inputDiv.style.display = 'flex'
    inputDiv.style.gap = '2rem'
    registerForm.append(inputDiv)

    const input = Input({
        placeholder: 'Disciplina 1',
        title: 'Nome',
        inputClass: 'subject-name'
    })


    const select = Select({
        title: 'Professor',
        tooltipText: 'Devem existir professores cadastrados para adicionar na disciplina, logo o campo é opcional.',
        options: await setTeachersSelect()
    })

    
    inputDiv.append(input)
    inputDiv.append(select)

    const button = Button({
        text: 'Cadastrar',
        action: async () => {
            await postNewSubject()
            window.location.href = `http://127.0.0.1:5501/pages/adm/painel/subject/painelSubject.html`
        }
    })
    registerForm.append(button)

    page.append(registerForm)

    main.append(page)
}


async function setPage() {
    const token = localStorage.getItem('token')
    const user_role = await getRoleByToken(token)
    if (user_role === 'administrador') {
        await registerSubject()
    }
}

async function postNewSubject() {
    const token = localStorage.getItem('token')
    
    const subjectName = document.querySelector('input').value
    const selectedTeacher = document.querySelector('select').value
    
    
    console.log(subjectName)
    console.log(selectedTeacher);
    await createSubject(token, subjectName, selectedTeacher)
}

await setPage()
