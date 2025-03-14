import { createAnswer } from "@/api/answers/answers";
import { findQuestionsBySlug } from "@/api/questions/questions";
import { findUserById } from "@/api/user/user";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils";
import { CreateAnswerBodyValidator, TCreateAnswerBodyValidator } from "@/lib/validators/answers/answer";
import { CreateAnswerInterface } from "@/types/interface/answers/payload-types";
import { CreateAnswer } from "@/types/interface/answers/response-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"

export default function AddResponse() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data: question, isLoading: questionLoading, error: questionError } = useQuery(
    ["question", slug],
    async () => {
      return findQuestionsBySlug(slug);
    },
    {
      enabled: !!slug,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )

  const { data: user, isLoading: userLoading, error: userError } = useQuery(
    ["user", question?.data.user_id, question?.data.id],
    async () => {
      return findUserById(question?.data.user_id);
    },
    {
      enabled: !!question?.data.user_id && !!question?.data.id,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )

  const { register, handleSubmit, formState: { errors } } = useForm<TCreateAnswerBodyValidator>({
    resolver: zodResolver(CreateAnswerBodyValidator),
  });

  async function CreateAnswer({
    response
  }: CreateAnswerInterface) {
    const answerResponse = await createAnswer(response, question?.data.id)
    const answerData: CreateAnswer = await answerResponse.json();

    if (answerResponse.status == 201) {
      navigate("/")
    } else if (answerResponse.status != 201) {
      console.error(`Failed to create question. message: ${answerData.message}`)
    }
  }

  if (questionLoading || userLoading) {
    return <div>Loading...</div>
  }

  if (questionError instanceof Error) return <div>Error: Question Error {questionError.message}</div>;
  if (userError instanceof Error) return <div>Error: Question Error {userError.message}</div>;
  return (
    <div className="h-screen bg-beige relative mb-5">
      <img src="/bg-questions.png" alt="Jumbotron Background" className="fixed top-0 left-0 w-full h-full object-cover" />
      <div className="relative mt-5">
        <Card className="w-[500px] mx-auto">
          <CardHeader>
            <CardTitle><span className="font-bold">Hey, {user?.data.first_name} {user?.data.last_name}</span> ask you...</CardTitle>
            <p className="font-semibold">{question?.data.topic}</p>
            <p className="mb-3">{question?.data.question}</p>
          </CardHeader>
          <form onSubmit={handleSubmit(CreateAnswer)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Textarea
                    className={cn("h-32 border-peach border-[3px]", {
                      "focus-visible:ring-red-500": errors.response
                    })}
                    placeholder="Type your message here."
                    {...register("response")}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Submit</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div >
  )
}