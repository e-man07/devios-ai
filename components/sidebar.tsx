"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { FreeCounter } from "@/components/free-counter";

import { cn } from "@/lib/utils";
import { VideoIcon, Music, Code, Settings, ImageIcon, LayoutDashboard, MessageSquare } from "lucide-react";

const poppins = Poppins({
    weight: "600",
    subsets: ["latin"],

});

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        colors: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        colors: "text-violet-500",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        colors: "text-pink-700",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        colors: "text-orange-700",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        colors: "text-emerald-500",
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        colors: "text-green-700",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        
    },
];

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
};

const Sidebar = ({
    apiLimitCount= 0,
    isPro = false,
}: SidebarProps) => {
    const pathname= usePathname();
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image 
                         className="animate-spin"
                        fill
                        alt="Logo"
                        src="/logo.png"
                        />
                    </div>
                    <h1 className={cn("text-2xl font-bold", poppins.className)}>
                        devios.ai
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                        href={route.href}
                        key={route.href}
                        className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                        pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                        )}
                        
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.colors)} />
                                {route.label}
                            </div>
                        </Link>
                    )
                    )}
                </div>
            </div>
            <FreeCounter 
              apiLimitCount={apiLimitCount}
              isPro = {isPro}
            />
        </div>
    );
}

export default Sidebar;