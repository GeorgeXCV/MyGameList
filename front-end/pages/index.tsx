import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MyGameList</title>
        <meta name="description" content="Track games you are currently playing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          MyGameList
        </h1>

        <button>Sign Up</button>
        <button>Login</button>
       <h2>Most Popular Games Right Now</h2> {/* Sort by most increase in players within short time period e.g. 24H-7D */}
       <h2>Recently Released</h2> 
       <h2>Upcoming</h2> 

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
