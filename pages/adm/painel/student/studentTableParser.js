export function studentTableParser(studentObj) {
    
    const parsedStudentObj = {
        'matricula': studentObj.registration,
        'nome': studentObj.name,
        'disciplinas': '0'
    }
    
    return parsedStudentObj
}