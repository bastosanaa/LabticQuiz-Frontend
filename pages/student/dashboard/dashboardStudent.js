import { Button } from "./../../../components/button/button.js";
import { ContentItem } from "./../../../components/contentItem/contentItem.js";
import { NavBar } from "./../../../components/navBar/navBar.js";
import { PageHeader } from "./../../../components/pageHeader/pageHeader.js";
import { ContentList } from "./../../../components/contentList/contentList.js";

import { getUserIDbyToken } from "/../../../scripts/service/userService.js"
import  { getSubjectsbyStudent } from "/../../scripts/service/studentSubjecService.js"
import { parseSubjectToList } from "../../utils/api.js";
import { getUserByID } from "../../../scripts/service/userService.js";


async function getUserName(token) {
    const user = await getUserIDbyToken(token)
    const user_data = await getUserByID(token, user._id)    
    const user_name = user_data.name
    return user_name    
}

async function getUserSubjects(token) {
    const user = await getUserIDbyToken(token)
    const subjects = await getSubjectsbyStudent(token,user._id)
    const subjects_items = []
    if (subjects.length > 0) {
        subjects.forEach(subject => {
            const item = {text: subject.subject_name} 
            subjects_items.push(item)
        })
        console.log(subjects_items);
        return subjects_items
    } else {
        console.log('nada');
    }
}

async function setPage() {
    const token = localStorage.getItem('token')
    const user_name =  await getUserName(token)
    console.log(user_name);
    
    const subjects = await getUserSubjects(token)
    console.log(subjects);
    
    await setUserDashboard(user_name, subjects)

}

async function setUserDashboard(user_name, subjects) {
    const main = document.getElementById('main')
    
    const navBar = NavBar({
        items: [{
            imgSrc: '/assets/menu.svg',
            title: 'Dashboard',
            selected: true,
            anchor: 'http://127.0.0.1:5501/dashboardAdm.html',
        }],
    })
    main.append(navBar)
    
    const page = document.createElement('div')
    page.classList.add('page')
    
    const header = PageHeader({
        title_text: 'Dashboard',
        back_btn: true,
        subtitle_text: `Bem-vindo(a), ${user_name}`
    })

    const subjectList = ContentList({
        title_text: 'Disciplinas',
        content_items: subjects,
    })
    
    page.append(header)
    page.append(subjectList)
    main.append(page)

}

await setPage()