export interface CreateQuestionInterface {
    topic: string
    question: string
}

export interface EditQuestionInterface extends CreateQuestionInterface {}