// import { User } from "@/types/interface/auth-provider";
import { FindQuestionsByUserIdResponse } from "@/types/interface/questions/response-types";

export const findQuestionsByUserId = async (userId: string | undefined, accessToken: string | undefined, cursor: string | null): Promise<FindQuestionsByUserIdResponse> => {
    let url;
    if (cursor != null) {
        url = `${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/question?cursor=${cursor}`
    } else {
        url = `${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/question`
    }
    // const user: User = JSON.parse(localStorage.getItem("user") || "null");
    console.log("Di akses oleh react query accesstoken:", accessToken)
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    const questions: FindQuestionsByUserIdResponse = await response.json();

    if (!response.ok) {
        console.error("Failed to fetch questions")
    }

    return questions;
}