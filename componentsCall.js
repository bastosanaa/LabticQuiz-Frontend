import { Multiselect } from "./components/multiselect/multiselect.js"

const body = document.querySelector('body')

const mock = ['matematica', 'quimica', 'fisica', 'geografia', 'historia', 'portugues']

const multiselect = Multiselect(mock)

body.append(multiselect)


