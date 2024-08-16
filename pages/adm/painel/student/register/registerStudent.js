import { NavBar } from "../../../../../components/navBar/navBar.js";
import { PageHeader } from "../../../../../components/pageHeader/pageHeader.js";
import { Input } from "../../../../../components/input/input.js"
import { Select } from "../../../../../components/select/select.js";
import { Button } from "../../../../../components/button/button.js";
import { checkIfAllInputsFiled } from "../../../../utils/api.js";
import { createUser } from "../../../../../scripts/service.js";

const token = localStorage.getItem('token')

export async function registerStudent() {
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

    const header = PageHeader({
        title_text: 'Cadastro do Aluno',
        back_btn: true,
        back_btn_address: 'http://127.0.0.1:5501/pages/adm/painel/student/painelStudent.html'
    })
    page.append(header)

    //desenvolvendo
    const registerForm = document.createElement('div')
    registerForm.classList.add('register-form')

    const inputDiv = document.createElement('div')
    inputDiv.classList.add('crud-input-div')
    registerForm.append(inputDiv)

    const inputName = Input({
        placeholder: 'Nome sobrenome',
        title: 'Nome Completo',
        inputClass: 'student-name',
        required:true
    })
    inputName.classList.add('crud-input')

    const inputRegistration = Input({
        placeholder: '00000',
        title: 'Matrícula',
        inputClass: 'student-registration',
        required:true
    })
    inputRegistration.classList.add('crud-input')

    const inputEmail = Input({
        placeholder: 'email@email.com',
        title: 'Email',
        inputClass: 'student-email',
        required:true
    })
    inputEmail.classList.add('crud-input')

    //WIP: multiselect
    const subjectsMultiSelect = Select({
        title: 'Disciplinas',
        tooltipText: 'Devem existir professores cadastrados para adicionar na disciplina, logo o campo é opcional.',
        options: ['disciplinas do usuário']
    })
    subjectsMultiSelect.classList.add('crud-input')

    
    inputDiv.append(inputName)
    inputDiv.append(inputRegistration)
    inputDiv.append(inputEmail)
    inputDiv.append(subjectsMultiSelect)

    const button = Button({
        text: 'Cadastrar',
        action: async () => {
            if (checkIfAllInputsFiled()) {
                const nameField = inputName.querySelector('input')
                const registrationField = inputRegistration.querySelector('input')
                const emailField = inputEmail.querySelector('input')
                await postNewStudent(nameField, registrationField, emailField)
                window.location.href = 'http://127.0.0.1:5501/pages/adm/painel/student/painelStudent.html'
            }
        }
    })


    registerForm.append(button)

    page.append(registerForm)

    body.append(page)

}
await registerStudent()

async function postNewStudent(nameField, registrationField, emailField, ) {
    const name = nameField.value
    const registration = registrationField.value
    const email = emailField.value
    const role = 'aluno'
    const password = '123'
    await createUser(token,name,registration,email,password,role)
}
