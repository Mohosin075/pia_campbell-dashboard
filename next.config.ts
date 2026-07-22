import type { NextConfig } from "next";
import { URL } from "url";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
const apiUrl = baseUrl ? new URL(baseUrl) : undefined;
const apiProtocol: "http" | "https" = apiUrl?.protocol === "https:" ? "https" : "http";
const apiHostname = apiUrl?.hostname;

const remotePatterns = [
    {
        protocol: "https",
        hostname: "**",
    },
    {
        protocol: "http",
        hostname: "**",
    },
];

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        remotePatterns: remotePatterns as NonNullable<NextConfig["images"]>["remotePatterns"],
        unoptimized: true,
    },
};

export default nextConfig;
