// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { AuthBodyValidator, TAuthBodyValidator } from "@/lib/validators/account_auth_body"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { AuthUser } from "@/types/interface/payload-types"
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CardDescription } from "@/components/ui/card"
import { useAuth } from "@/AuthProvider"
import { mapSignInField } from "@/lib/mapper/account_sign_in"
import { useNavigate } from "react-router-dom"
import { User } from "@/types/interface/auth-provider"

export default function SignIn() {
  const navigate = useNavigate()
  const { setSignInSession } = useAuth();

  async function SignIn({
    username,
    password
  }: AuthUser) {
    const userCredentials = JSON.stringify({
      username,
      password
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/auth`, {
        body: userCredentials,
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
      })

      const { data } = await response.json()
      console.log("data:", data)

      if (response.status == 200) {
        const userInfo: User = mapSignInField(data)
        console.log("userInfo:", userInfo)
        setSignInSession(userInfo)
        navigate("/questions")
      } else {
        console.error('Signup failed');
      }
    } catch (e) {
      console.error('Error:', e);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAuthBodyValidator>({
    resolver: zodResolver(AuthBodyValidator),
  })

  return (
    <>
      <DialogHeader>
        <DialogTitle className='flex items-center mx-auto'>
          <p className="mr-2 text-2xl font-bold">WhisperMe</p>
          <p className="text-5xl text-navy">!</p>
        </DialogTitle>
        <DialogDescription className='text-center'>
          Log in to your account to continue
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(SignIn)}>
        <div className="grid items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register("username")}
              type="input"
              className={cn("flex-row", {
                "focus-visible:ring-red-500": errors.username
              })}
              placeholder="Username"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              type="password"
              className={cn("flex-row", {
                "focus-visible:ring-red-500": errors.password
              })}
              placeholder="Password"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Button
              variant="default"
              className="border-2 text-left">
              Log In
            </Button>
          </div>
        </div>
      </form>
      <div className="flex items-center">
        <hr className="flex-grow border-t border-green-300" />
        <span className="px-3 text-green-500">
          <CardDescription className="text-center">or</CardDescription>
        </span>
        <hr className="flex-grow border-t border-green-300" />
      </div>
      <Button variant="outline" className="border-2 text-left mr-0"><img src="../src/assets/google.png" className="w-5 mr-3" alt="" />Sign Up With Google</Button>
    </>
  )
}