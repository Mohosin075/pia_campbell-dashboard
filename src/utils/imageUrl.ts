// export const getImageUrl = (imagePath: string | undefined | null): string => {
//     if (!imagePath) return "";
//     if (imagePath.startsWith("http")) {
//         return imagePath;
//     }
//     const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "";
//     const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
//     return `${cleanBaseUrl}${imagePath}`;
// };

export const getImageUrl = (imagePath: string | undefined | null): string => {
    if (!imagePath) return "";

    const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "";
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        // If it's a local server upload (contains /uploads/ or /images/) with localhost or loopback IP,
        // substitute cleanBaseUrl so external devices accessing the dashboard can load the image
        if (cleanBaseUrl && (imagePath.includes("/uploads/") || imagePath.includes("/images/")) && (imagePath.includes("://localhost") || imagePath.includes("://127.0.0.1"))) {
            const pathIndex = imagePath.indexOf("/uploads/") !== -1 ? imagePath.indexOf("/uploads/") : imagePath.indexOf("/images/");
            return `${cleanBaseUrl}${imagePath.substring(pathIndex)}`;
        }
        return imagePath;
    }

    let cleanImagePath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    if (!cleanImagePath.startsWith("/uploads/") && !cleanImagePath.startsWith("/images/") && !cleanImagePath.startsWith("/media/")) {
        cleanImagePath = `/uploads/images${cleanImagePath}`;
    }

    return `${cleanBaseUrl}${cleanImagePath}`;
};
