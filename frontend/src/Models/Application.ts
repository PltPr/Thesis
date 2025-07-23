export type applicationModel = {
    jobOfferTitle:string,
    description:string,
    date:string,
    cvId:number,
    cvFileName:string,
    status:string
}

export type GroupedApplications= {
    jobOfferTitle:string,
    applications:Applications[]
}

export type Applications={
    description:string,
    date:Date,
    cvId:number,
    cvFileName:string,
    status:string
}