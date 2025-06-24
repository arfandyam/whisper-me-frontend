import { UserRegistration } from "@/types/interface/payload-types";

export const mapRegistrationField = ({
    firstName,
    lastName,
    username,
    email,
    password
}: UserRegistration) => ({
    first_name: firstName,
    last_name: lastName,
    username,
    email,
    password
});