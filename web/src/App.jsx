import { useState } from 'react' // Fix 1: Added missing useState
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react' // Fix 2: Corrected component names

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello World</h1>

      {/* Shows only when the user is logged OUT */}
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>

      {/* Shows only when the user is logged IN */}
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  )
}

export default App
