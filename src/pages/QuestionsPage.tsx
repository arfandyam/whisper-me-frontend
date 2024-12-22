import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Plus } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { To, useNavigate } from 'react-router-dom';

export default function Questions() {
  const navigate = useNavigate();

  const handleButtonClick = (path: To) => {
    navigate(path);
  };

  return (
    <div className="h-screen mt-[60px] bg-beige relative">
      <img src="../src/assets/bg-questions.png" alt="Jumbotron Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative">
        <div className="mx-auto">
          <h2 className="text-4xl font-bold text-center pb-5 pt-5">My Questions</h2>
          <div className="w-[200px] border-t-[4px] border-navy mx-auto"></div>
        </div>
        <div className="flex-col flex w-max w-8/12 mx-auto">
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
                <div className="grid flex-1 gap-2">
                  <Textarea placeholder="Type your message here." />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      defaultValue="https://ui.shadcn.com/docs/installation"
                      readOnly
                    />
                  </div>
                  <Button type="submit" size="sm" className="px-3 bg-navy hover:bg-dark-orange hover:text-navy">
                    <span className="sr-only">Copy</span>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <DialogFooter className="sm:justify-between">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <Button type="button" className="bg-dark-orange hover:dark-dark-orange" variant="secondary">
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <div className="bg-white mt-4 border-2 mx-auto p-2 mb-4 rounded-lg shadow-md">
              <div className="mb-3">
                <h2 className="font-bold text-2xl mb-3">What do you think about flat earth?</h2>
                <a href="">https:// blabalabala</a>
                <Button type="submit" size="sm" className="ml-3 px-3 text-black bg-white border-2 hover:text-white">
                  <span className="sr-only">Copy</span>
                  <Copy className="h-4 w-4" />
                </Button>
                <div className="flex justify-between items-end mt-3">
                  <p className="text-black/[0.5]">10 June 2024</p>
                  <Button variant="outline" className="bg-navy text-white hover:bg-navy hover:text-white" onClick={() => handleButtonClick('/DetailQuestion')}>Open</Button>
                </div>
              </div>
            </div>
            <div className="bg-white mt-4 border-2 mx-auto p-2 mb-4 rounded-lg shadow-md">
              <div className="mb-3">
                <h2 className="font-bold text-2xl mb-3">What do you think about flat earth?</h2>
                <a href="">https:// blabalabala</a>
                <Button type="submit" size="sm" className="ml-3 px-3 text-black bg-white border-2 hover:text-white">
                  <span className="sr-only">Copy</span>
                  <Copy className="h-4 w-4" />
                </Button>
                <div className="flex justify-between items-end mt-3">
                  <p className="text-black/[0.5]">10 June 2024</p>
                  <Button variant="outline" className="bg-navy hover:bg-dark-orange hover:text-navy text-white hover:bg-navy hover:text-white" onClick={() => handleButtonClick('/DetailQuestion')}>Open</Button>
                </div>
              </div>
            </div>
            <div className="bg-white mt-4 border-2 mx-auto p-2 mb-4 rounded-lg shadow-md">
              <div className="mb-3">
                <h2 className="font-bold text-2xl mb-3">What do you think about flat earth?</h2>
                <a href="">https:// blabalabala</a>
                <Button type="submit" size="sm" className="ml-3 px-3 text-black bg-white border-2 hover:text-white">
                  <span className="sr-only">Copy</span>
                  <Copy className="h-4 w-4" />
                </Button>
                <div className="flex justify-between items-end mt-3">
                  <p className="text-black/[0.5]">10 June 2024</p>
                  <Button variant="outline" className="bg-navy text-white hover:bg-navy hover:text-white" onClick={() => handleButtonClick('/DetailQuestion')}>Open</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}