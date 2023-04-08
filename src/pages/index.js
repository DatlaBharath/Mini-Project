import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '../../components/Header'
import LoginCUser from '../../components/LoginCUser'
import LoginRUser from '../../components/LoginRUser'
import LoginOUser from '../../components/LoginOUser'
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  return (
    <div>
      <Header />
      <div className='sm:flex my-32'>
        <LoginCUser />
        <LoginRUser />
        <LoginOUser />
      </div>
    </div>
  )
}