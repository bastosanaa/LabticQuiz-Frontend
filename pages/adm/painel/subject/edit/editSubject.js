import { NavBar } from "../../../../../components/navBar/navBar.js";
import { PageHeader } from "../../../../../components/pageHeader/pageHeader.js";
import { Input } from "../../../../../components/input/input.js"
import { Select } from "../../../../../components/select/select.js";
import { Button } from "../../../../../components/button/button.js";
import { setTeachersSelect } from "../../../../../scripts/utils/setTeachersSelect.js";
import { ContentList } from "../../../../../components/contentList/contentList.js";
import { Dialog } from "../../../../../components/dialog/dialog.js";
import { updateSubjectChanges,getSubjectByID } from "../../../../../scripts/service/subjectService.js"
import { getEntityID } from "../../../../utils/api.js";
import { deleteQuiz, getPostedQuizzesBySubject } from "../../../../../scripts/service/quizService.js";
import { urlPage } from "../../../../../config/url-config.js";

const token = localStorage.getItem('token')
const id = getEntityID()

async function editSubject() {
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
                    {text:'alunos', href:`${urlPage}/pages/adm/painel/student/painelStudent.html`},
                    {text:'professores', href:`${urlPage}/pages/adm/painel/teacher/painelTeacher.html`},
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
        title_text: 'Edição da disciplina',
        back_btn: true,
        back_btn_address: `${urlPage}/pages/adm/painel/subject/painelSubject.html`
    })
    page.append(header)

    const registerForm = document.createElement('div')
    registerForm.classList.add('register-form')

    const inputDiv = document.createElement('div')
    inputDiv.classList.add('crud-input-div')

    registerForm.append(inputDiv)

    const input = Input({
        placeholder: 'Disciplina 1',
        title: 'Nome',
        inputClass: 'subject-name'
    })
    input.classList.add('crud-input')

    const select = Select({
        title: 'Professor',
        tooltipText: 'Devem existir professores cadastrados para adicionar na disciplina, logo o campo é opcional.',
        options: await setTeachersSelect()
    })
    select.classList.add('crud-input')

    const subjectNameInput = input.querySelector('input')
    const subjectTeacherSelect = select.querySelector('select')

    setSubjectEditPage(subjectNameInput, subjectTeacherSelect)

    inputDiv.append(input)
    inputDiv.append(select)

    const quizzes = await(await getPostedQuizzesBySubject(token, id)).json() 
    console.log(quizzes);
    

    const quizList = ContentList({
        title_text: "Quizzes",
        content_items: quizzes.map(quiz => {
            return {
                title: quiz.title,
                id: quiz._id,
                crud: {
                    remove: async () => {  
                        const dialog =  Dialog({
                            header: 'Tem certeza?',
                                description: 'Você irá eliminar o quiz "quiz", essa ação nao pode ser desfeita.',
                                buttons: [{
                                    type: 'outline',
                                    size: 'small',
                                    text: 'Cancelar',
                                    action: () => {
                                        dialog.close()
                                    }
                                },
                                {
                                    type: 'destructive',
                                    size:'small',
                                    text: 'Eliminar',
                                    action: async () => {
                                        await deleteQuiz(token, quiz._id)
                                        window.location.href = `${urlPage}/pages/adm/painel/subject/painelSubject.html`
                                    }
                                }
                            ]
                        }
                        )
                        const body = document.querySelector('body')
                        body.append(dialog)
                        dialog.showModal()        
                    },
                    edit: `${urlPage}/pages/adm/painel/subject/edit/editQuiz.html?id=${quiz._id}`
                }
            }
        })
    })

    inputDiv.append(quizList)

    const button = Button({
        text: 'Salvar alterações',
        action: async () => {
            await sendNewSubjectData()
            window.location.href = `${urlPage}/pages/adm/painel/subject/painelSubject.html`
        }
    })

    registerForm.append(button)

    page.append(registerForm)


    main.append(page)

    
    async function setSubjectEditPage(input, select) {
        const token = localStorage.getItem('token')
        const id = getEntityID()
        const subject = await getSubjectByID(token,id)
        
        input.value = subject.subject_name
        
        if (subject.subject_teacher !== null) {
            select.value = subject.subject_teacher
        } else {
            select.value = ''
            
        }

        
    }
    async function sendNewSubjectData() {
        const token = localStorage.getItem('token')
        const id = getEntityID()
        const new_name = subjectNameInput.value
        const new_teacher = subjectTeacherSelect.value
        await updateSubjectChanges(token, id, new_name, new_teacher)
    }
} 
editSubject()