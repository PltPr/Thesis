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
    jobOfferTitle:string,
    status:string,
    testId:number,
    assignTestDate:Date
}

export type ApplicationEvaluation={
    appId:number,
    userExperienceScore:number,
    criteriaMatchScore:number,
    technicalSkillScore:number,
    educationScore:number,
    recruiterNote:string
}

export type GroupedClassification={
    jobTitle:string,
    applications:Classifications[]
}

export type Classifications={
    applicationId:number,
    firstName:string,
    lastName:string,
    evaluationScore:number,
    status:string
}

export type ApplicationQuery={
    jobTitle?:string,
    status?:string
}

export type SummaryDto={
    userId:string,
    applications:ApplicationSummary[]
}

export type ApplicationSummary={
    jobTitle:string,
    status:string
}