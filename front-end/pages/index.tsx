import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetStaticProps } from 'next'
import GameGrid from '../components/GameGrid'
import GameListPrompt from '../components/GameListPrompt';

export default function Home ({ popularGames, popularUpcomingGames }) {
  return (
    <div className={styles.container}>
    <Head>
      <title>MyGameList</title>
      <meta name="description" content="Track games you are currently playing" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
     {/* {user !== null
        ? <GameGrid title={"What To Play"} games={popularGames}/>
        : <GameListPrompt />
     } */}
     <GameGrid title={"Popular Right Now"} games={popularGames}/>
     <GameGrid title={"Popular Upcoming"} games={popularUpcomingGames}/>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const popularGames = await (await fetch(`${process.env.NEXT_PUBLIC_HOST}popular`)).json();
  const popularUpcomingGames = await (await fetch(`${process.env.NEXT_PUBLIC_HOST}popular-upcoming`)).json();
  return { props: { popularGames, popularUpcomingGames} }
}
