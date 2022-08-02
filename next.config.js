/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            exclude: /node_modules/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = nextConfig;
