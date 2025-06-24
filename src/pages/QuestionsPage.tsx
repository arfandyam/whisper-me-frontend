import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Copy, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import { findQuestionsByKeyword, findQuestionsByUserId } from "@/api/questions/questions"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "@/lib/utils"
import CreateQuestionModal from "./CreateQuestionModal";
import { checkSession } from "@/api/sessions/session";
import { User } from "@/types/interface/auth-provider";
import { Input } from "@/components/ui/input";

export default function Questions() {
  const navigate = useNavigate();
  const [cursor, setCursor] = useState<string | null>(null);
  const [rank, setRank] = useState<number | undefined>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  // const keyword = useRef<HTMLInputElement>(null);

  let user: User | null = JSON.parse(localStorage.getItem("user") || "null");
  if (user == null) {
    navigate("/");
  }

  const { data: questions, isLoading, error } = useQuery(
    ["questions", user?.id, cursor, rank, keyword],
    async () => {
      user = await checkSession(user);
      if (keyword != "") {
        return findQuestionsByKeyword(keyword, cursor, rank)
      }
      return findQuestionsByUserId(cursor)
    },
    {
      enabled: !!user?.id || !!cursor || !!keyword || !!rank,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  console.log("keyword", keyword)
  const refreshData = async () => {
    setKeyword(searchInput);
    setCursor(null);
    setRank(undefined);
  };

  // let prev: string | number | null = null, next: string | number | null = null
  // if (questions?.meta){
  //   prev = "prev_cursor" in questions.meta ? questions.meta.prev_cursor : questions.meta.prev_rank
  //   next = "next_cursor" in questions.meta ? questions.meta.next_cursor : questions.meta.next_rank
  // }

  // console.log("prev", prev)
  // console.log("next", next)
  console.log("cursor", cursor)
  console.log("rank", rank)

  return (
    <div className="h-screen bg-beige relative">
      <img src="../src/assets/bg-questions.png" alt="Jumbotron Background" className="fixed top-0 left-0 w-full h-full object-cover" />
      <div className="relative">
        <div className="mx-auto">
          <h2 className="text-4xl font-bold text-center pb-5 pt-5">My Questions</h2>
          <div className="w-[200px] border-t-[4px] border-navy mx-auto"></div>
        </div>
        <div className="bg-white mt-4 border-2 p-5 mb-4 rounded-lg shadow-md flex-col flex w-10/12 mx-auto">
          <div className="flex justify-between mt-3 relative items-center mb-3">
            <div className="relative w-full max-w-xs">
              <Input
                className="pr-10" // Adds right padding so text doesn't overlap the icon
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button
                variant="ghost"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent hover:bg-gray-200 p-2 rounded-full"
                onClick={() => refreshData()}
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
            {/* <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input className="max-w-xs" /> */}
            <CreateQuestionModal />
          </div>
          {questions ? (
            <div>
              {questions.data.map((question) => (
                <div className="bg-white mt-4 border-2 mx-auto p-4 mb-4 rounded-lg shadow-md">
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
                      <Button variant="outline" className="bg-navy text-white hover:bg-navy hover:text-white" onClick={() => navigate(`/question/${question.id}`)}>Open</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <div className="flex justify-between mt-3 relative items-center p-4">
            {questions?.meta.prev_cursor ? (
              <Button size="sm" className="absolute left-0 px-3 text-black bg-white border-2 hover:bg-beige"
                onClick={() => {
                  setCursor(questions.meta.prev_cursor);
                  setRank(questions.meta.prev_rank)
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            ) : null}
            {questions?.meta.next_cursor ? (
              <Button size="sm" className="absolute right-0 px-3 text-black bg-white border-2 hover:bg-beige"
                onClick={() => {
                  setCursor(questions.meta.next_cursor);
                  setRank(questions.meta.next_rank)
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