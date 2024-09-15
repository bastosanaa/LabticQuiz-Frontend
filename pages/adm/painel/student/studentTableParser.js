import { getSubjectsbyStudent } from "../../../../scripts/service/studentSubjecService.js"

export async function studentTableParser(studentObj) {

    const token = localStorage.getItem('token')

    const subjects = await getSubjectsbyStudent(token, studentObj._id)
    
    const parsedStudentObj = {
        'matricula': studentObj.registration,
        'nome': studentObj.name,
        'disciplinas': subjects.length
    }
    
    return parsedStudentObj
}