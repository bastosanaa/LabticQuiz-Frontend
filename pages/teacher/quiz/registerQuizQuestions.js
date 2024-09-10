import { Alternatives } from "../../../components/alternatives/alternatives.js"
import { Button } from "../../../components/button/button.js"
import { Input } from "../../../components/input/input.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { Select } from "../../../components/select/select.js"
import { updateQuiz } from "../../../scripts/service/quizService.js"
import { getEntityID } from "../../utils/api.js"

const token = localStorage.getItem('token')

async function setRegisterQuizQuestionsPage() {
    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                selected: true,
                anchor: 'http://127.0.0.1:5501/pages/teacher/dashboard/dashboardTeacher.html',
            },
            {
                imgSrc: '/assets/books.svg',
                title: 'Disciplinas',
                selected: true,
                dropdownItems: parseSubjectToList(subjects,'http://127.0.0.1:5501/pages/teacher/quiz/quizzesPainel.html')        
            },
            {
                imgSrc: '/assets/register.svg',
                title: 'Criar Quiz',
                anchor: 'http://127.0.0.1:5501/pages/teacher/quiz/registerQuiz.html'
            }
        ]
    }

    )
    main.appendChild(navBar)
    
    const page = document.createElement('div')
    page.classList.add('page')
    
    const header = PageHeader({
        title_text: 'Nome do Quiz',
        subtitle_text: 'Nome da disciplina',
        // subtitle_size: 'small',
        back_btn: true,
        back_btn_address: 'http://127.0.0.1:5501/pages/teacher/quiz/registerQuiz.html'
    })
    page.append(header)

    const registerForm = document.createElement('div')
    registerForm.classList.add('register-form')
    page.append(registerForm)

    const inputDiv = document.createElement('div')
    inputDiv.classList.add('crud-input-div')
    registerForm.appendChild(inputDiv)

    for (let i = 1; i < 11; i++) {
        const questionDiv = document.createElement('div')
        questionDiv.classList.add('question-div')
        questionDiv.style.width = '100%'
        questionDiv.style.display = 'flex'
        questionDiv.style.flexDirection = 'column'
        questionDiv.style.gap = '1rem'
        //criar div aqui e percorrer as divs transformando em obejtos
        const question = Input({
            placeholder: 'Digite aqui a pergunta...',
            title: `Pergunta ${i}`,
    
        })
        question.classList.add('question')
        questionDiv.append(question)
    
        const alternatives = Alternatives()
        questionDiv.append(alternatives)

        inputDiv.append(questionDiv)
        
    }

    

    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('button-div')
    registerForm.append(buttonDiv)
    
    const draftButton = Button({
        type: 'outline',
        text: 'Guardar Rascunho',
        size: 'medium'
    })
    buttonDiv.append(draftButton)

    const postButton = Button({
        text: 'Postar',
        size: 'medium',
        action: async () => {
            const questionDivs = document.querySelectorAll('.question-div')
            console.log(questionDivs);

            const questions = []

            questionDivs.forEach(questionDiv => {
                const questionInputContainer = questionDiv.querySelector('.question')
                const questionInput = questionInputContainer.querySelector('input')

                const correctAlt = document.querySelector('#correct-alt')

                const wrongAlt1 = document.querySelector('#wrong-alt1')
                const wrongAlt2 = document.querySelector('#wrong-alt2')
                const wrongAlt3 = document.querySelector('#wrong-alt3')

                questions.push({
                    title: questionInput.value,
                    alternatives: [
                        {
                            correct: true,
                            content: correctAlt.value
                        },
                        {
                            correct: false,
                            content: wrongAlt1.value
                        },
                        {
                            correct: false,
                            content: wrongAlt2.value
                        },
                        {
                            correct: false,
                            content: wrongAlt3.value
                        }
                    ]
                })
            })
            const quiz_id = getEntityID()
            await updateQuiz(token,{questions: questions, is_draft: false},quiz_id)
            console.log(questions);
            
        }
    })
    buttonDiv.append(postButton)

    
    main.append(page)

}


setRegisterQuizQuestionsPage()


