"use client";

import { Area, AreaChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";

const data = [
    { name: "", value: 20 },
    { name: "", value: 40 },
    { name: "", value: 35 },
    { name: "", value: 50 },
    { name: "", value: 25 },
    { name: "", value: 45 },
    { name: "", value: 20 },
    { name: "", value: 30 },
    { name: "", value: 55 },
    { name: "", value: 60 },
    { name: "", value: 20 },
    { name: "", value: 15 },
    { name: "", value: 80 },
    { name: "", value: 30 },
    { name: "", value: 20 },
    { name: "", value: 65 },
];

export default function PhaseEngagementTrend() {
    return (
        <div className="w-full h-[300px] mt-8">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F48FB1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#F48FB1" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#F48FB1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-between px-10 mt-2 text-xs font-serif text-primary uppercase tracking-widest">
                <div className="text-center">
                    <div className="font-bold">Menstrual</div>
                    <div className="text-[10px] text-muted-foreground">Days 1-5</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">Follicular</div>
                    <div className="text-[10px] text-muted-foreground">Days 6-12</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">Ovulatory</div>
                    <div className="text-[10px] text-muted-foreground">Days 13-16</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">Luteal</div>
                    <div className="text-[10px] text-muted-foreground">Days 17-28</div>
                </div>
            </div>
        </div>
    );
}
