export type applicationModel = {
    jobOfferTitle:string,
    description:string,
    date:string,
    cvId:number,
    cvFileName:string,
    status:string,
    testId:number
}

export type GroupedApplications= {
    jobOfferTitle:string,
    applications:Applications[]
}

export type Applications={
    name:string,
    surname:string,
    description:string,
    date:Date,
    cvId:number,
    cvFileName:string,
    status:string,
    testId:number
}