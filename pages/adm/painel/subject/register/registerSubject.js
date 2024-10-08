import { NavBar } from "../../../../../components/navBar/navBar.js";
import { PageHeader } from "../../../../../components/pageHeader/pageHeader.js";
import { Input } from "../../../../../components/input/input.js"
import { Select } from "../../../../../components/select/select.js";
import { createSubject } from "../../../../../scripts/service/subjectService.js";
import { getRoleByToken } from "../../../../../scripts/service/userService.js"
import { Button } from "../../../../../components/button/button.js";
import { setTeachersSelect } from "../../../../../scripts/utils/setTeachersSelect.js";
import { checkIfAllInputsFiled } from "../../../../utils/api.js";
import { urlPage } from "../../../../../config/url-config.js";
import { hideLoader, showLoader } from "../../../../utils/loaderManipulation.js";

const url = `${urlPage}`



async function registerSubject() {
    const main = document.getElementById('main')
    
    const navBar = NavBar({items:
        [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                anchor: `${urlPage}/dashboardAdm.html`,
            },
            {
                imgSrc: '/assets/books.svg',
                title: 'Painel',
                dropdownItems: [
                    {text:'alunos', href:''},
                    {text:'professores', href:''},
                    {text:'disciplinas', href:`${urlPage}/pages/adm/painel/subject/painelSubject.html`, selected:true}
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
        back_btn_address: `${urlPage}/pages/adm/painel/subject/painelSubject.html`
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
        inputClass: 'subject-name',
        required:true
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
            if (checkIfAllInputsFiled()) {
                await postNewSubject()
                window.location.href = `${urlPage}/pages/adm/painel/subject/painelSubject.html`
            }
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

    await createSubject(token, subjectName, selectedTeacher)
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
