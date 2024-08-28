import { Button } from "./../../../components/button/button.js";
import { ContentItem } from "./../../../components/contentItem/contentItem.js";
import { NavBar } from "./../../../components/navBar/navBar.js";
import { PageHeader } from "./../../../components/pageHeader/pageHeader.js";
import { ContentList } from "./../../../components/contentList/contentList.js";

import { getUserIDbyToken, getUserByID } from "/../../../scripts/service/userService.js"
import { getAllSubjects } from "../../../scripts/service/subjectService.js";

async function getUserName(token) {
    const user_id = (await getUserIDbyToken(token))._id
    const user = await getUserByID(token, user_id)
    console.log(user);
    
    const user_name = user.name
    return user_name    
}



async function setPage() {
    const token = localStorage.getItem('token')
    const user_name =  await getUserName(token)
    const subjects = await getAllSubjects(token)
    console.log(subjects);
    
    await setUserDashboard(user_name, subjects)

}

async function setUserDashboard(user_name, subjects) {
    const main = document.getElementById('main')
    
    const navBar = NavBar(
        {
            imgSrc: '/assets/menu.svg',
            title: 'Dashboard',
            selected: true,
            anchor: 'http://127.0.0.1:5501/dashboardAdm.html',
        },
    )
    main.appendChild(navBar)
    
    const page = document.createElement('div')
    page.classList.add('page')
    
    const header = PageHeader({
        title_text: 'Dashboard',
        back_btn: true,
        subtitle_text: `Bem-vindo(a), ${user_name}`
    })

    const subjectList = ContentList({
        title_text: 'Disciplinas',
        content_items: parseSubjectToList(subjects)
    })
    
    page.append(header)
    page.append(subjectList)
    
    main.append(page)

}

function parseSubjectToList(subjects) {
    let parsedSubjects = []
    subjects.forEach(subject => {
        const id = subject._id
        const parsedSubject = {
            name: subject.name,
            href: `http://127.0.0.1:5501/pages/teacher/quiz/registerQuiz.html`
        }
        parsedSubjects.push(parsedSubject)
    })    
    return parsedSubjects
}

await setPage()