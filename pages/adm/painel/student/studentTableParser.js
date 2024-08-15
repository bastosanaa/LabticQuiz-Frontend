export function studentTableParser(studentObj) {

    const parsedStudentObj = {
        'matricula': studentObj._id,
        'nome': studentObj.name,
        'disciplinas': '0'
    }
    
    return parsedStudentObj
}