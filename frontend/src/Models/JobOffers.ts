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
    isVisible:boolean,
    jobOfferTechnologyRequired: Technology[]
    jobOfferTechnologyNiceToHave:Technology[]
}


export type JobOfferQuery={
    jobTitle?:string,
    language?:string
}