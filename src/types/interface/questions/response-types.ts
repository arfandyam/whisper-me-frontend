import { StatusMessageResponse } from "../response-types"

export interface QuestionsData {
    id: string
    user_id: string
    slug: string
    topic: string
    questions: string
    url_key: string
    created_at: string
}

export interface QuestionsMeta {
    next_cursor: string
    prev_cursor: string
}

export interface IdResponse {
    id: string
}

// FindQuestionsBySlug
export interface FindQuestionsBySlug {
    data: QuestionsData
}

// FindQuestionsByUserId
export interface FindQuestionsByUserIdResponse extends StatusMessageResponse {
    data: QuestionsData[]
    meta: QuestionsMeta
}

export interface CreateQuestionResponse extends StatusMessageResponse {
    data: IdResponse
    description?: string
}