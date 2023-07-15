/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["plaiceholder"],
    experimental: {
        appDir: true,
    },
    images: {
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy: "default-src 'self'; script-src 'none';",
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com",
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com",
            },
            {
                protocol: "https",
                hostname: "test2domain.fun",
            },
        ],
    },
};

module.exports = nextConfig;
