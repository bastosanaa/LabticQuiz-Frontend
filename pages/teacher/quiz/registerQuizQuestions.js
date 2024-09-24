import { Alternatives } from "../../../components/alternatives/alternatives.js"
import { Button } from "../../../components/button/button.js"
import { Input } from "../../../components/input/input.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { urlPage } from "../../../config/url-config.js"
import { getQuizByID, updateQuiz } from "../../../scripts/service/quizService.js"
import { getAllSubjects } from "../../../scripts/service/subjectService.js"
import { getEntityID, parseSubjectToList } from "../../utils/api.js"


const token = localStorage.getItem('token')
const quiz_id = getEntityID()

const quiz = await (await getQuizByID(token, quiz_id)).json()
console.log(quiz);


async function setRegisterQuizQuestionsPage() {
    const main = document.getElementById('main')
    const subjects = await getAllSubjects(token)
    
    const navBar = NavBar({
        items: [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                selected: true,
                anchor: `${urlPage}/pages/teacher/dashboard/dashboardTeacher.html`,
            },
            {
                imgSrc: '/assets/books.svg',
                title: 'Disciplinas',
                selected: true,
                dropdownItems: parseSubjectToList(subjects,`${urlPage}/pages/teacher/quiz/quizzesPainel.html`)        
            },
            {
                imgSrc: '/assets/register.svg',
                title: 'Criar Quiz',
                anchor: `${urlPage}/pages/teacher/quiz/registerQuiz.html`
            }
        ]
    }

    )
    main.appendChild(navBar)
    
    const page = document.createElement('div')
    page.classList.add('page')
    
    const header = PageHeader({
        title_text: quiz.title,
        subtitle_text: quiz.subject_id.name,
        // subtitle_size: 'small',
        back_btn: true,
        back_btn_address: `${urlPage}/pages/teacher/quiz/registerQuiz.html?id=${quiz_id}`
    })
    page.append(header)

    const registerForm = document.createElement('div')
    registerForm.classList.add('register-form')
    page.append(registerForm)

    const inputDiv = document.createElement('div')
    inputDiv.classList.add('crud-input-div')
    registerForm.appendChild(inputDiv)

    for (let i = 1; i < 11; i++) {
        
        const quizQuestion = quiz.questions ? quiz.questions[i-1] : null
        const questionDiv = document.createElement('div')
        questionDiv.classList.add('question-div')
        questionDiv.style.width = '100%'
        questionDiv.style.display = 'flex'
        questionDiv.style.flexDirection = 'column'
        questionDiv.style.gap = '1rem'
        const question = Input({
            placeholder: 'Digite aqui a pergunta...',
            title: `Pergunta ${i}`,
        })
        const inputContainer = question.querySelector('input')
        inputContainer.value = quizQuestion ? quizQuestion.title : null

        question.classList.add('question')
        questionDiv.append(question)
        
        const alternatives = Alternatives({
            altContent: quiz.questions.length >0  ? quizQuestion.alternatives : null
        })
        questionDiv.append(alternatives)
        
        inputDiv.append(questionDiv)
        
    }

    

    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('button-div')
    registerForm.append(buttonDiv)
    
    const draftButton = Button({
        type: 'outline',
        text: 'Guardar Rascunho',
        size: 'medium',
        action: async () => {
            const questions = getQuizQuestions()
            console.log(questions);
            
            await updateQuiz(token,{questions: questions, is_draft: true},quiz_id)
            window.location.href = `${urlPage}/pages/teacher/quiz/quizzesPainel.html?id=${quiz.subject_id._id}`
// 
        }
    })
    buttonDiv.append(draftButton)

    const postButton = Button({
        text: 'Postar',
        size: 'medium',
        action: async () => {
            const questions = getQuizQuestions()
            await updateQuiz(token,{questions: questions, is_draft: false},quiz_id)

            window.location.href = `${urlPage}/pages/teacher/quiz/quizzesPainel.html?id=${quiz.subject_id._id}`
            
        }
    })
    buttonDiv.append(postButton)

    
    main.append(page)

}


function getQuizQuestions() {
    const questionDivs = document.querySelectorAll('.question-div')
    const questions = []

    questionDivs.forEach(questionDiv => {
        const questionInputContainer = questionDiv.querySelector('.question')
        const questionInput = questionInputContainer.querySelector('input')

        const correctAlt = questionDiv.querySelector('#correct-alt')

        const wrongAlt1 = questionDiv.querySelector('#wrong-alt1')
        const wrongAlt2 = questionDiv.querySelector('#wrong-alt2')
        const wrongAlt3 = questionDiv.querySelector('#wrong-alt3')

        
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
    return questions
}

setRegisterQuizQuestionsPage()


