import { LoginForm } from '@/components/login-form'

export const metadata = {
  title: 'Sign In'
}

export default async function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
