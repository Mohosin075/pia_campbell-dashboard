"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Eye, Heart, Activity, Spade } from "lucide-react";

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
                <Card className="bg-primary/5 border-none shadow-none">
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

                <Card className="bg-primary/5 border-none shadow-none">
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

                <Card className="bg-primary/5 border-none shadow-none">
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

                <Card className="bg-primary/5 border-none shadow-none">
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

            {/* Popular Recipes */}
            <div className="space-y-4">
                <h2 className="text-xl font-serif text-foreground uppercase tracking-widest">Popular Recipes</h2>
                <p className="text-sm text-muted-foreground">Most viewed and favorited recipes</p>

                <div className="space-y-3">
                    {[
                        { id: 1, name: "Iron-Rich Spinach Smoothie", views: "4,567", likes: "1,234", icon: <Spade className="w-4 h-4 fill-foreground" /> },
                        { id: 2, name: "Quinoa Buddha Bowl", views: "3,890", likes: "1,056", icon: <Spade className="w-4 h-4 fill-foreground" /> },
                        { id: 3, name: "Salmon Power Bowl", views: "3,456", likes: "987", icon: <div className="w-4 h-4 rounded-full bg-white border border-gray-300" /> },
                        { id: 4, name: "Sweet Potato Comfort Bowl", views: "3,234", likes: "876", icon: <div className="w-4 h-4 rounded-full bg-white border border-gray-300" /> },
                        { id: 5, name: "Berry Blast Smoothie", views: "2,987", likes: "765", icon: <Spade className="w-4 h-4 fill-foreground" /> },
                    ].map((recipe, index) => (
                        <div key={recipe.id} className="bg-primary/5 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary/40 text-white flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>
                                <div className="flex items-center gap-2">
                                    {recipe.icon}
                                    <span className="font-medium">{recipe.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{recipe.views}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4 text-primary" />
                                    <span>{recipe.likes}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
