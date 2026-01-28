export type UserProfileToken={
    name:string;
    surname:string;
    phoneNumber:string;
    email:string;
    roles:string[];
    token:string;
}
export type UserProfile={
    name:string,
    surname:string,
    phoneNumber:string,
    email:string;
    roles:string[];
}

export type UserManagementDto={
    id:string,
    name:string,
    surname:string,
    phoneNumber:string,
    email:string;
    roles:string[];
}