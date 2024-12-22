import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { AuthBodyValidator, TAuthBodyValidator } from "@/lib/validators/account_auth_body"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"

export default function SignIn() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAuthBodyValidator>({
    resolver: zodResolver(AuthBodyValidator),
  })

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center mx-auto">
            <p className="mr-2 text-2xl font-bold">WhisperMe</p>
            <p className="text-5xl text-navy">!</p>
          </CardTitle>
          <CardDescription className="text-center">Log in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                className={cn("flex-row", {
                  "focus-visible:ring-red-500": errors.password
                })}
                placeholder="Email"
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
                Login
            </Button>
            </div>
            <div className="flex items-center">
              <hr className="flex-grow border-t border-green-300" />
              <span className="px-3 text-green-500">
                <CardDescription className="text-center">or</CardDescription>
              </span>
              <hr className="flex-grow border-t border-green-300" />
            </div>
            <Button variant="outline" className="w-11/12 border-2 text-left mr-0"><img src="../src/assets/google.png" className="w-5 mr-3" alt="" />Sign In With Google</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}