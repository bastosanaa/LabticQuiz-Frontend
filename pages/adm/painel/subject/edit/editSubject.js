import { NavBar } from "../../../../../components/navBar/navBar.js";
import { PageHeader } from "../../../../../components/pageHeader/pageHeader.js";
import { Input } from "../../../../../components/input/input.js"
import { Select } from "../../../../../components/select/select.js";
import { Button } from "../../../../../components/button/button.js";
import { setTeachersSelect } from "../../../../../scripts/utils/setTeachersSelect.js";

import { getSubjectByID } from "../../../../../scripts//service.js"
import { updateSubjectChanges } from "../../../../../scripts//service.js"

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
                    {text:'disciplinas', href:'http://127.0.0.1:5501/painelSubjects.html', selected:true}
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

    const subjectNameInput = input.querySelector('input')
    const subjectTeacherSelect = select.querySelector('select')

    setEditPage(subjectNameInput, subjectTeacherSelect)

    inputDiv.append(input)
    inputDiv.append(select)

    const button = Button({
        text: 'Salvar alterações',
        action: async () => {
            await sendNewSubjectData()
            window.location.href = `http://127.0.0.1:5501//painelSubjects.html`
        }
    })

    registerForm.append(button)

    page.append(registerForm)

    main.append(page)

    function getSubjectID() {
        const url = window.location.search
        const params = new URLSearchParams(url)
        const subject_id = params.get('id')
        return subject_id
    }
    
    async function setEditPage(input, select) {
        const token = localStorage.getItem('token')
        const id = getSubjectID()
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
        const id = getSubjectID()
        const new_name = subjectNameInput.value
        const new_teacher = subjectTeacherSelect.value
        await updateSubjectChanges(token, id, new_name, new_teacher)
    }
} 

editSubject()

