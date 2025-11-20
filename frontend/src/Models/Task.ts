export interface taskItem{
    id:number,
    description:string,
    expectedOutput:string,
    durationMinutes:number
}
export interface taskItemForSolving{
    id:number,
    description:string,
    expectedOutput:string,
    durationMinutes:number,
    isSolved:boolean
}
export interface TaskWithSolution{
    codeSubmissionId:number,
    taskDescription:string,
    taskExpectedOutput:string,
    code:string,
    evaluation:number,
    submissionDate:Date,
    compilationResult:string,
    executionResult:string
}