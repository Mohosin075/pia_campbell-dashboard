import type { NextConfig } from "next";

function getApiUrl(urlStr?: string): URL | undefined {
  if (!urlStr) return undefined;
  try {
    const formattedUrl =
      urlStr.startsWith("http://") || urlStr.startsWith("https://")
        ? urlStr
        : `http://${urlStr}`;
    return new URL(formattedUrl);
  } catch {
    return undefined;
  }
}

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
const apiUrl = getApiUrl(baseUrl);

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "https",
    hostname: "**",
  },
  {
    protocol: "http",
    hostname: "**",
  },
];

if (apiUrl?.hostname) {
  const protocol = (apiUrl.protocol.replace(":", "") === "https" ? "https" : "http") as "http" | "https";
  remotePatterns.push({
    protocol,
    hostname: apiUrl.hostname,
    port: apiUrl.port || undefined,
  });
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns,
    unoptimized: true,
  },
};

export default nextConfig;

