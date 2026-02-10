import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "buddi.script.s3.ap-southeast-1.amazonaws.com",
                pathname: "/image/**",
            },
            {
                protocol: "http",
                hostname: "buddi.script.s3.ap-southeast-1.amazonaws.com",
                pathname: "/image/**",
            },
            {
                protocol: "http",
                hostname: "10.10.7.50",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "localhost",
                pathname: "/**",
            },
        ],
        unoptimized: true,
    },
};

export default nextConfig;
