import { editQuestion } from "@/api/questions/questions";
import { checkSession } from "@/api/sessions/session";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { EditQuestionBodyValidator, TEditQuestionBodyValidator } from "@/lib/validators/questions/question";
import { User } from "@/types/interface/auth-provider";
import { EditQuestionInterface } from "@/types/interface/questions/payload-types";
import { EditQuestionResponse } from "@/types/interface/questions/response-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface EditQuestionModalProps {
  questionIdProp: string
  topicProp: string
  questionProp: string
}

export default function EditQuestionModal(props: EditQuestionModalProps) {
  const { questionIdProp, topicProp, questionProp } = props;
  let user: User | null = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TEditQuestionBodyValidator>({
    resolver: zodResolver(EditQuestionBodyValidator),
  });

  const [topic, setTopic] = useState<string>(topicProp);
  const [question, setQuestion] = useState<string>(questionProp);

  async function EditQuestion({
    topic,
    question
  }: EditQuestionInterface) {
    user = await checkSession(user);
    const response = await editQuestion({ topic, question }, questionIdProp);
    const editQuestionResponse: EditQuestionResponse = await response.json();
    if (response.status == 200) {
      navigate(`/q/${editQuestionResponse.data.slug}`);
    } else if (response.status == 400) {
      console.error(`Failed to create question. message: ${editQuestionResponse.message}`);
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-navy text-white right-0"><Pencil className="mr-3" />Edit Question</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Question</DialogTitle>
              <DialogDescription>
                Share your link and anyone will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(EditQuestion)}>
              <div className="grid flex-1 gap-2">
                <Label>Topic</Label>
                <Input
                  {...register("topic")}
                  type="input"
                  value={topic}
                  className={cn("flex-row", {
                    "focus-visible:ring-red-500": errors.topic
                  })}
                  placeholder="Type your topic here."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
                />
              </div>
              <div className="grid flex-1 gap-2 mt-2">
                <Label>Question</Label>
                <Textarea
                  {...register("question")}
                  value={question}
                  className={cn("flex-row", {
                    "focus-visible:ring-red-500": errors.question
                  })}
                  placeholder="Type your message here."
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
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
    </>
  )
}