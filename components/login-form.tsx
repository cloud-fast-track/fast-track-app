import { PROJECT_NAME } from '@/app/constants'
import { ProjectIcon } from '@/components/icons'
import { cn } from '@/lib/utils'
import { SignInWithGitHubButton } from './ui/auth-button'

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <ProjectIcon className="size-6" />
              </div>
              <span className="sr-only">{PROJECT_NAME}</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to {PROJECT_NAME}</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <a
                href="https://github.com/signup"
                className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <SignInWithGitHubButton />
          </div>
        </div>
      </form>
    </div>
  )
}
