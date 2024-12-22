import {
  MessageSquareText,
  KeyRound,
  Pointer,
  Users,
  Facebook,
  Twitter,
  Instagram,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: false,
      mirror: true
    });
  }, []);
  return (
    <>
      {/* Jumbotron */}
      <div className="relative w-full h-[700px] overflow-hidden-lg">
        <img src="../src/assets/bg-jumbotron-4.png" alt="Jumbotron Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-center p-8 text-center">
          <div className="space-y-3">
            <div className="flex justify-center items-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mr-3">WhisperMe</h1>
              <h1 className="text-8xl font-bold mr-3 text-navy animate-pulse">!</h1>
            </div>
            <p className="text-lg text-white md:text-xl">
              "Create Your Space, Share Your Link – Experience the Freedom of Anonymous Feedback!"
            </p>
          </div>
        </div>
      </div>

      {/* Why WhisperMe? */}
      <div data-aos="zoom-in-up">
        <div className="mx-auto">
          <h2 className="text-4xl font-bold text-center pb-5">Why Use WhisperMe ?</h2>
          <div className="w-[200px] border-t-[4px] border-navy mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-10">
          <div className="flex flex-col justify-center items-center text-center mb-10">
            <div className="flex bg-dark-orange rounded-full items-center size-16 justify-center mb-3 place-self-center">
              <MessageSquareText color="white" size={30} className="" />
            </div>
            <h6 className="font-bold text-xl">Receive Honest Feedback</h6>
            <p className="m-2 text-lg">Get genuine insights and opinions without biases.</p>
          </div>
          <div className="flex flex-col justify-center items-center text-center mb-10">
            <div className="flex bg-dark-orange rounded-full items-center size-16 justify-center mb-3">
              <KeyRound color="white" size={30} className="" />
            </div>
            <h6 className="font-bold text-xl">Maintain Privacy</h6>
            <p className="m-2 text-lg">Your responders stay anonymous, ensuring their complete privacy.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <div className="flex bg-dark-orange rounded-full items-center size-16 justify-center mb-3">
              <Pointer color="white" size={30} className="" />
            </div>
            <h6 className="font-bold text-xl">Simple to Use</h6>
            <p className="m-2 text-lg">Create a link in seconds, share it, and start receiving messages.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <div className="flex bg-dark-orange rounded-full items-center size-16 justify-center mb-3">
              <Users color="white" size={30} className="" />
            </div>
            <h6 className="font-bold text-xl">No Sign-Up Needed for Responders</h6>
            <p className="m-2 text-lg">Anyone with your link can message you without the hassle of creating an account.
            </p>
          </div>
        </div>
      </div>

      {/* Get Your Premium */}
      <div className="relative w-full h-[600px] overflow-hidden-lg mt-10">
        <img src="../src/assets/bg-premium-plan-2.png" alt="Jumbotron Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute mx-auto w-full pt-5">
          <div className="mx-auto">
            <h2 data-aos="zoom-in" className="text-4xl font-bold text-center pb-5">Choose Your WhisperMe! Experience</h2>
            <div className="w-[200px] border-t-[4px] border-dark-orange mx-auto"></div>
          </div>
          <div className="flex justify-center items-center mt-10">
            <Card data-aos="flip-left" className="w-[350px] h-[300px] shadow-2xl">
              <CardHeader>
                <CardTitle>Free Plan</CardTitle>
                <CardContent className="text-center text-5xl font-bold text-navy"><h1>$0</h1></CardContent>
                <CardDescription className="text-black"><p className=""><b>Limited Insight: </b>Access up to 100 responses. Perfect for casual users who want a taste of anonymous feedback.</p></CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Button className="bg-navy hover:bg-navyy">Try Now!</Button>
              </CardFooter>
            </Card>
            <Card data-aos="flip-right" className="w-[350px] h-[340px] shadow-2xl bg-peach">
              <CardHeader>
                <CardTitle>Premium Plan</CardTitle>
                <CardContent className="text-center text-5xl font-bold text-navy"><h1>$10</h1></CardContent>
                <CardDescription className="text-black"> <p><b>Unlimited Responses: </b>Dive deep with unlimited responses. Ideal for those who seek extensive interactions and full insights without boundaries.</p></CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Button className="bg-navy hover:bg-navy">Try Now!</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 h-[250px] mt-[20px]">
        <div className="container mx-auto flex flex-wrap justify-between">
          <div className="flex items-center">
            <h6 className="font-bold text-3xl">WhisperMe</h6>
            <h6 className="font-bold text-6xl text-navy">!</h6>
          </div>
          <div>
            <h6 className="font-bold">Why Us</h6>
            <div className="border-t-[3px] w-10 border-navy"></div>
            <div className="pt-3">
              <p className="pb-3">Receive Honest Feedback</p>
              <p className="pb-3">Maintain Privacy</p>
              <p className="pb-3">Simple to Use</p>
              <p>No Sign-Up Needed for Responders</p>
            </div>
          </div>
          <div>
            <h6 className="font-bold">Follow Us</h6>
            <div className="border-t-[3px] w-10 border-navy"></div>
            <div className="pt-4">
              <div className="flex bg-dark-orange rounded-full items-center size-[45px] justify-center mb-3">
                <Facebook color="white" size={30} className="" />
              </div>
              <div className="flex bg-dark-orange rounded-full items-center size-[45px] justify-center mb-3">
                <Instagram color="white" size={30} className="" />
              </div>
              <div className="flex bg-dark-orange rounded-full items-center size-[45px] justify-center mb-3">
                <Twitter color="white" size={30} className="" />
              </div>

            </div>
          </div>
          <div>
            <h6 className="font-bold">Quick Links</h6>
            <div className="border-t-[3px] w-10 border-navy"></div>
            <div className="pt-3">
              <p className="pb-3"><a href="/">Home</a></p>
              <p className="pb-3"><a href="/">SignIn</a></p>
              <p className="pb-3"><a href="/">SignUp</a></p>
            </div>
          </div>
        </div>
        <div className="text-center mt-[50px] border-t-2 border-dark-orange pt-2 pb-3">
          © 2024 WhisperMe. All rights reserved.
        </div>
      </footer>
    </>
  )
}