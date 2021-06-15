import { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { createContext, useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';

export const AuthContext = createContext(null)

export default function App({ Component, pageProps }: AppProps) {
  const [authSubmitted, setAuthSubmitted] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setAuthSubmitted(false)
    const userJSON = window.localStorage.getItem('gameUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    } else {
      setUser(null)
    }
  }, [authSubmitted === true])

  return (
    <ChakraProvider>
     <AuthContext.Provider value={{ setAuthSubmitted }}> 
     <NavigationBar user={user} />
      <Component {...pageProps} />
      </AuthContext.Provider>
    </ChakraProvider>
  )
}