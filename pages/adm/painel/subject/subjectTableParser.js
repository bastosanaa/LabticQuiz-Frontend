export function subjectTableParser(subjectObj) {

    const teacher = subjectObj.teacher_id
    const postedQuizzes = subjectObj.quizzes.filter(quiz => !quiz.is_draft)
    
    const parsedSubjectObj = {
        'nome': subjectObj.name,
        'professor': teacher ? teacher.name : 'Nenhum professor selecionado' ,
        'quiz': postedQuizzes.length
    }

    return parsedSubjectObj
}