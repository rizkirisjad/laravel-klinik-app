import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { NavGroup } from '@/types';
import { Link } from '@inertiajs/react';
import { ActivitySquare, HeartPulse, Monitor, Users } from 'lucide-react';
import AppLogo from './app-logo';

const navGroups: NavGroup[] = [
    {
        label: 'Application',
        items: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: Monitor,
            },
        ],
    },
    {
        label: 'Master Data',
        items: [
            {
                title: 'Data Pasien',
                href: '/data-pasien',
                icon: Users,
            },
        ],
    },
    {
        label: 'Medical',
        items: [
            {
                title: 'Diagnosa',
                href: '/diagnosa',
                icon: HeartPulse,
            },
            {
                title: 'Rekam Medis',
                href: '/rekam-medis',
                icon: ActivitySquare,
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={navGroups} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
