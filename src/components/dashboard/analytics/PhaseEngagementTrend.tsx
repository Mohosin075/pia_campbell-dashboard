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

const phases = [
    { title: "Menstrual", range: "Days 1-5" },
    { title: "Follicular", range: "Days 6-12" },
    { title: "Ovulatory", range: "Days 13-16" },
    { title: "Luteal", range: "Days 17-28" },
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
            <div className="mt-6 px-12 border-t border-[#FDE8ED] pt-3 pb-4">
                <div className="flex justify-between text-[#F48FB1] font-serif">
                    {phases.map((phase) => (
                        <div key={phase.title} className="w-1/4 text-center">
                            <div className="text-xs font-bold uppercase tracking-[0.18em]">
                                {phase.title}
                            </div>
                            <div className="mt-1 text-[11px]">
                                {phase.range}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
