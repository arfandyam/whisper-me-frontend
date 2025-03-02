import { FindAnswersByQuestionId } from "@/types/interface/answers/response-types";
import { User } from "@/types/interface/auth-provider";

export const findAnswersByQuestionId = async (questionId: string | undefined, cursor: string | null): Promise<FindAnswersByQuestionId> => {
    console.log("questionId, dari fetch: ", questionId)
    let url;
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
    const accessToken = user?.accessToken

    if (cursor != null) {
        url = `${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/response/${questionId}?cursor=${cursor}`
    } else {
        url = `${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/response/${questionId}`
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    })

    const answers: FindAnswersByQuestionId = await response.json();
    if (!response.ok) {
        console.error("Failed to fetch questions")
    }

    console.log("answers dari fungsi fetch", answers)
    return answers;
}