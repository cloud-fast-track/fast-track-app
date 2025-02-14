'use client'

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  SquareTerminal
} from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/components/nav-main'
import { NavProjects } from '@/components/nav-projects'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free'
    }
  ],
  navMain: [
    {
      title: 'Projects',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Create New',
          url: '/projects/new'
        },
        {
          title: 'View All',
          url: '/projects'
        }
      ]
    }
    // {
    //   title: 'Repositories',
    //   url: '#',
    //   icon: BookDashed,
    //   isActive: true,
    //   items: [
    //     {
    //       title: 'Create New',
    //       url: '/repos/new'
    //     },
    //     {
    //       title: 'View All',
    //       url: '/repos'
    //     }
    //   ]
    // },
    // {
    //   title: 'Documentation',
    //   url: '#',
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: 'Introduction',
    //       url: '#'
    //     },
    //     {
    //       title: 'Get Started',
    //       url: '#'
    //     },
    //     {
    //       title: 'Tutorials',
    //       url: '#'
    //     },
    //     {
    //       title: 'Changelog',
    //       url: '#'
    //     }
    //   ]
    // },
    // {
    //   title: 'Settings',
    //   url: '#',
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: 'General',
    //       url: '#'
    //     },
    //     {
    //       title: 'Team',
    //       url: '#'
    //     },
    //     {
    //       title: 'Billing',
    //       url: '#'
    //     },
    //     {
    //       title: 'Limits',
    //       url: '#'
    //     }
    //   ]
    // }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>{isClient ? <NavUser /> : null}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
