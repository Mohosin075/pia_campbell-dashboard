"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, DollarSign, Users, TrendingUp, CreditCard } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function SubscriptionDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$214.97",
      icon: DollarSign,
      color: "text-[#10B981]", // Green
      bg: "bg-[#FDE8ED]",
    },
    {
      title: "Active Subscriptions",
      value: "3",
      icon: Users,
      color: "text-[#F48FB1]", // Pink
      bg: "bg-[#FDE8ED]",
    },
    {
      title: "Churn Rate",
      value: "25.0%",
      icon: TrendingUp,
      color: "text-[#EF4444]", // Red
      bg: "bg-[#FDE8ED]",
    },
    {
      title: "MRR",
      value: "$14.99",
      icon: CreditCard,
      color: "text-[#F59E0B]", // Orange/Yellow
      bg: "bg-[#FDE8ED]",
    },
  ];

  const subscribers = [
    {
      id: 1,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "active",
      plan: "Monthly",
      amount: "$14.99",
      payment: "Visa **** 4242",
      startDate: "2025-12-15",
      endDate: "2026-02-15",
      autoRenew: true,
      avatar: "/avatars/01.png",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      status: "active",
      plan: "Yearly",
      amount: "$99.99",
      payment: "Mastercard **** 5555",
      startDate: "2025-11-01",
      endDate: "2026-11-01",
      autoRenew: true,
      avatar: "/avatars/02.png",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      status: "active",
      plan: "Yearly",
      amount: "$99.99",
      payment: "Apple Pay",
      startDate: "2025-10-12",
      endDate: "2026-10-12",
      autoRenew: false,
      avatar: "/avatars/03.png",
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily@example.com",
      status: "cancelled",
      plan: "Monthly",
      amount: "$14.99",
      payment: "Visa **** 1234",
      startDate: "2024-01-01",
      endDate: "2026-02-01",
      autoRenew: false,
      avatar: "/avatars/04.png",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-foreground uppercase tracking-widest">SUBSCRIPTION MANAGEMENT</h1>
          <p className="text-muted-foreground mt-2">Track and manage user subscriptions</p>
        </div>
        <Link href="/subscription/edit">
          <Button className="bg-[#F48FB1] hover:bg-[#F48FB1]/90 text-white gap-2">
            <Edit2 className="w-4 h-4" /> Edit Plans
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-[#FDE8ED]/50 backdrop-blur-sm">
            <CardContent className="p-6 flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle Section: Distribution & Revenue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Plan Distribution */}
        <Card className="border-none shadow-sm bg-[#FDE8ED]/30 p-6">
            <h3 className="font-serif text-lg uppercase tracking-wider mb-6">PLAN DISTRIBUTION</h3>
            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Monthly (1)</span>
                        <span>33%</span>
                    </div>
                    <Progress value={33} className="h-2 bg-white" indicatorClassName="bg-[#F48FB1]" />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Yearly (2)</span>
                        <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2 bg-white" indicatorClassName="bg-[#F8BBD0]" />
                </div>
            </div>
        </Card>

        {/* Revenue Breakdown */}
        <Card className="border-none shadow-sm bg-[#FDE8ED]/30 p-6">
            <h3 className="font-serif text-lg uppercase tracking-wider mb-6">REVENUE BREAKDOWN</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium">Monthly Subscriptions</span>
                    <span className="font-bold">$14.99</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium">Yearly Subscriptions</span>
                    <span className="font-bold">$199.98</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#D1FAE5] rounded-lg text-[#065F46]">
                    <span className="text-sm font-bold">Total Revenue</span>
                    <span className="font-bold">$214.97</span>
                </div>
            </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Button variant="secondary" className="bg-[#E5E7EB] text-foreground hover:bg-[#D1D5DB]">
            All Status
        </Button>
        <Button variant="secondary" className="bg-[#E5E7EB] text-foreground hover:bg-[#D1D5DB]">
            All Plan
        </Button>
      </div>

      {/* Subscribers List */}
      <div className="space-y-4">
        {subscribers.map((sub) => (
          <Card key={sub.id} className="border-none shadow-sm bg-white overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* User Info */}
                <div className="flex items-start gap-4 min-w-[250px]">
                    {/* <Avatar className="h-10 w-10">
                        <AvatarImage src={sub.avatar} alt={sub.name} />
                        <AvatarFallback>{sub.name.charAt(0)}</AvatarFallback>
                    </Avatar> */}
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-foreground">{sub.name}</h4>
                            <Badge className={`${
                                sub.status === 'active' ? 'bg-[#D1FAE5] text-[#065F46] hover:bg-[#D1FAE5]' : 
                                'bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FEE2E2]'
                            } border-none`}>
                                {sub.status}
                            </Badge>
                            <Badge className={`${
                                sub.plan === 'Monthly' ? 'bg-[#F48FB1] text-white hover:bg-[#F48FB1]' : 
                                'bg-[#F8BBD0] text-[#880E4F] hover:bg-[#F8BBD0]'
                            } border-none`}>
                                {sub.plan}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{sub.email}</p>
                    </div>
                </div>

                {/* Actions (Top Right on Mobile, Right on Desktop) */}
                <div className="flex gap-2 md:order-last">
                    <Button variant="outline" size="sm" className="text-red-500 border-red-100 hover:bg-red-50">
                        Cancel
                    </Button>
                    <Button variant="outline" size="sm" className="text-muted-foreground border-gray-200">
                        Refund
                    </Button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 flex-1 mt-4 md:mt-0">
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Amount:</p>
                        <p className="font-medium text-sm">{sub.amount}</p>
                        {sub.autoRenew && (
                            <Badge variant="outline" className="mt-1 text-[10px] h-5 px-1 bg-gray-50 text-gray-500 border-gray-200 font-normal">
                                Auto-renew enabled
                            </Badge>
                        )}
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Payment:</p>
                        <p className="font-medium text-sm">{sub.payment}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Start Date:</p>
                        <p className="font-medium text-sm">{sub.startDate}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">End Date:</p>
                        <p className="font-medium text-sm">{sub.endDate}</p>
                    </div>
                </div>

              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
