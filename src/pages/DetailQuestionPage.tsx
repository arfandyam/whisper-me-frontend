import { findAnswersByQuestionId } from "@/api/answers/answers";
import { findQuestionsById } from "@/api/questions/questions";
import { checkSession } from "@/api/sessions/session";
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils";
import { User } from "@/types/interface/auth-provider";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react'
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditQuestionModal from "./EditQuestionModal";

export default function DetailQuestion() {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [cursor, setCursor] = useState<string | null>(null);

  // Get user session
  let user: User | null = JSON.parse(localStorage.getItem("user") || "null");
  if (user == null) {
    navigate("/");
  }

  console.log("user detail question", user);

  const { data: question, isLoading: questionLoading, error: questionError, refetch: questionRefetch } = useQuery(
    ["question", user?.id, questionId],
    async () => {
      user = await checkSession(user);
      return findQuestionsById(questionId);
    },
    {
      enabled: !!user?.id && !!questionId,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )

  console.log("question", question)

  const { data: answers, isLoading: answerLoading, error: answerError, refetch: answerRefetch } = useQuery(
    ["answers", user?.id, questionId, cursor],
    async () => {
      user = await checkSession(user);
      return findAnswersByQuestionId(questionId, cursor);
    },
    {
      enabled: !!user?.id && !!questionId,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )

  const refreshData = async () => {
    answerRefetch();
  };

  console.log("answers", answers)

  if (questionLoading || answerLoading) {
    return <div>Loading...</div>
  }

  if (questionError instanceof Error) return <div>Error: Question Error {questionError.message}</div>;
  if (answerError instanceof Error) return <div>Error: Answer Error {answerError.message}</div>;
  return (
    <div className="h-screen bg-beige relative">
      <img src="../src/assets/bg-questions.png" alt="Jumbotron Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative">
        <div className="flex-col flex mx-auto">
          <div>
            {question ? (
              <>
                <div className="bg-white w-10/12 mt-4 border-2 mx-auto p-2 mb-4 rounded-lg shadow-md text-center">
                  <EditQuestionModal
                    questionRefetch={questionRefetch}
                    questionIdProp={question.data.id}
                    topicProp={question.data.topic}
                    questionProp={question.data.question}
                  />
                  <div className="mb-3">
                    <h2 className="font-bold text-2xl mb-3">{question?.data.topic}</h2>
                    <p className="mb-3">{question?.data.question}</p>
                    <a href={`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/q/${question?.data.url_key}`}>{`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/q/${question?.data.url_key}`}</a>
                    <Button type="submit" size="sm" className="ml-3 px-3 text-black bg-white border-2 hover:text-white"
                      onClick={async () => await navigator.clipboard.writeText(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/q/${question?.data.url_key}`)}
                    >
                      <span className="sr-only">Copy</span>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <div className="flex justify-between items-end mt-3">
                      <p className="text-black/[0.5]">{formatDate(question.data.created_at)}</p>
                      <p><span className="font-bold">{answers?.data.length}</span> responders</p>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {answers?.data.map((answer) => (
              <div className="bg-white mt-4 border-2 w-8/12 mx-auto p-4 mb-4 rounded-lg shadow-md">
                <div className="mb-3">
                  <p>{answer.response}</p>
                  <div className="flex justify-between items-end mt-3">
                    <p className="text-black/[0.5]">{formatDate(answer.created_at)}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="relative items-center mx-auto p-4 w-8/12">
              {answers?.meta.prev_cursor ? (
                <Button size="sm" className="absolute left-0 px-3 text-black bg-white border-2 hover:bg-beige"
                  onClick={() => {
                    setCursor(answers.meta.prev_cursor);
                    refreshData();
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              ) : null}
              {answers?.meta.next_cursor ? (
                <Button size="sm" className="absolute right-0 px-3 text-black bg-white border-2 hover:bg-beige"
                  onClick={() => {
                    setCursor(answers.meta.next_cursor);
                    refreshData();
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}