import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-500 to-blue-600">
      {/* Main content container with rounded corners */}
      <div className="m-auto w-full max-w-6xl overflow-hidden rounded-[40px] bg-white shadow-lg dark:bg-slate-900 flex">
        {/* Navigation bar */}
        <div className="absolute w-full p-6">
          <nav className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="text-xl font-semibold text-white">YOURLOGO</div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#" className="text-white/80 hover:text-white">Home</a>
              <a href="#" className="text-white/80 hover:text-white">About</a>
              <a href="#" className="text-white/80 hover:text-white">FAQs</a>
              <a href="#" className="text-white/80 hover:text-white">Blog</a>
              <a href="#" className="text-white/80 hover:text-white">Contact</a>
            </div>
          </nav>
        </div>

        {/* Landing Page Content */}
        <div className="flex flex-col p-12 md:p-20 w-full bg-white/5 backdrop-blur-lg text-white">
          <div className="mt-16 md:mt-20 mb-auto">
            <h1 className="text-5xl font-bold mb-6">Landing Page</h1>
            <p className="mb-10 max-w-lg text-white/80 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <Button 
              className="bg-white hover:bg-white/90 text-blue-700 font-medium rounded-lg py-2 px-8"
            >
              SIGN IN
            </Button>
          </div>

          <div className="mt-20 text-sm text-white/50 text-center">
            designed by <span className="text-white">freepik</span>
          </div>
        </div>
      </div>
    </div>
  )
}
