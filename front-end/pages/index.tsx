import { createContext, useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import DarkModeSwitch from '../components/DarkModeSwitch'
import { Text, HStack, Box, useColorModeValue } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import SearchBar from '../components/SearchBar'
import LoginForm from './login'
import SignUpForm from './signup'
import GameGrid from '../components/GameGrid'
import UserMenu from '../components/UserMenu';
import GameListPrompt from '../components/GameListPrompt';

export const AuthContext = createContext(null)

export default function Home ({ popularGames, popularUpcomingGames }) {
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

  const colour = useColorModeValue("red.500", "white")
  return (
    <div className={styles.container}>
    <AuthContext.Provider value={{ setAuthSubmitted }}> 
    <Head>
      <title>MyGameList</title>
      <meta name="description" content="Track games you are currently playing" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <HStack spacing="24px" paddingTop="5">
        <Box w="300px">
        <Text colour={colour} fontSize="4xl">MyGameList</Text>
        </Box>
        <SearchBar />
        {user !== null
          ? 
            <UserMenu user={user.username} />
           
          : <>
            <LoginForm />
            <SignUpForm /> 
            </>  
        }
        <DarkModeSwitch />
      </HStack>
     {user !== null
        ? <GameGrid title={"What To Play"} games={popularGames}/>
        : <GameListPrompt />
     }
     <GameGrid title={"Popular Right Now"} games={popularGames}/>
     <GameGrid title={"Popular Upcoming"} games={popularUpcomingGames}/>
     </AuthContext.Provider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const popularGames = await (await fetch(`${process.env.NEXT_PUBLIC_HOST}popular`)).json();
  const popularUpcomingGames = await (await fetch(`${process.env.NEXT_PUBLIC_HOST}popular-upcoming`)).json();
  return { props: { popularGames, popularUpcomingGames} }
}
