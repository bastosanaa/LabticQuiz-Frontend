export function subjectTableParser(subjectObj) {

    const teacher = subjectObj.teacher_id
    
    const parsedSubjectObj = {
        'nome': subjectObj.name,
        'professor': teacher ? teacher.name : 'Nenhum professor selecionado' ,
        'quiz': subjectObj.quizzes.length
    }

    return parsedSubjectObj
}