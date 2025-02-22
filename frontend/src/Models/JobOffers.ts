export type Technology={
    name:string,
}

export type JobOfferGet ={
    id:number,
    jobTittle:string,
    jobType:string,
    salary:number,
    programmingLanguage:string,
    description:string,
    jobOfferTechnology: Technology[]
}