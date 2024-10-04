export type CreateUserParams = {
    name: string,
    email?: string,
    phoneNumber?: string,
    dateOfBirth?: Date
};

export type UpdateUserParams = {
    name?: string,
    email?: string,
    phoneNumber?: string,
    dateOfBirth?: Date
};