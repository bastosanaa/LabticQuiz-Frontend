import { Button } from "./components/button/button.js";
import { ContentItem } from "./components/contentItem/contentItem.js";
const page = document.getElementById('page')

const button1 = Button({
    text: 'outro',
    action: () => {
        console.log("oi");
        page.appendChild(Button({
            text: '2'
        }))
    },
    imgSrc: "/assets/register.svg"
})
page.appendChild(button1)

const button12 = Button({
    size: "medium",
    text: 'defaultBtn',
    action: () => {
        console.log("acao");
    },
})
page.appendChild(button12)
console.log(button12);

const button13 = Button({
    size: "small",
    text: 'miniBtn',
    action: () => {
        console.log("acao");
    },
})
page.appendChild(button13)
console.log(button13);

const button2 = Button({
    text: 'outlinedBtn',
    type: 'outline',
    action: () => {
        console.log("acao");
    }
})
page.appendChild(button2)

const button3 = Button({
    text: 'destructiveBtn',
    type: 'destructive',
    action: () => {
        console.log("acao");
    }
})
page.appendChild(button3)

const button4 = Button({
    text: 'destrulinedBtn',
    type: 'destructive-outline',
    action: () => {
        console.log("acao");
    }
})
page.appendChild(button4)

const contentItem = ContentItem({
    text: 'item de lista xD',
    action: 'ação'
})
page.append(contentItem)

const contentItem2 = ContentItem({
    text: 'segundo item de lista xD',
    address: "endereco",
})
page.append(contentItem2)


