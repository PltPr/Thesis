export type Technology={
    name:string,
}

export type JobOfferGet ={
    id:number,
    jobTitle:string,
    jobType:string,
    salary:number,
    programmingLanguage:string,
    description:string,
    jobOfferTechnology: Technology[]
}


export type JobOfferQuery={
    jobTitle?:string,
    language?:string
}