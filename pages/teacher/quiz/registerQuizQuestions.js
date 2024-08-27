import { Alternatives } from "../../../components/alternatives/alternatives.js"
import { Button } from "../../../components/button/button.js"
import { Input } from "../../../components/input/input.js"
import { NavBar } from "../../../components/navBar/navBar.js"
import { PageHeader } from "../../../components/pageHeader/pageHeader.js"
import { Select } from "../../../components/select/select.js"

async function setRegisterQuizQuestionsPage() {
    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [
            {
                imgSrc: '/assets/menu.svg',
                title: 'Dashboard',
                selected: true,
                anchor: 'http://127.0.0.1:5501/pages/adm/dashboard/dashboardAdm.html',
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
    })
    page.append(header)

    const alternatives = Alternatives()
    page.append(alternatives)


    main.append(page)

}


setRegisterQuizQuestionsPage()