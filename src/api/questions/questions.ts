// import { User } from "@/types/interface/auth-provider";
import { User } from "@/types/interface/auth-provider";
import { CreateQuestionInterface } from "@/types/interface/questions/payload-types";
import { FindQuestionsByUserIdResponse } from "@/types/interface/questions/response-types";

export const findQuestionsByUserId = async (userId: string | undefined, cursor: string | null): Promise<FindQuestionsByUserIdResponse> => {
    let url;
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
    const accessToken = user?.accessToken
    if (cursor != null) {
        url = `${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/question?cursor=${cursor}`
    } else {
        url = `${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/question`
    }
    console.log("Di akses oleh react query accesstoken:", accessToken)
    console.log("Di akses oleh react query cursor:", cursor)
    const response = await fetch(url, {
        method: "GET",
        headers: {
            // Authorization: `Bearer ${user.accessToken}`,
            Authorization: `Bearer ${accessToken}`,
        }
    });

    const questions: FindQuestionsByUserIdResponse = await response.json();

    if (!response.ok) {
        console.error("Failed to fetch questions")
    }

    return questions;
}

export const createQuestion = async ({ topic, question }: CreateQuestionInterface, accessToken: string | undefined): Promise<Response> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/question`, {
        method: "POST",
        body: JSON.stringify({ topic, question }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    });

    return response;

}