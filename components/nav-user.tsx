'use client'

import { Bug, BugOff, LogOut } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { useSession } from '@/lib/auth-client'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { ThemeToggle } from './theme-switcher'
import { SignOutWithGitHubButton } from './ui/auth-button'

export function NavUser() {
  const { isMobile, debugMode, setDebugMode } = useSidebar()
  const { data: session, isPending, error } = useSession()

  let user

  if (isPending) {
    return <>Loading</>
  }

  if (error) {
    return <>Error Loading user information</>
  }

  if (session) {
    user = session?.user
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              {user && (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.image as string} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>{' '}
                </>
              )}
              <CaretSortIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {user && (
                  <>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.image as string} alt={user.name} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </>
                )}
                <ThemeToggle />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setDebugMode(!debugMode)}>
              {debugMode ? (
                <>
                  <BugOff /> Disable Debug Mode
                </>
              ) : (
                <>
                  <Bug /> Enable Debug Mode
                </>
              )}
            </DropdownMenuItem>
            <SignOutWithGitHubButton
              className="w-full justify-start"
              variant={'ghost'}
              size={'sm'}
              asChild>
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </SignOutWithGitHubButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
