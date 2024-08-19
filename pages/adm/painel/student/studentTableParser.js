export function studentTableParser(studentObj) {


    console.log(studentObj);
    
    const parsedStudentObj = {
        'matricula': studentObj._id,
        'nome': studentObj.name,
        'disciplinas': '0'
    }
    
    return parsedStudentObj
}