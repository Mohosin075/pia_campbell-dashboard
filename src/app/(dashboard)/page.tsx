"use client";

import PhaseEngagementTrend from "@/components/dashboard/analytics/PhaseEngagementTrend";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle2, Utensils, Heart, Diamond, Flame } from "lucide-react";

const topPhaseRecipes = [
    {
        title: "Spinach & Lentil Stew",
        phase: "Menstrual (Iron Rich)",
        badge: "1,240",
        color: "#FDE8ED",
        icon: Heart,
    },
    {
        title: "Zucchini Noodle Salad",
        phase: "Follicular (Light)",
        badge: "982",
        color: "#E0F2FE",
        icon: Diamond,
    },
    {
        title: "Sweet Potato Quinoa",
        phase: "Luteal (Complex Carbs)",
        badge: "874",
        color: "#FEF3C7",
        icon: Flame,
    },
];

const recentActivity = [
    {
        title: "New Premium Subscription from Sarah J.",
        time: "2 minutes ago",
        emphasized: "Premium Subscription",
    },
    {
        title: 'Recipe "Avocado Toast with Seeds" was edited by Content Admin',
        time: "14 minutes ago",
        emphasized: "Content Admin",
    },
    {
        title: "System Update: Version 2.4.0 deployed successfully",
        time: "1 hour ago",
        emphasized: "Version 2.4.0",
    },
    {
        title: "Monthly report is now ready for download",
        time: "3 hours ago",
        emphasized: "Monthly report",
    },
];

export default function Dashboard() {
    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-primary uppercase tracking-widest">Analytics Overview</h1>
                    <p className="text-muted-foreground mt-2">Real-time performance metrics for the cycle-syncing nutrition platform.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
                        Last 30 Days
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                        Generate Report
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-primary/80 font-medium">Total Users</span>
                        <Users className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-4xl font-serif text-primary font-bold">12,540</h2>
                    <p className="text-xs text-muted-foreground mt-2">
                        <span className="text-primary font-bold">↗ +12%</span> vs last month
                    </p>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-primary/80 font-medium">Active Subscriptions</span>
                        <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-4xl font-serif text-primary font-bold">8,230</h2>
                    <p className="text-xs text-muted-foreground mt-2">
                        <span className="text-primary font-bold">↗ +5%</span> vs last month
                    </p>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-primary/80 font-medium">Recipe Completions</span>
                        <Utensils className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-4xl font-serif text-primary font-bold">45,800</h2>
                    <p className="text-xs text-muted-foreground mt-2">
                        <span className="text-primary font-bold">↗ +18%</span> vs last month
                    </p>
                </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-primary/60 text-sm">User Activity by Cycle Phase</p>
                        <h2 className="text-2xl font-serif text-primary uppercase tracking-widest">Phase Engagement Trend</h2>
                    </div>
                    <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                        ● Live Traffic
                    </div>
                </div>
                <PhaseEngagementTrend />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-serif text-primary uppercase tracking-widest">Top Phase Recipes</h2>
                        <button className="text-xs font-semibold text-primary tracking-[0.18em] uppercase">
                            View All
                        </button>
                    </div>
                    <div className="space-y-3">
                        {topPhaseRecipes.map((recipe) => (
                            <div
                                key={recipe.title}
                                className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3"
                                style={{ backgroundColor: recipe.color }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-primary">
                                        <recipe.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">{recipe.title}</div>
                                        <div className="text-xs text-muted-foreground">Phase: {recipe.phase}</div>
                                    </div>
                                </div>
                                <div className="text-right text-xs uppercase tracking-[0.18em] text-primary">
                                    <div className="text-sm font-semibold">{recipe.badge}</div>
                                    <div className="mt-0.5">Saves</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-serif text-primary uppercase tracking-widest">Recent Activity</h2>
                    </div>
                    <div className="space-y-4">
                        {recentActivity.map((item, index) => (
                            <div key={item.title}>
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-primary/60" />
                                    <div>
                                        <p className="text-sm text-primary">
                                            {item.title.split(item.emphasized)[0]}
                                            <span className="font-semibold">{item.emphasized}</span>
                                            {item.title.split(item.emphasized)[1]}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                                    </div>
                                </div>
                                {index !== recentActivity.length - 1 && (
                                    <div className="mt-3 border-t border-[#FDE8ED]" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
