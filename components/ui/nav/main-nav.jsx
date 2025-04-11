"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from './mode-toggle'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'

const MainNav = () => {
  // Специальный User хук Clerk-а
  const { isSignedIn, user } = useUser() // Проверяем,залогинился ли User
  return (
    <nav className= "flex justify-between items-center p-1 shadow top-nav">
        <Link href="/logo.svg">
        <Image 
        src="/logo.svg" alt="logo" width={50} height={50}
        />
        </Link>

        <Toaster />

        <div className="flex justify-end items-center gap-2">
          {isSignedIn && (<Link href="/dashboard">{user?.fullName}'s' Dashboard</Link>)} 
        <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

        <ModeToggle />
        </div>
    </nav>
  )
}

export default MainNav
