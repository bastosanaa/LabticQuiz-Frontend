export function teacherTableParser(teacherObj) {    

    const parsedTeacherObj = {
        'identificador': teacherObj.registration,
        'nome': teacherObj.name,
        'disciplinas': '0'
    }
    
    return parsedTeacherObj
}