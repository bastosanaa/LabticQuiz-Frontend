import { NavBar } from "../../../../../components/navBar/navBar.js";
import { PageHeader } from "../../../../../components/pageHeader/pageHeader.js";
import { Input } from "../../../../../components/input/input.js"
import { Button } from "../../../../../components/button/button.js";
import { checkIfAllInputsFiled, compareItemsSelected, getEntityID, patchUserUpdates, setUserEditPage } from "../../../../utils/api.js";
import { Multiselect } from "../../../../../components/multiselect/multiselect.js";
import { getSubjectsByTeacher, getSubjectsWithoutTeacher } from "../../../../../scripts/service/subjectService.js";
import { deleteTeacherFromSubjetcs, getSubjectsRegistered, registerTeacherToSubjects, subjectParser } from "../../crudUtils.js";
import { urlPage } from "../../../../../config/url-config.js";
import { hideLoader, showLoader } from "../../../../utils/loaderManipulation.js";

const token = localStorage.getItem('token')

export async function registerStudent() {
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
        title_text: 'Edição do Professor',
        back_btn: true,
        back_btn_address: `${urlPage}/pages/adm/painel/teacher/painelTeacher.html`
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
    const teacher_id = getEntityID()

    const subjects = await getSubjectsWithoutTeacher(token) 

    const preSelectedItems = await getSubjectsByTeacher(token, teacher_id)
    
    const {multiselect, getSelecteds} = Multiselect(subjects, 'Disciplinas', preSelectedItems)
    multiselect.classList.add('crud-input')

    const nameField = inputName.querySelector('input')
    const registrationField = inputRegistration.querySelector('input')
    const emailField = inputEmail.querySelector('input')
    
    setUserEditPage(token, nameField, registrationField, emailField)

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

                await registerTeacherToSubjects(token, teacher_id,addedItems)
                await deleteTeacherFromSubjetcs(token, removedItems)


                window.location.href = `${urlPage}/pages/adm/painel/teacher/painelTeacher.html`
            }
        }
    })


    registerForm.append(button)

    page.append(registerForm)

    body.append(page)

}

async function loadPage() {
    showLoader()
    try {
        await registerStudent()

    } finally {
        hideLoader()
    }
}
await loadPage()

