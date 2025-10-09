export type applicationModel = {
    id:number,
    jobOfferTitle:string,
    description:string,
    date:string,
    cvId:number,
    cvFileName:string,
    status:string,
    testId:number
    assignTestDate:Date
}

export type GroupedApplications= {
    jobOfferTitle:string,
    applications:Applications[]
}

export type Applications={
    id:number,
    name:string,
    surname:string,
    description:string,
    date:Date,
    cvId:number,
    cvFileName:string,
    status:string,
    testId:number,
    assignTestDate:Date
}