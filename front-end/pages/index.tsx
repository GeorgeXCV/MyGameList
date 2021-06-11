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

export default function Home ({ popularGames, popularUpcomingGames }) {
  const colour = useColorModeValue("red.500", "white")
  return (
    <div className={styles.container}>
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
        <LoginForm handleLogin={console.log('test')} />
        <SignUpForm handleSignUp={console.log('test')} />
        <DarkModeSwitch />
      </HStack>
     <GameGrid title={"Popular Right Now"} games={popularGames}/>
     <GameGrid title={"Popular Upcoming"} games={popularUpcomingGames}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const popularGames = await (await fetch(`${process.env.host}popular`)).json();
  const popularUpcomingGames = await (await fetch(`${process.env.host}popular-upcoming`)).json();
  return { props: { popularGames, popularUpcomingGames} }
}
