"use client";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { menuItems } from "@/lib/navigation/MenuItems";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectRole } from "@/redux/features/auth/authSlice";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";
import { getImageUrl } from "@/utils/imageUrl";
import { baseApi } from "@/redux/api/baseApi";

export function AppSidebar() {
    const pathname = usePathname();
    const role = useAppSelector(selectRole);
    // Default to admin items if role not found or just use admin items for now as requested
    const items = menuItems["admin"]; 
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: myProfile } = useGetUserProfileQuery();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        router.push("/auth/login");
        router.refresh();
    };

    return (
        <Sidebar className="border-r border-sidebar-border bg-sidebar">
            <SidebarContent className="bg-sidebar p-4 h-full flex flex-col justify-between">
                <div>
                    <div className="p-4 pb-8">
                        <Link href="/" className="block">
                            <h1 className="font-serif text-xl text-foreground uppercase tracking-widest">ASCELA ADMIN</h1>
                            <p className="text-xs text-muted-foreground mt-1">Dashboard Control Center</p>
                        </Link>
                    </div>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-2">
                                {items.map((item) => {
                                    const isActive = pathname === item.url;
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild className="h-auto py-1">
                                                <Link href={item.url} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? "bg-primary text-white shadow-md" : "text-foreground hover:bg-white/50"}`}>
                                                    <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-foreground"}`} />
                                                    <span className="font-medium uppercase text-sm tracking-wide">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>
                
                {/* User Profile / Logout */}
                <div className="mt-auto pt-4 border-t border-sidebar-border/50">
                     {/* <div className="flex items-center gap-3 mb-4 px-2">
                        <Image src={getImageUrl(myProfile?.data?.profile) || "/avatar.png"} alt="Profile" width={40} height={40} className="rounded-full object-cover w-10 h-10 border-2 border-white" />
                        <div className="overflow-hidden">
                            <h1 className="font-medium text-foreground text-sm truncate">{myProfile?.data?.email || "admin@ascela.com"}</h1>
                            <p className="text-xs text-muted-foreground capitalize">{myProfile?.data?.role || "Administrator"}</p>
                        </div>
                    </div> */}
                    <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 bg-white/50 text-foreground hover:bg-white hover:text-primary w-full cursor-pointer text-sm font-medium border border-sidebar-border">
                        <span>Logout</span>
                    </button>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}
