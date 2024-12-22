import { Button } from "@/components/ui/button"
import { Copy } from 'lucide-react'

export default function DetailThread() {
  return (
    <div className="h-screen mt-[60px] bg-beige relative">
      <img src="../src/assets/bg-questions.png" alt="Jumbotron Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative">
        <div className="flex-col flex w-max w-8/12 mx-auto">
          <div>
            <div className="bg-white mt-4 border-2 mx-auto p-2 mb-4 rounded-lg shadow-md text-center">
              <div className="mb-3">
                <h2 className="font-bold text-2xl mb-3">What do you think about flat earth?</h2>
                <a href="">https:// blabalabala</a>
                <Button type="submit" size="sm" className="ml-3 px-3 text-black bg-white border-2 hover:text-white">
                  <span className="sr-only">Copy</span>
                  <Copy className="h-4 w-4" />
                </Button>
                <div className="flex justify-between items-end mt-3">
                  <p className="text-black/[0.5]">10 June 2024</p>
                  <p><span className="font-bold">3</span> responders</p>
                </div>
              </div>
            </div>
            <div className="bg-white mt-4 ml-10 border-2 mx-auto p-4 mb-4 rounded-lg shadow-md">
              <div className="mb-3">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur corporis praesentium porro omnis ullam, deserunt, qui ratione illum aperiam eum quas sit consequuntur, quidem debitis iusto aliquam facere nostrum provident.</p>
                <div className="flex justify-between items-end mt-3">
                  <p className="text-black/[0.5]">10 June 2024</p>
                </div>
              </div>
            </div>
            <div className="bg-white mt-4 ml-10 border-2 mx-auto p-4 mb-4 rounded-lg shadow-md">
              <div className="mb-3">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur corporis praesentium porro omnis ullam, deserunt, qui ratione illum aperiam eum quas sit consequuntur, quidem debitis iusto aliquam facere nostrum provident.</p>
                <div className="flex justify-between items-end mt-3">
                  <p className="text-black/[0.5]">10 June 2024</p>
                </div>
              </div>
            </div>
            <div className="bg-white mt-4 ml-10 border-2 mx-auto p-4 mb-4 rounded-lg shadow-md">
              <div className="mb-3">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur corporis praesentium porro omnis ullam, deserunt, qui ratione illum aperiam eum quas sit consequuntur, quidem debitis iusto aliquam facere nostrum provident.</p>
                <div className="flex justify-between items-end mt-3">
                  <p className="text-black/[0.5]">10 June 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}