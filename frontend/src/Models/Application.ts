export type applicationModel = {
    id:number,
    jobOfferTitle:string,
    aboutYourself:string,
    similarExperience:string,
    expectedMonthlySalary:string,
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
    aboutYourself:string,
    similarExperience:string,
    expectedMonthlySalary:number,
    date:Date,
    cvId:number,
    cvFileName:string,
    status:string,
    testId:number,
    assignTestDate:Date
}