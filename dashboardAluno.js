import { Button } from "./components/button/button.js";
import { ContentItem } from "./components/contentItem/contentItem.js";
import { NavBar } from "./components/navBar/navBar.js";
import { PageHeader } from "./components/pageHeader/pageHeader.js";
import { ContentList } from "./components/contentList/contentList.js";

import { getUserbyID } from "./scripts/service.js"
import  { getSubjectsbyStudent } from "./scripts/service.js"

async function getUserName(token) {
    const user = await getUserbyID(token)
    const user_name = user.name
    return user_name    
}

async function getUserSubjects(token) {
    const subjects = await getSubjectsbyStudent(token)
    if (subjects.length > 0) {
        subjects.forEach(subject => {
            console.log(subject);
        })
    } else {
        console.log('nada');
    }
}

async function setPage() {
    const token = localStorage.getItem('token')
    const user_name =  await getUserName(token)
    getUserSubjects(token)
    await setUserDashboard(user_name)

}

async function setUserDashboard(user_name) {
    const main = document.getElementById('main')
    
    const navBar = NavBar()
    main.appendChild(navBar)
    
    const page = document.createElement('div')
    page.classList.add('page')
    
    const header = PageHeader({
        title_text: 'Dashboard',
        back_btn: true,
        subtitle_text: `Bem-vindo(a), ${user_name}`
    })
    
    page.append(header)
    
    main.append(page)

    //setar a lista com elements passndo as disciplinas
}

await setPage()