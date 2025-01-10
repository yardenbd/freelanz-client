const isDevelopment = process.env.NODE_ENV === "development";

export const config = {
    baseURL: isDevelopment
        ? "http://192.168.1.173:3000" // Replace 192.168.x.x with your LAN IP and backend port
        : "https://your-production-url.com/api",
};
console.log(config.baseURL);
