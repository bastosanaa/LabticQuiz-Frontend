import { Button } from "./components/button/button.js";
import { ContentItem } from "./components/contentItem/contentItem.js";
import { NavBar } from "./components/navBar/navBar.js";
import { PageHeader } from "./components/pageHeader/pageHeader.js";
import { ContentList } from "./components/contentList/contentList.js";

const main = document.getElementById('main')

const navBar = NavBar()
main.appendChild(navBar)

const page = document.createElement('div')
page.classList.add('page')

const header = PageHeader({
    title_text: 'Título da página',
    back_btn: true,
    subtitle_text: 'subtítulo da página'
})
page.append(header)

const content = ContentList({
    title_text: 'Conteúdo da lista',
    content_items: [{
        text: 'item de lista'
    },
    {
        text: 'item de lista 2'
    }]
})
page.append(content)


main.append(page)

