"use client";

import PhaseEngagementTrend from "@/components/dashboard/analytics/PhaseEngagementTrend";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle2, Utensils } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="p-6 space-y-8">
            {/* Header */}
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Users */}
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

                {/* Active Subscriptions */}
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

                {/* Recipe Completions */}
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

            {/* Phase Engagement Trend */}
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
        </div>
    );
}
