export function teacherTableParser(teacherObj) {

    const parsedTeacherObj = {
        'identificador': teacherObj._id,
        'nome': teacherObj.name,
        'disciplinas': '0'
    }
    
    return parsedTeacherObj
}