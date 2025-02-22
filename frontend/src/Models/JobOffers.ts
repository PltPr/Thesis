export type Technology={
    Name:string,
}

export type JobOfferGet ={
    Id:number,
    JobTittle:string,
    JobType:string,
    Salary:number,
    ProgrammingLanguage:string,
    Description:string,
    JobOfferTechnology: Technology[]
}