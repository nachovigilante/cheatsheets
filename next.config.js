/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            exclude: /node_modules/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    pwa: {
        dest: "public",
    },
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = withPWA(nextConfig);
