"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Eye, Heart, Activity, Spade } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const monthlyGrowthData = [
    { month: "Aug", users: 40, revenue: 35 },
    { month: "Sep", users: 45, revenue: 45 },
    { month: "Oct", users: 65, revenue: 70 },
    { month: "Nov", users: 75, revenue: 75 },
    { month: "Dec", users: 90, revenue: 90 },
    { month: "Jan", users: 100, revenue: 55 },
];

export default function AnalyticsPage() {
    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif text-foreground uppercase tracking-widest">Analytics Dashboard</h1>
                <p className="text-muted-foreground mt-2">Comprehensive insights and metrics</p>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-secondary border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Users</p>
                                <h3 className="text-3xl font-serif text-primary font-bold mt-2">1,247</h3>
                                <p className="text-xs text-muted-foreground mt-1">+134 this month</p>
                            </div>
                            <Users className="w-8 h-8 text-primary/40" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-secondary border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Views</p>
                                <h3 className="text-3xl font-serif text-[#FF8A65] font-bold mt-2">45,678</h3>
                                <p className="text-xs text-muted-foreground mt-1">Recipe views</p>
                            </div>
                            <Eye className="w-8 h-8 text-[#FF8A65]/40" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-secondary border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Favorites</p>
                                <h3 className="text-3xl font-serif text-[#EF5350] font-bold mt-2">12,456</h3>
                                <p className="text-xs text-muted-foreground mt-1">Recipe favorites</p>
                            </div>
                            <Heart className="w-8 h-8 text-[#EF5350]/40" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-secondary border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-muted-foreground">Active Users</p>
                                <h3 className="text-3xl font-serif text-[#66BB6A] font-bold mt-2">892</h3>
                                <p className="text-xs text-muted-foreground mt-1">Online today</p>
                            </div>
                            <Activity className="w-8 h-8 text-[#66BB6A]/40" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Phase-Specific Engagement */}
            <div className="space-y-4">
                <h2 className="text-xl font-serif text-foreground uppercase tracking-widest">Phase-Specific Engagement</h2>
                <p className="text-sm text-muted-foreground">User interaction across different menstrual cycle phases</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Menstrual */}
                    <Card className="border-primary/20 shadow-sm">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Spade className="w-4 h-4 fill-foreground text-foreground" />
                                <span className="font-medium">Menstrual</span>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Recipes:</span>
                                    <span className="font-bold">4</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Views:</span>
                                    <span className="font-bold">12,450</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Favorites:</span>
                                    <span className="font-bold">3,250</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Saved:</span>
                                    <span className="font-bold">2,890</span>
                                </div>
                                <div className="pt-2 border-t border-dashed border-primary/20 flex justify-between text-primary">
                                    <span>Engagement Rate:</span>
                                    <span>26.1%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Follicular */}
                    <Card className="border-primary/20 shadow-sm">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Spade className="w-4 h-4 fill-foreground text-foreground" />
                                <span className="font-medium">Follicular</span>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Recipes:</span>
                                    <span className="font-bold">6</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Views:</span>
                                    <span className="font-bold">15,230</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Favorites:</span>
                                    <span className="font-bold">4,120</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Saved:</span>
                                    <span className="font-bold">3,560</span>
                                </div>
                                <div className="pt-2 border-t border-dashed border-primary/20 flex justify-between text-primary">
                                    <span>Engagement Rate:</span>
                                    <span>27.1%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ovulation */}
                    <Card className="border-primary/20 shadow-sm">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-4 h-4 rounded-full bg-white border border-gray-300" />
                                <span className="font-medium">Ovulation</span>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Recipes:</span>
                                    <span className="font-bold">6</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Views:</span>
                                    <span className="font-bold">9,870</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Favorites:</span>
                                    <span className="font-bold">2,340</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Saved:</span>
                                    <span className="font-bold">1,980</span>
                                </div>
                                <div className="pt-2 border-t border-dashed border-primary/20 flex justify-between text-primary">
                                    <span>Engagement Rate:</span>
                                    <span>23.7%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Luteal */}
                    <Card className="border-primary/20 shadow-sm">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-4 h-4 rounded-full bg-foreground" />
                                <span className="font-medium">Luteal</span>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Recipes:</span>
                                    <span className="font-bold">4</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Views:</span>
                                    <span className="font-bold">8,128</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Favorites:</span>
                                    <span className="font-bold">2,746</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Saved:</span>
                                    <span className="font-bold">2,502</span>
                                </div>
                                <div className="pt-2 border-t border-dashed border-primary/20 flex justify-between text-primary">
                                    <span>Engagement Rate:</span>
                                    <span>33.8%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className=" border-none shadow-sm">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-sm font-serif uppercase tracking-[0.35em] text-foreground">
                            Phase Distribution
                        </h2>
                        <div className="space-y-4 text-sm">
                            {[
                                { label: "Menstrual", recipes: 4, percent: 40, icon: <Spade className="w-4 h-4 fill-foreground" /> },
                                { label: "Follicular", recipes: 6, percent: 60, icon: <Spade className="w-4 h-4 fill-foreground" /> },
                                { label: "Ovulation", recipes: 6, percent: 60, icon: <div className="w-3 h-3 rounded-sm rotate-45 bg-foreground" /> },
                                { label: "Luteal", recipes: 4, percent: 40, icon: <div className="w-3 h-3 rounded-full bg-foreground" /> },
                            ].map((item) => (
                                <div key={item.label} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <div className="flex items-center gap-2">
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </div>
                                        <span className="text-muted-foreground">
                                            {item.recipes} recipes ({item.percent}%)
                                        </span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-[#FEE4EC] overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-[#F8A8C6]"
                                            style={{ width: `${item.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-sm font-serif uppercase tracking-[0.35em] text-foreground">
                            Category Distribution
                        </h2>
                        <div className="space-y-4 text-sm">
                            {[
                                { label: "Breakfast", recipes: 0, percent: 0 },
                                { label: "Lunch", recipes: 0, percent: 0 },
                                { label: "Dinner", recipes: 0, percent: 0 },
                                { label: "Snack", recipes: 0, percent: 0 },
                                { label: "Smoothie", recipes: 0, percent: 0 },
                                { label: "Dessert", recipes: 0, percent: 0 },
                            ].map((item) => (
                                <div key={item.label} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <span>{item.label}</span>
                                        <span className="text-muted-foreground">
                                            {item.recipes} recipes ({item.percent}%)
                                        </span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-[#FEE4EC] overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-[#F8A8C6]"
                                            style={{ width: `${item.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-sm">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-sm font-serif uppercase tracking-[0.35em] text-foreground">
                        Recent User Activity
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Latest user actions and events
                    </p>
                    <div className="space-y-2">
                        {[
                            {
                                id: 1,
                                email: "jane@example.com",
                                action: "Subscribed to Yearly plan",
                                time: "2 hours ago",
                                amount: "+$99.99",
                            },
                            {
                                id: 2,
                                email: "mike@example.com",
                                action: "Saved 5 recipes to favorites",
                                time: "3 hours ago",
                            },
                            {
                                id: 3,
                                email: "sarah@example.com",
                                action: "Created grocery list",
                                time: "5 hours ago",
                            },
                            {
                                id: 4,
                                email: "demo@ascela.com",
                                action: "Completed health profile",
                                time: "6 hours ago",
                            },
                        ].map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-xl bg-[#FFF5F8] px-4 py-3"
                            >
                                <div>
                                    <p className="text-sm font-medium">{item.email}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {item.action}
                                    </p>
                                </div>
                                <div className="text-right text-xs sm:text-sm">
                                    <p className="text-muted-foreground">{item.time}</p>
                                    {item.amount && (
                                        <p className="text-[#00B894] font-semibold">
                                            {item.amount}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-[#FFF5F8] border-none shadow-sm rounded-3xl">
                <CardContent className="p-6 space-y-6">
                    <h2 className="text-sm font-serif uppercase tracking-[0.35em] text-foreground">
                        Monthly Growth
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        User growth and revenue trends
                    </p>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <p className="text-xs text-muted-foreground">User Growth</p>
                            <div className="h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={monthlyGrowthData}
                                        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                                        barCategoryGap={5}
                                        barGap={0}
                                    >
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                                        />
                                        <YAxis hide />
                                        <Tooltip cursor={{ fill: "transparent" }} />
                                        <Bar
                                            dataKey="users"
                                            fill="#F8A8C6"
                                            radius={[18, 18, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <p className="text-xs text-muted-foreground">Revenue Growth</p>
                            <div className="h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={monthlyGrowthData}
                                        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                                        barCategoryGap={5}
                                        barGap={0}
                                    >
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                                        />
                                        <YAxis hide />
                                        <Tooltip cursor={{ fill: "transparent" }} />
                                        <Bar
                                            dataKey="revenue"
                                            fill="#00B894"
                                            radius={[18, 18, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
