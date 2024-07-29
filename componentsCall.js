import { Input } from "./components/input/input.js";
import { AuthCard } from "./components/authCard/authCard.js"
import { Button } from "./components/button/button.js";
import { Table } from "./components/table/table.js";
import { ContentItem } from "./components/contentItem/contentItem.js";

const body = document.querySelector('body')

const item = ContentItem({
    text: 'testando',
    date: '31/02',
    tag: 'tag'
})

body.append(item)

const item2 = ContentItem({
    text: 'testando',
    crud: 'sim',
})

body.append(item2)

const item3 = ContentItem({
    text: 'testando',
    score: '10/10',
    score: {
        href: '',
        grade: '10'
    }
})

body.append(item3)


const authCard = AuthCard({
    title: 'Login',
    buttonParams: Button({
        text: 'butao',
        size: 'medium'
    }),
    inputs: [Input({
        placeholder: 'placeholder',
        required: true,
        title: 'Input',
        errorMessage: 'mensagem de erro',
    }),
    Input({
        placeholder: 'placeholder',
        required: true,
        title: 'Input',
        errorMessage: 'mensagem de erro',
        type: 'password'
    })],
    extraAnchor: {
        text: 'anchora extra pra mudar senha',
        href: ''
    },
})
body.appendChild(authCard)

const table = Table({
    columns: ['nome', 'idade', 'sim'],
    rows: [['ana', '19', 'sim'], ['renan', '19', 'nao']]
})

body.appendChild(table)



