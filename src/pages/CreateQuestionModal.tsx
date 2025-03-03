import { createQuestion } from "@/api/questions/questions";
import { checkSession } from "@/api/sessions/session";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CreateQuestionBodyValidator, TCreateQuestionBodyValidator } from "@/lib/validators/create_question_body";
import { User } from "@/types/interface/auth-provider";
import { CreateQuestionInterface } from "@/types/interface/questions/payload-types";
import { CreateQuestionResponse } from "@/types/interface/questions/response-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CreateQuestionModal() {
  // const { user, checkSession } = useAuth();
  let user: User | null = JSON.parse(localStorage.getItem("user") || "null")
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TCreateQuestionBodyValidator>({
    resolver: zodResolver(CreateQuestionBodyValidator),
  });

  async function CreateQuestion({
    topic,
    question
  }: CreateQuestionInterface) {
    user = await checkSession(user);
    const response = await createQuestion({ topic, question });
    const questionResponse: CreateQuestionResponse = await response.json();
    if (response.status == 201) {
      navigate(0);
    } else if (response.status == 400) {
      console.error(`Failed to create question. message: ${questionResponse.message}`);
    }
  }

  return (
    <div className="flex justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-navy text-white right-0"><Plus className="mr-3" />Create New Question</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Question</DialogTitle>
            <DialogDescription>
              Share your link and anyone will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(CreateQuestion)}>
            <div className="grid flex-1 gap-2">
              <Label>Topic</Label>
              <Input
                {...register("topic")}
                type="input"
                className={cn("flex-row", {
                  "focus-visible:ring-red-500": errors.topic
                })}
                placeholder="Type your topic here."
              />
            </div>
            <div className="grid flex-1 gap-2 mt-2">
              <Label>Question</Label>
              <Textarea
                {...register("question")}
                className={cn("flex-row", {
                  "focus-visible:ring-red-500": errors.question
                })}
                placeholder="Type your message here."
              />
            </div>
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-dark-orange hover:dark-dark-orange" variant="secondary">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}