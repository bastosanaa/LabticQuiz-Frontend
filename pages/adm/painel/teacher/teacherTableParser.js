import { getSubjectsByTeacher } from "../../../../scripts/service/subjectService.js";

const token = localStorage.getItem('token')

export async function teacherTableParser(teacherObj) {
    console.log('teacher obj', teacherObj);

    const subjects = await getSubjectsByTeacher(token, teacherObj._id)
    console.log("DISCIPPLINAS", subjects);
    

    const parsedTeacherObj = {
        'identificador': teacherObj.registration,
        'nome': teacherObj.name,
        'disciplinas': subjects.length
    }
    
    return parsedTeacherObj
}