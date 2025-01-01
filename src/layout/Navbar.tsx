// components/Navbar.js

import { NavigationMenu, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { useLocation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import SignIn from '@/pages/SignInPage';

const Navbar = () => {
  const location = useLocation();

  // Determine navbar elements based on the current route
  const getNavbarElements = () => {
    if (location.pathname == '/' || location.pathname == "/SignUp") {
      return (
        <>
          {/* Navigation */}
          <NavigationMenu className="fixed left-0 right-0 max-w-full flex justify-between items-center bg-dark-orange text-white">
            <NavigationMenuLink className="">
              <a href="/" className="font-semibold flex items-center">
                <p className="m-2 ml-4 text-xl">WhisperMe</p>
                <p className="text-5xl text-navy">!</p>
              </a>
            </NavigationMenuLink>
            <div className="flex">
              <NavigationMenuLink className="p-5 hover:bg-white/[0.2] hover:text-white hover:font-bold">
                <a href="/">
                  Home
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink className="p-5  hover:bg-white/[0.2] hover:text-white hover:font-bold">
                <Dialog>
                  <DialogTrigger asChild>
                    <a href="#">Sign In</a>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <SignIn />
                  </DialogContent>
                </Dialog>
              </NavigationMenuLink >
            </div>
          </NavigationMenu>
        </>
      );
    } else if (location.pathname == "/AddResponse") {
      return (
        <>
          {/* Navigation */}
          <NavigationMenu className="fixed h-[60px] left-0 right-0 top-0 max-w-full flex justify-between items-center bg-dark-orange text-white">
            <NavigationMenuLink className="">
              <a href="/" className="font-semibold flex items-center">
                <p className="m-2 ml-4 text-xl">WhisperMe</p>
                <p className="text-5xl text-navy">!</p>
              </a>
            </NavigationMenuLink>
          </NavigationMenu>
        </>
      );
    } else {
      return (
        <>
          {/* Navigation */}
          <NavigationMenu className="fixed left-0 right-0 top-0 max-w-full flex justify-between items-center bg-dark-orange text-white">
            <NavigationMenuLink className="">
              <a href="/" className="font-semibold flex items-center">
                <p className="m-2 ml-4 text-xl">WhisperMe</p>
                <p className="text-5xl text-navy">!</p>
              </a>
            </NavigationMenuLink>
            <div className="flex">
              <NavigationMenuLink className="p-5 hover:bg-white/[0.2] hover:text-white hover:font-bold">
                <a href="/">
                  Home
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink className="p-5  hover:bg-white/[0.2] hover:text-white hover:font-bold">
                <a href="/Questions" className="hover:font-bold">
                  Questions
                </a>
              </NavigationMenuLink >
            </div>
          </NavigationMenu>
        </>
      );
    }
  };
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          {getNavbarElements()}
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
