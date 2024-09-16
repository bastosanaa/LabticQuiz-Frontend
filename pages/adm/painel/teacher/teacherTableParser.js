import { getSubjectsByTeacher } from "../../../../scripts/service/subjectService.js";

const token = localStorage.getItem('token')

export async function teacherTableParser(teacherObj) {

    const subjects = await getSubjectsByTeacher(token, teacherObj._id)
    

    const parsedTeacherObj = {
        'identificador': teacherObj.registration,
        'nome': teacherObj.name,
        'disciplinas': subjects.length
    }
    
    return parsedTeacherObj
}