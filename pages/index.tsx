import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Goodnews of Christ Baptist Church</title>
        <meta name="description" content="Official Website of Goodnews of Christ Baptist Church, Awka." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Love, <span className={styles.strokeme}>Faith and Freedom</span>
        </h1>
        <h1>Goodnews of Christ Baptist Church</h1>
      </main>
    </div>
  )
}

export default Home
