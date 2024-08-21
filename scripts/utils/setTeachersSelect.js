import { getAllTeachers } from "../service/userService.js"

export async function setTeachersSelect() {
    const token = localStorage.getItem('token')
    const teachers = await getAllTeachers(token)
    const options = [
        {
            text: 'Selecione um professor',
            value: ''
        },
        {
            text: 'Nenhum professor',
            value: ''
        }
    ]
    teachers.forEach(teacher => {
        const option = {
            text: teacher.name,
            value: teacher._id
        }
        options.push(option)
    })
    console.log(options);
    
    return options
}