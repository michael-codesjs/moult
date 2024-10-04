
export type UserDTO = {
    entityType: "USER",
    id: string,
    creatorType: "USER",
    creator: string,
    created: Date,
    modified: Date,
    discontinued: boolean
    name: string,
    email?: string,
    phoneNumber?: string,
    dateOfBirth?: Date,
    gender: "MALE" | "FEMALE"
};