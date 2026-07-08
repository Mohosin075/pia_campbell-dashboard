"use client";

import PhaseEngagementTrend from "@/components/dashboard/analytics/PhaseEngagementTrend";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle2, Utensils, Heart, Diamond, Flame, Download, FileText, Printer, Loader2, Calendar } from "lucide-react";
import { useGetAnalyticsOverviewQuery } from "@/redux/features/dashboard/dashboardApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
    const [timeframe, setTimeframe] = useState("30");
    const [isReportOpen, setIsReportOpen] = useState(false);
    const { data: analyticsData, isLoading, isFetching, isError } = useGetAnalyticsOverviewQuery({ days: Number(timeframe) });

    if (isLoading) {
        return (
            <div className="p-6 space-y-8">
                <div className="flex justify-between items-end">
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-4 w-96" />
                    </div>
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-32 w-full" />
                    ))}
                </div>
                <Skeleton className="h-[400px] w-full" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        );
    }

    if (isError || !analyticsData?.success) {
        return (
            <div className="p-6 flex items-center justify-center min-h-[400px]">
                <p className="text-destructive font-medium">Error loading analytics overview. Please try again later.</p>
            </div>
        );
    }

    const data = analyticsData.data;

    const handleDownloadCSV = () => {
        if (!data) return;
        const csvRows = [
            ["Metric", "Count", "Trend (%) vs Previous Period"],
            ["Total Users", data.totalUsers.count, data.totalUsers.trend],
            ["Active Subscriptions", data.activeSubscriptions.count, data.activeSubscriptions.trend],
            ["Recipe Completions / Views", data.recipeCompletions.count, data.recipeCompletions.trend],
            [],
            ["Top Saved Recipes by Phase"],
            ["Title", "Phase", "Saves Count"]
        ];
        data.topPhaseRecipes.forEach((r: any) => {
            csvRows.push([r.title, r.phase, r.saves]);
        });
        const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `analytics_report_last_${timeframe}_days.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("CSV Report downloaded successfully!");
    };

    const handleDownloadJSON = () => {
        if (!data) return;
        const exportData = {
            generatedAt: new Date().toISOString(),
            timeframeDays: timeframe,
            metrics: {
                totalUsers: data.totalUsers,
                activeSubscriptions: data.activeSubscriptions,
                recipeCompletions: data.recipeCompletions
            },
            topPhaseRecipes: data.topPhaseRecipes,
            recentActivity: data.recentActivity
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
        const link = document.createElement("a");
        link.setAttribute("href", dataStr);
        link.setAttribute("download", `analytics_report_last_${timeframe}_days.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("JSON Report downloaded successfully!");
    };

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-serif text-primary uppercase tracking-widest">Analytics Overview</h1>
                        {isFetching && !isLoading && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium animate-pulse">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Updating...
                            </span>
                        )}
                    </div>
                    <p className="text-muted-foreground mt-2">Real-time performance metrics for the cycle-syncing nutrition platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger className="w-[150px] bg-background border-primary text-primary font-medium rounded-xl hover:bg-primary/5 transition-all">
                            <Calendar className="w-4 h-4 mr-2 text-primary" />
                            <SelectValue placeholder="Timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7">Last 7 Days</SelectItem>
                            <SelectItem value="30">Last 30 Days</SelectItem>
                            <SelectItem value="90">Last 90 Days</SelectItem>
                            <SelectItem value="365">This Year</SelectItem>
                            <SelectItem value="0">All Time</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button 
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm px-5"
                        onClick={() => setIsReportOpen(true)}
                    >
                        <FileText className="w-4 h-4 mr-2" /> Generate Report
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-primary/80 font-medium">Total Users</span>
                        <Users className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-4xl font-serif text-primary font-bold">{data.totalUsers.count.toLocaleString()}</h2>
                    <p className="text-xs text-muted-foreground mt-2">
                        <span className={`font-bold ${data.totalUsers.trend >= 0 ? "text-primary" : "text-destructive"}`}>
                            {data.totalUsers.trend >= 0 ? "↗" : "↘"} {Math.abs(data.totalUsers.trend)}%
                        </span> vs last month
                    </p>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-primary/80 font-medium">Active Subscriptions</span>
                        <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-4xl font-serif text-primary font-bold">{data.activeSubscriptions.count.toLocaleString()}</h2>
                    <p className="text-xs text-muted-foreground mt-2">
                        <span className={`font-bold ${data.activeSubscriptions.trend >= 0 ? "text-primary" : "text-destructive"}`}>
                            {data.activeSubscriptions.trend >= 0 ? "↗" : "↘"} {Math.abs(data.activeSubscriptions.trend)}%
                        </span> vs last month
                    </p>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-primary/80 font-medium">Recipe Completions</span>
                        <Utensils className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-4xl font-serif text-primary font-bold">{data.recipeCompletions.count.toLocaleString()}</h2>
                    <p className="text-xs text-muted-foreground mt-2">
                        <span className={`font-bold ${data.recipeCompletions.trend >= 0 ? "text-primary" : "text-destructive"}`}>
                            {data.recipeCompletions.trend >= 0 ? "↗" : "↘"} {Math.abs(data.recipeCompletions.trend)}%
                        </span> vs last month
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
                <PhaseEngagementTrend data={data.phaseEngagementTrend} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="items-center justify-between mb-4 flex">
                        <h2 className="text-lg font-serif text-primary uppercase tracking-widest">Top Phase Recipes</h2>
                        <button className="text-xs font-semibold text-primary tracking-[0.18em] uppercase">
                            View All
                        </button>
                    </div>
                    <div className="space-y-3">
                        {data.topPhaseRecipes.map((recipe: any, index: number) => (
                            <div
                                key={recipe._id}
                                className="flex items-center justify-between rounded-xl px-4 py-3"
                                style={{ 
                                    backgroundColor: index === 0 ? "#FDE8ED" : index === 1 ? "#E0F2FE" : "#FEF3C7" 
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-primary">
                                        {index === 0 ? <Heart className="h-5 w-5" /> : index === 1 ? <Diamond className="h-5 w-5" /> : <Flame className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">{recipe.title}</div>
                                        <div className="text-xs text-muted-foreground">Phase: {recipe.phase}</div>
                                    </div>
                                </div>
                                <div className="text-right text-xs uppercase tracking-[0.18em] text-primary">
                                    <div className="text-sm font-semibold">{recipe.saves}</div>
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
                        {data.recentActivity.map((item: any, index: number) => (
                            <div key={index}>
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-primary/60" />
                                    <div>
                                        <p className="text-sm text-primary">
                                            <span className="font-semibold">{item.user}</span>: {item.action}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {new Date(item.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                {index !== data.recentActivity.length - 1 && (
                                    <div className="mt-3 border-t border-[#FDE8ED]" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Executive Report Modal */}
            <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
                <DialogContent className="max-w-2xl bg-card border-border rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-serif text-primary uppercase tracking-wider flex items-center gap-2">
                            <FileText className="w-6 h-6" /> Executive Analytics Report
                        </DialogTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                            Timeframe: <span className="font-semibold text-foreground">{timeframe === "7" ? "Last 7 Days" : timeframe === "30" ? "Last 30 Days" : timeframe === "90" ? "Last 90 Days" : timeframe === "365" ? "This Year" : "All Time"}</span> • Generated on {new Date().toLocaleDateString()}
                        </p>
                    </DialogHeader>

                    {data && (
                        <div className="space-y-6 my-4">
                            {/* Key Metrics Summary */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-secondary/60 p-4 rounded-xl border border-border/50 text-center">
                                    <p className="text-xs text-muted-foreground">Total Users</p>
                                    <p className="text-2xl font-serif font-bold text-primary mt-1">{data.totalUsers.count.toLocaleString()}</p>
                                    <p className={`text-[10px] font-bold mt-1 ${data.totalUsers.trend >= 0 ? "text-primary" : "text-destructive"}`}>
                                        {data.totalUsers.trend >= 0 ? "+" : ""}{data.totalUsers.trend}% vs prev
                                    </p>
                                </div>
                                <div className="bg-secondary/60 p-4 rounded-xl border border-border/50 text-center">
                                    <p className="text-xs text-muted-foreground">Active Subscriptions</p>
                                    <p className="text-2xl font-serif font-bold text-primary mt-1">{data.activeSubscriptions.count.toLocaleString()}</p>
                                    <p className={`text-[10px] font-bold mt-1 ${data.activeSubscriptions.trend >= 0 ? "text-primary" : "text-destructive"}`}>
                                        {data.activeSubscriptions.trend >= 0 ? "+" : ""}{data.activeSubscriptions.trend}% vs prev
                                    </p>
                                </div>
                                <div className="bg-secondary/60 p-4 rounded-xl border border-border/50 text-center">
                                    <p className="text-xs text-muted-foreground">Recipe Views</p>
                                    <p className="text-2xl font-serif font-bold text-primary mt-1">{data.recipeCompletions.count.toLocaleString()}</p>
                                    <p className={`text-[10px] font-bold mt-1 ${data.recipeCompletions.trend >= 0 ? "text-primary" : "text-destructive"}`}>
                                        {data.recipeCompletions.trend >= 0 ? "+" : ""}{data.recipeCompletions.trend}% vs prev
                                    </p>
                                </div>
                            </div>

                            {/* Top Saved Recipes Summary */}
                            <div className="bg-secondary/40 rounded-xl p-4 border border-border/50">
                                <h3 className="text-sm font-serif font-semibold text-foreground uppercase tracking-wide mb-3">Top Phase Recipes</h3>
                                <div className="space-y-2">
                                    {data.topPhaseRecipes && data.topPhaseRecipes.length > 0 ? (
                                        data.topPhaseRecipes.map((r: any, idx: number) => (
                                            <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-border/40 last:border-0">
                                                <span className="font-medium text-foreground">{r.title} <span className="text-muted-foreground">({r.phase})</span></span>
                                                <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{r.saves} saves</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs text-muted-foreground text-center py-2">No phase recipe data available for this period.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 justify-between items-center border-t border-border pt-4 mt-2">
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="rounded-xl flex-1 sm:flex-initial"
                                onClick={handleDownloadCSV}
                            >
                                <Download className="w-3.5 h-3.5 mr-1.5 text-primary" /> Export CSV
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="rounded-xl flex-1 sm:flex-initial"
                                onClick={handleDownloadJSON}
                            >
                                <FileText className="w-3.5 h-3.5 mr-1.5 text-primary" /> Export JSON
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="rounded-xl flex-1 sm:flex-initial hidden sm:flex"
                                onClick={() => window.print()}
                            >
                                <Printer className="w-3.5 h-3.5 mr-1.5 text-primary" /> Print
                            </Button>
                        </div>
                        <Button 
                            className="bg-primary hover:bg-primary/90 text-white rounded-xl w-full sm:w-auto px-6"
                            onClick={() => setIsReportOpen(false)}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
