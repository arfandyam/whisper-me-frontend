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
import { UserRegistrationBodyValidator, TUserRegistrationBodyValidator } from "@/lib/validators/account_register_body"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { AuthUser } from "@/types/interface/payload-types"
import { useNavigate } from "react-router-dom"

export default function SignUpPage() {
	const navigate = useNavigate()

	async function SignUp({
		email,
		password
	}: AuthUser) {
		const userData = JSON.stringify({
			email,
			password
		});

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/user`, {
				method: "POST",
				body: userData,
				headers: {
					'Content-Type': 'application/json'
				},
			});

			const user = await response.json()
			console.log("user created:", user)

			if (response.status === 201) {
				navigate('/')
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
	} = useForm<TUserRegistrationBodyValidator>({
		resolver: zodResolver(UserRegistrationBodyValidator),
	})

	return (
		<div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle className="flex items-center mx-auto">
							<p className="mr-2 text-2xl font-bold">WhisperMe</p>
							<p className="text-5xl text-navy">!</p>
						</CardTitle>
						<CardDescription className="text-center">Create your account</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(SignUp)}>
							<div className="grid items-center gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="firstname">Firstname</Label>
									<Input
										{...register("firstname")}
										className={cn("flex-row", {
											"focus-visible:ring-red-500": errors.password
										})}
										placeholder="Firstname"
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="lastname">Lastname</Label>
									<Input
										{...register("lastname")}
										className={cn("flex-row", {
											"focus-visible:ring-red-500": errors.password
										})}
										placeholder="Lastname"
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="username">Username</Label>
									<Input
										{...register("username")}
										className={cn("flex-row", {
											"focus-visible:ring-red-500": errors.password
										})}
										placeholder="Username"
									/>
								</div>
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
										Create Account
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
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}