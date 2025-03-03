import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import { findQuestionsByUserId } from "@/api/questions/questions"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "@/lib/utils"
import CreateQuestionModal from "./CreateQuestionModal";
import { checkSession } from "@/api/sessions/session";
import { User } from "@/types/interface/auth-provider";

export default function Questions() {
  const navigate = useNavigate();
  const [cursor, setCursor] = useState<string | null>(null);

  let user: User | null = JSON.parse(localStorage.getItem("user") || "null");

  const { data: questions, isLoading, error, refetch } = useQuery(
    ["questions", user?.id, cursor],
    async () => {
      user = await checkSession(user);
      return findQuestionsByUserId(user?.id, cursor)
    },
    {
      enabled: !!user?.id,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )

  if (user == null) {
    navigate("/");
  }

  const refreshData = async () => {
    refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-screen bg-beige relative">
      <img src="../src/assets/bg-questions.png" alt="Jumbotron Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative">
        <div className="mx-auto">
          <h2 className="text-4xl font-bold text-center pb-5 pt-5">My Questions</h2>
          <div className="w-[200px] border-t-[4px] border-navy mx-auto"></div>
        </div>
        <div className="flex-col flex w-8/12 mx-auto">
          <CreateQuestionModal/>
          {questions ? (
            <div>
              {questions.data.map((question) => (
                <div className="bg-white mt-4 border-2 mx-auto p-2 mb-4 rounded-lg shadow-md">
                  <div className="mb-3">
                    <h2 className="font-bold text-2xl mb-3">{question.topic}</h2>
                    <p className="mb-3">{question.question}</p>
                    <a href={`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/q/${question.url_key}`}>{`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/q/${question.url_key}`}</a>
                    <Button size="sm" className="ml-3 px-3 text-black bg-white border-2 hover:text-white"
                      onClick={async () => await navigator.clipboard.writeText(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/q/${question.url_key}`)}
                    >
                      <span className="sr-only">Copy</span>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <div className="flex justify-between items-end mt-3">
                      <p className="text-black/[0.5]">{formatDate(question.created_at)}</p>
                      <Button variant="outline" className="bg-navy text-white hover:bg-navy hover:text-white" onClick={() => navigate(`/q/${question.slug}`)}>Open</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <div className="relative items-center p-4">
            {questions?.meta.prev_cursor ? (
              <Button size="sm" className="absolute left-0 px-3 text-black bg-white border-2 hover:bg-beige"
                onClick={() => {
                  setCursor(questions.meta.prev_cursor);
                  refreshData();
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            ) : null}
            {questions?.meta.next_cursor ? (
              <Button size="sm" className="absolute right-0 px-3 text-black bg-white border-2 hover:bg-beige"
                onClick={() => {
                  setCursor(questions.meta.next_cursor);
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
  )
}