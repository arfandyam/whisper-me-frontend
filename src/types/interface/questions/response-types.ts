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

export interface FindQuestionsByUserIdResponse {
    status: string
    message: string
    data: QuestionsData[]
    meta: QuestionsMeta
}