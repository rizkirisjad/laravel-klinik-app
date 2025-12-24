import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const page = usePage();
    return (
        <>
            {groups.map((group) => (
                <SidebarGroup key={group.label} className="px-2 py-0">
                    <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

                    <SidebarMenu>
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={page.url.startsWith(
                                        resolveUrl(item.href),
                                    )}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>

        // <SidebarGroup className="px-2 py-0">
        //     <SidebarGroupLabel>Platform</SidebarGroupLabel>
        //     <SidebarMenu>
        //         {items.map((item) => (
        //             <SidebarMenuItem key={item.title}>
        //                 <SidebarMenuButton
        //                     asChild
        //                     isActive={page.url.startsWith(
        //                         resolveUrl(item.href),
        //                     )}
        //                     tooltip={{ children: item.title }}
        //                 >
        //                     <Link href={item.href} prefetch>
        //                         {item.icon && <item.icon />}
        //                         <span>{item.title}</span>
        //                     </Link>
        //                 </SidebarMenuButton>
        //             </SidebarMenuItem>
        //         ))}
        //     </SidebarMenu>
        // </SidebarGroup>
    );
}
