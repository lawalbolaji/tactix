/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
                port: "",
            },
        ],
    },
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

export default nextConfig;
