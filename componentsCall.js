import { Input } from "./components/input/input.js";

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

