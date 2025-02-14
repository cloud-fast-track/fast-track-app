import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { BookMarked, CircleUser, HomeIcon, Menu, Search } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import auth from '../../lib/auth'

import { PROJECT_NAME } from '@/app/constants'
import { ThemeToggle } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { GitHubLogoIcon, LightningBoltIcon } from '@radix-ui/react-icons'
import {
  SignInWithGitHubButton,
  SignOutWithGitHubButton
} from '../ui/auth-button'

export async function FastTrackLayout({
  children,
  search
}: {
  children: React.ReactNode
  search?: boolean
}) {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  const requests = [
    {
      name: 'Home',
      icon: HomeIcon,
      href: '/'
    },
    {
      name: 'Projects',
      icon: LightningBoltIcon,
      href: '/projects'
    },
    {
      name: 'Repositories',
      icon: BookMarked,
      href: '/repos'
    }
  ]

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <GitHubLogoIcon className="h-6 w-6" />
              <span className="">{PROJECT_NAME}</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {requests.map((request) => (
                <Link
                  key={`sidebar-${request.name}`}
                  href={request.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <request.icon className="h-4 w-4" />
                  {request.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Need help?</CardTitle>
                <CardDescription>
                  Fill out a support request and we'll get back to you as soon.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  New support request
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {requests.map((request) => (
                  <Link
                    key={`mobile-sidebar-${request.name}`}
                    href={request.href}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                    <request.icon className="h-4 w-4" />
                    {request.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Need help!?</CardTitle>
                    <CardDescription>
                      Fill out a support request and we'll get back to you as
                      soon.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      New support request
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {search && (
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {session?.user ? (
                  <Avatar className="ring-input ring-2">
                    <AvatarImage src={session.user.image || undefined} />
                  </Avatar>
                ) : (
                  <CircleUser className="h-5 w-5" />
                )}

                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {session?.user ? (
                <>
                  <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignOutWithGitHubButton className="w-full" />
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <SignInWithGitHubButton />
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </header>
        {children}
      </div>
    </div>
  )
}
