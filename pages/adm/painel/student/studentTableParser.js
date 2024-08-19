export function studentTableParser(studentObj) {


    console.log(studentObj);
    
    const parsedStudentObj = {
        'matricula': studentObj.registration,
        'nome': studentObj.name,
        'disciplinas': '0'
    }
    
    return parsedStudentObj
}