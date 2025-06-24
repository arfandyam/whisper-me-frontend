import { QuestionsMeta } from "../questions/response-types"
import { StatusMessageResponse } from "../response-types"

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

export interface FindAnswersByKeyword extends FindAnswersByQuestionId {}

export interface CreateAnswer extends StatusMessageResponse {
    data: AnswersDTO
    description?: string
}