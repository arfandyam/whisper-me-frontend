// import { User } from "@/types/interface/auth-provider";
import { User } from "@/types/interface/auth-provider";
import { CreateQuestionInterface, EditQuestionInterface } from "@/types/interface/questions/payload-types";
import { FindQuestionsBySlug, FindQuestionsByUserIdResponse } from "@/types/interface/questions/response-types";

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
            Authorization: `Bearer ${accessToken}`,
        }
    });

    const questions: FindQuestionsByUserIdResponse = await response.json();

    if (!response.ok) {
        console.error("Failed to fetch questions")
    }

    return questions;
}

export const findQuestionsBySlug = async (slug: string | undefined): Promise<FindQuestionsBySlug> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/question/slug/${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const question: FindQuestionsBySlug = await response.json();
    if (!response.ok) {
        console.error("Failed to fetch questions")
    }

    return question;
}

export const findQuestionsById = async (id: string | undefined): Promise<FindQuestionsBySlug> => {
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
    const accessToken = user?.accessToken;

    const response = await fetch(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/question/id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    })

    const question: FindQuestionsBySlug = await response.json();
    if (!response.ok) {
        console.error("Failed to fetch questions")
    }

    return question;
}

export const createQuestion = async ({ topic, question }: CreateQuestionInterface): Promise<Response> => {
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
    const accessToken = user?.accessToken;
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

export const editQuestion = async ({ topic, question }: EditQuestionInterface, questionId: string): Promise<Response> => {
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
    const accessToken = user?.accessToken;

    const response = await fetch(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/question/${questionId}`, {
        method: "PUT",
        body: JSON.stringify({ topic, question }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    })

    return response;
}

export const redirectShortenUrl = async (urlKey: string | undefined): Promise<Response> => {

    console.log(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/question/r/${urlKey}`)

    const response = await fetch(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/question/r/${urlKey}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response;
}