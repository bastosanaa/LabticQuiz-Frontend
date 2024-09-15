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

const token = localStorage.getItem('token')
const id = getEntityID()

async function editSubject() {
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
        title_text: 'Edição da disciplina',
        back_btn: true,
        back_btn_address: 'http://127.0.0.1:5501/pages/adm/painel/subject/painelSubject.html'
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
                                        window.location.href = 'http://127.0.0.1:5501/pages/adm/painel/subject/painelSubject.html'
                                    }
                                }
                            ]
                        }
                        )
                        const body = document.querySelector('body')
                        body.append(dialog)
                        dialog.showModal()        
                    },
                    edit: `http://127.0.0.1:5501/pages/adm/painel/subject/edit/editQuiz.html?id=${quiz._id}`
                }
            }
        })
    })

    inputDiv.append(quizList)

    const button = Button({
        text: 'Salvar alterações',
        action: async () => {
            await sendNewSubjectData()
            window.location.href = 'http://127.0.0.1:5501/pages/adm/painel/subject/painelSubject.html'
        }
    })

    registerForm.append(button)

    page.append(registerForm)


    main.append(page)

    
    async function setSubjectEditPage(input, select) {
        const token = localStorage.getItem('token')
        const id = getEntityID()
        const subject = await getSubjectByID(token,id)
        console.log(subject);
        
        console.log(input);
        
        input.value = subject.subject_name
        
        if (subject.subject_teacher !== null) {
            select.value = subject.subject_teacher
            console.log('entrouuu')
        } else {
            console.log(subject.subject_teacher);
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