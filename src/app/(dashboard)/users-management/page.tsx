"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Ban, Crown, BookOpen, Heart } from "lucide-react";
import Image from "next/image";

const users = [
    {
        id: 1,
        name: "Demo User",
        email: "demo@ascela.com",
        status: "active",
        subscription: "Free Trial",
        joined: "2026-01-25",
        lastActive: "2 hours ago",
        savedRecipes: 12,
        favorites: 8,
        image: "/avatar-placeholder.png"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        status: "active",
        subscription: "Monthly",
        joined: "2025-12-15",
        lastActive: "1 day ago",
        savedRecipes: 45,
        favorites: 32,
        image: "/avatar-placeholder.png"
    },
    {
        id: 3,
        name: "John Doe",
        email: "john@example.com",
        status: "active",
        subscription: "Yearly",
        joined: "2025-11-01",
        lastActive: "3 hours ago",
        savedRecipes: 78,
        favorites: 56,
        image: "/avatar-placeholder.png"
    },
    {
        id: 4,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        status: "inactive",
        subscription: "Free",
        joined: "2026-01-28",
        lastActive: "5 days ago",
        savedRecipes: 3,
        favorites: 1,
        image: "/avatar-placeholder.png"
    },
    {
        id: 5,
        name: "Mike Wilson",
        email: "mike@example.com",
        status: "active",
        subscription: "Yearly",
        joined: "2025-10-12",
        lastActive: "1 hour ago",
        savedRecipes: 92,
        favorites: 67,
        image: "/avatar-placeholder.png"
    }
];

export default function UserManagement() {
    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif text-foreground uppercase tracking-widest">User Management</h1>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    <span>Total: <span className="font-bold text-foreground">5 users</span></span>
                    <span>Active: <span className="font-bold text-foreground">4</span></span>
                    <span>Premium: <span className="font-bold text-foreground">3</span></span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Search User..." className="pl-10 bg-muted/50 border-none rounded-full" />
                </div>
                <Select>
                    <SelectTrigger className="w-[180px] bg-muted/50 border-none rounded-full">
                        <SelectValue placeholder="All Subscription" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Subscription</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[180px] bg-muted/50 border-none rounded-full">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* User List */}
            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-primary/10 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center relative">
                        <div className="w-16 h-16 bg-gray-300 rounded-full shrink-0 overflow-hidden">
                             {/* Placeholder for avatar */}
                             <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-xl font-bold">{user.name.charAt(0)}</div>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                                <h3 className="font-serif text-lg font-medium text-foreground">{user.name}</h3>
                                <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className={`${user.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-gray-200 text-gray-600 hover:bg-gray-200'} font-normal text-xs`}>
                                    {user.status}
                                </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                                <span>{user.email}</span>
                            </div>
                            <div className="text-xs text-muted-foreground flex flex-wrap gap-4 mt-1">
                                <span className="flex items-center gap-1">📅 Joined {user.joined}</span>
                                <span className="flex items-center gap-1">● Last active: {user.lastActive}</span>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <BookOpen className="w-3 h-3" /> {user.savedRecipes} saved recipes
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Heart className="w-3 h-3 text-red-400" /> {user.favorites} favorites
                                </div>
                            </div>
                        </div>

                        {/* Top Right Badges */}
                        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                            <Badge className="bg-primary/20 text-primary hover:bg-primary/20 font-normal border-none flex items-center gap-1">
                                <Crown className="w-3 h-3" /> {user.subscription}
                            </Badge>
                            <Button variant="outline" size="sm" className="h-7 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full px-4 text-xs">
                                <Ban className="w-3 h-3 mr-1" /> Ban
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
