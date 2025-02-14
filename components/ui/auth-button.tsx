'use client'

import { SIGN_IN_ROUTE } from '@/app/constants'
import { Button, type ButtonProps } from '@/components/ui/button'
import { signIn, signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export function SignInWithGitHubButton(props: ButtonProps) {
  const { children = 'Sign In with GitHub' } = props

  const signInHandler = async () => {
    await signIn.social({
      provider: 'github',
      callbackURL: '/'
    })
  }

  console.log(props)

  return <Button {...props} onClick={signInHandler} children={children} />
}

export function SignOutWithGitHubButton(props: ButtonProps) {
  const router = useRouter()

  const { children = 'Sign Out with GitHub' } = props

  const signOutHandler = async () => {
    await signOut().then(() => {
      router.push(SIGN_IN_ROUTE)
    })
  }

  console.log(props)

  return <Button {...props} onClick={signOutHandler} children={children} />
}
