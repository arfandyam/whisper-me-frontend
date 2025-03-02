import { QuestionsMeta } from "../questions/response-types"

export interface AnswersDTO {
    id: string
    question_id: string
    response: string
    created_at: string
}

export interface FindAnswersByQuestionId {
    data: AnswersDTO[]
    meta: QuestionsMeta
}