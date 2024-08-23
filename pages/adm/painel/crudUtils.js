import { registerStudentToSubject, deleteStudentSubject } from "../../../scripts/service/studentSubjecService.js"


//🚧 - ARRUMAR IMPORTACOES DESTE ARQUIVO - 🚧
//UserUtils
export async function postNewUser(token, nameField, registrationField, emailField, role) {
    const name = nameField.value
    const registration = registrationField.value
    const email = emailField.value
    const password = '123'
    return await createUser(token,name,registration,email,password,role)
}

export async function patchUserUpdates(token, nameField, registrationField, emailField, role) {
    const id = getEntityID()
    const name = nameField.value
    const registration = registrationField.value
    const email = emailField.value
    await updateUserChanges(token,id,name,registration,email)
}

//SubjectUtils

export function subjectParser(subjectList) {
    
    const parsedSubjectList = []
    subjectList.forEach(subject => {
        const parsedSubject = {
            _id: subject._id? subject._id : subject.subject_id ,
            name: subject.name? subject.name : subject.subject_name
        }
        parsedSubjectList.push(parsedSubject)
    })
    
    return parsedSubjectList
}

//StudentSubjectUtils

export async function getSubjectsRegistered(token) {
    const id = getEntityID()
    return await getSubjectsbyStudent(token, id)
}

export async function registerStudentToSubjects(token,studentID, subjects) {
    console.log(subjects);
    

    subjects.forEach(async(subject) => {
        
        await registerStudentToSubject(token,studentID, subject._id)
    })
}

export async function deleteStudentFromSubjects(token, studentID, subjects) {
    console.log(subjects);
    
    subjects.forEach(async subject => {
        await deleteStudentSubject(token, studentID, subject._id)
    })
}