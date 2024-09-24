import { NavBar } from "../../../../../components/navBar/navBar.js";
import { PageHeader } from "../../../../../components/pageHeader/pageHeader.js";
import { Input } from "../../../../../components/input/input.js"
import { Button } from "../../../../../components/button/button.js";
import { Multiselect } from "../../../../../components/multiselect/multiselect.js";
import { getAllSubjects } from "../../../../../scripts/service/subjectService.js";
import { checkIfAllInputsFiled, patchUserUpdates, setUserEditPage, getSubjectsRegistered, compareItemsSelected, subjectParser, getEntityID } from "../../../../utils/api.js";
import { registerStudentToSubjects, deleteStudentFromSubjects } from "../../crudUtils.js"
import { urlPage } from "../../../../../config/url-config.js"


const token = localStorage.getItem('token')

export async function editStudent() {
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

    const header = PageHeader({
        title_text: 'Edição do Aluno',
        back_btn: true,
        back_btn_address: `${urlPage}/pages/adm/painel/student/painelStudent.html`
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
    const subjects = await getAllSubjects(token)

    const preSelectedItems = await getSubjectsRegistered(token)
    
    const {multiselect, getSelecteds} = Multiselect(subjects, 'Disciplinas', preSelectedItems)
    multiselect.classList.add('crud-input')
    
    multiselect.classList.add('crud-input')

    const nameField = inputName.querySelector('input')
    const registrationField = inputRegistration.querySelector('input')
    const emailField = inputEmail.querySelector('input')

    await setUserEditPage(token, nameField, registrationField, emailField)
    
    inputDiv.append(inputName)
    inputDiv.append(inputRegistration)
    inputDiv.append(inputEmail)
    inputDiv.append(multiselect)

    const button = Button({
        text: 'Cadastrar',
        action: async () => {
            if (checkIfAllInputsFiled()) {
                
                await patchUserUpdates(token, nameField, registrationField, emailField)

                const selectedItems = getSelecteds()
                const parsedPreSelectedItems = subjectParser(preSelectedItems)

                const { removedItems, addedItems } = compareItemsSelected(parsedPreSelectedItems, selectedItems)

                const student_id = getEntityID()

                await registerStudentToSubjects(token,student_id, addedItems)
                await deleteStudentFromSubjects(token,student_id, removedItems)

                window.location.href = `${urlPage}/pages/adm/painel/student/painelStudent.html`
            }
        }
    })


    registerForm.append(button)

    page.append(registerForm)

    body.append(page)

}
await editStudent()
