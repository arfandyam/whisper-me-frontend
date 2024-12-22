import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function AddResponse() {
  return (
    <div className="mt-[100px]">
      <img src="../src/assets/bg-questions.png" alt="Jumbotron Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative">
        <h1 className="text-center text-2xl">Give Your Feedback to <span className="font-bold">USER 1</span></h1>
        <div className="w-[500px] mx-auto mt-5">
          <h3 className="font-bold text-xl mb-3">What do you think about flat earth? </h3>
          <Textarea className="h-32 border-peach border-[3px]" placeholder="Type your message here." />
          <div className="flex justify-end">
            <Button className="bg-navy mt-3 hover:bg-navy">Add</Button>
          </div>
        </div>
      </div>
    </div>
  )
}