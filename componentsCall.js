import { Input } from "./components/input/input.js";
import { AuthCard } from "./components/authCard/authCard.js"
import { Button } from "./components/button/button.js";

const body = document.querySelector('body')

const input = Input({
    placeholder: 'placeholder',
    required: true,
    title: 'Input',
    errorMessage: 'mensagem de erro',
    type: 'password'
})
body.appendChild(input)

const input2 = Input({
    placeholder: 'placeholder',

    title: 'Input2',
    errorMessage: 'mensagem de erro',
})

body.appendChild(input2)

const authCard = AuthCard({
    title: 'Login',
    buttonParams: Button({
        text: 'butao'
    }),
    inputs: [Input({
        placeholder: 'placeholder',
        required: true,
        title: 'Input',
        errorMessage: 'mensagem de erro',
        type: 'password'
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


