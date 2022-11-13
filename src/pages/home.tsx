import Head from 'next/head'
import Home from '../components/Home'
import styles from '../styles/Home.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cities | Home</title>
      </Head>
      <Home />
    </div>
  )
}
