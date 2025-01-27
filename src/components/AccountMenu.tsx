import { Button } from "./ui/button";
import { User } from "@/types/interface/auth-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CircleUserRound, ClipboardList, LogOut } from "lucide-react";
import { useAuth } from "@/AuthProvider";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "@/types/interface/payload-types";
import { logOut } from "@/api/sessions/session"

interface AccountMenuProps {
  user: User | null
}

export default function AccountMenu({ user }: AccountMenuProps) {
  const navigate = useNavigate();
  const { setLogOutSession } = useAuth();

  async function SignOut({ refreshToken }: LogoutUser) {
    try {
      const response = await logOut(refreshToken);

      if (response.status == 200) {
        setLogOutSession()
        navigate("/")
      } else {
        console.error("Failed to logout")
      }
    } catch (e) {
      console.error('Error:', e);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <a href="#">Profile</a>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Welcome, {user?.firstName} {user?.lastName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <CircleUserRound className="mr-2 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ClipboardList className="mr-2 h-4 w-4" />
              <a href="/questions">Questions</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <Button variant="outline" onClick={() => SignOut({ refreshToken: user?.refreshToken })}>Log Out</Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}